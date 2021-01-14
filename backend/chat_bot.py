import telebot
import random
from telebot import types
from aiogram.types import ReplyKeyboardRemove, \
    ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton
from quickchart import QuickChart
from datetime import timedelta
import numpy as np

import os
import django

from django.db.models import Prefetch

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
    
from client.models import Client, AuthCode
from detector.models import Detector, DetectorData
from group.models import Cluster
from backend.local import CHAT_BOT_TOKEN
from group.api.service import slice_data_by_timestamp, queryset_mean

bot = telebot.TeleBot(CHAT_BOT_TOKEN)
print('Connecting to Telegram Bot...')

def auth(message):
    msg = bot.send_message(message.chat.id, 'Введите код: ')
    bot.register_next_step_handler(msg, code_authorization)   

def get_menu(message):
    menu = types.ReplyKeyboardMarkup(True, True)
    try:
        Client.objects.get(chat_id=message.chat.id)
    except Client.DoesNotExist:
        menu.row('Авторизация')
    else:
        menu.row('Выход')
        menu.row('Список датчиков', 'Список кластеров')
    finally:
        return menu

def code_authorization(message):
    try:
        code = AuthCode.objects.get(code=message.text)
    except AuthCode.DoesNotExist:
        menu = get_menu(message)
        bot.send_message(
            message.chat.id, 
            'Неверный код! Попробуйте авторизоваться еще раз!',
            reply_markup=menu
        )
    else:
        user = code.user
        user.chat_id = message.chat.id
        user.save()
        menu = get_menu(message)
        bot.send_message(
            message.chat.id, 
            f'Авторизация выполнена! Добро пожаловать, {user.get_full_name()}! ',
            reply_markup=menu
        )

def get_cluster(call):
    '''Получает кластер через call.data'''
    user = Client.objects.get(chat_id=call.message.chat.id)
    cluster = user.clusters.get(name=call.data.split(';')[1])
    return cluster

def get_none_value(d, key):
    try:
        val = d[key]
    except TypeError:
        return None
    else:
        try: 
            return float(val)
        except TypeError:
            return val 

def detect_non_none_values(arr):
    i = 0
    while i < len(arr):
        if arr[i] is not None:
            break
        i += 1
    return arr[i:]

def divide_queryset(resulting_queryset):
    first_temp_arr = [get_none_value(d, 'first_temp') for d in resulting_queryset]
    second_temp_arr = [get_none_value(d, 'second_temp') for d in resulting_queryset]
    third_temp_arr = [get_none_value(d, 'third_temp') for d in resulting_queryset]
    humidity_arr = [get_none_value(d, 'humidity') for d in resulting_queryset]
    lightning_arr = [get_none_value(d, 'lightning') for d in resulting_queryset]
    pH_arr = [get_none_value(d, 'pH') for d in resulting_queryset]
    timestamp_arr = [get_none_value(d, 'timestamp') for d in resulting_queryset]

    return first_temp_arr, second_temp_arr, third_temp_arr, \
        humidity_arr, lightning_arr, pH_arr, timestamp_arr

def time_correction(date):
    try:
        return f'{date.year}-{date.month}-{date.day}'
    except AttributeError:
        return 

def time_arr_correction(timestamp_arr):
    return list(map(time_correction, timestamp_arr))

def send_chart_data(mean_data, timestamp_arr, attribute):
    qc = QuickChart()
    qc.width = 500
    qc.height = 300
    qc.device_pixel_ratio = 2.0
    qc.config = {
        "type": "line",
        "data": {
            "labels": timestamp_arr[0],
            "datasets": [{
                "label": attribute,
                "data": mean_data
            }]
        }
    }
    return qc.get_url()

def get_pictures_url(time_interval, time_frequency, cluster):
    attribute_arr = [
        'Первая температура', 'Вторая температура', 'Третья температура',
        'Влажность', 'Освещенность', 'Кислотность', 'Время'
    ]
    detectors = cluster.cluster_detectors.all() \
            .prefetch_related(
                Prefetch(
                    'data',
                    queryset=DetectorData.objects.all() \
                        .defer('detector')
                )
            )
        
    sliced_data = slice_data_by_timestamp(detectors, time_frequency, time_interval)
    resulting_queryset = queryset_mean(sliced_data, detectors)

    data_arr = list(map(detect_non_none_values, list(map(list, divide_queryset(resulting_queryset)))))
    data_arr[-1] = time_arr_correction(data_arr[-1])
    data_arr = list(zip(data_arr, attribute_arr))

    return list(map(lambda data_slice: send_chart_data(data_slice[0], data_arr[-1], data_slice[1]), data_arr[:-1]))

@bot.callback_query_handler(func=lambda call: True)
def callback_inline(call):
    '''
    Подсказка. 
    Если выбирается промежуток времени, то в call.data после ; идет имя кластера
    '''

    if 'half_year' in call.data:
        cluster = get_cluster(call)
        for url in get_pictures_url(timedelta(days=162), 36, cluster):
            bot.send_message(call.message.chat.id, url) 

    elif '3_months' in call.data:
        cluster = get_cluster(call)
        for url in get_pictures_url(timedelta(days=91), 12, cluster):
            bot.send_message(call.message.chat.id, url)

    elif 'month' in call.data:
        cluster = get_cluster(call)
        for url in get_pictures_url(timedelta(days=31), 4, cluster):
            bot.send_message(call.message.chat.id, url)

    elif 'week' in call.data:
        cluster = get_cluster(call)
        for url in get_pictures_url(timedelta(days=7), 1, cluster):
            bot.send_message(call.message.chat.id, url)

    elif 'cluster_' in call.data :
        cluster_name = call.data.split('cluster_')[1]
        keyboard = types.InlineKeyboardMarkup()
        keyboard.add(
            types.InlineKeyboardButton('Полгода', callback_data=f'half_year;{cluster_name}'), 
            types.InlineKeyboardButton('3 месяца', callback_data=f'3_months;{cluster_name}'), 
            types.InlineKeyboardButton('месяц', callback_data=f'month;{cluster_name}'), 
            types.InlineKeyboardButton('неделя', callback_data=f'week;{cluster_name}')
        )
        bot.send_message(
            call.message.chat.id, 
            f'Выберите помежуток времени, чтобы получить данные по кластеру {cluster_name}', 
            reply_markup=keyboard
        )

@bot.message_handler(content_types=['text'])
def get_various_messages(message):    

    if message.text == 'Авторизация':
        try:
            user = Client.objects.get(chat_id=message.chat.id)
        except Client.DoesNotExist:
            menu = get_menu(message)
            bot.send_message(
                message.chat.id, 
                'Пожалуйста, авторизуйтесь.', 
                reply_markup=menu
            )
            auth(message)            
        else:
            menu = get_menu(message)
            bot.send_message(
                message.chat.id, 
                f'Вы уже авторизованы, {user.get_full_name()}. Выберите одно из возможных действий на клавиатуре.',
                reply_markup=menu    
            )

    elif message.text == "Список датчиков":
        try:
            user = Client.objects.get(chat_id=message.chat.id)
        except Client.DoesNotExist:
            menu = get_menu(message)
            bot.send_message(message.chat.id, 'Вы не авторизовались!', reply_markup=menu)
        else:
            menu = get_menu(message)
            bot.send_message(
                message.chat.id, 
                f'Список датчиков: {user.get_detector_ids()}', 
                reply_markup=menu
            )

    elif message.text == "Список кластеров":
        try:
            user = Client.objects.get(chat_id=message.chat.id)
        except Client.DoesNotExist:
            menu = get_menu(message)
            bot.send_message(message.chat.id, 'Вы не авторизовались!', reply_markup=menu)
        else:
            keyboard = types.InlineKeyboardMarkup()
            menu = get_menu(message)
            bot.send_message(message.chat.id, f'Список кластеров: ')   
            for cluster_name in user.get_cluster_names():
                keyboard.add(types.InlineKeyboardButton(
                    f'Кластер {cluster_name}', callback_data=f'cluster_{cluster_name}')
                )
            bot.send_message(
                message.chat.id,  
                'Пожалуйста, выберите кластер.', 
                reply_markup=keyboard
            )
            
    elif message.text == '/start':
        menu = get_menu(message)
        bot.send_message(message.chat.id, 'Добро пожаловать! Авторизуйтесь, пожалуйста.', reply_markup=menu)

    elif message.text == 'Выход':
        user = Client.objects.get(chat_id=message.chat.id)
        user.chat_id = None
        user.save()
        menu = get_menu(message)
        bot.send_message(message.chat.id, 'Вы успешно вышли.', reply_markup=menu)

    else:   
        menu = get_menu(message)
        bot.send_message(
            message.chat.id, 
            'Я вас не понимаю. Выберите одно из возможных действий на клавиатуре.', 
            reply_markup=menu
        )  
        
print('Compiled')

bot.enable_save_next_step_handlers()
bot.load_next_step_handlers()

bot.polling(none_stop=True, interval=0)