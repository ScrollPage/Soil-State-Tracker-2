import telebot
from telebot import types
from aiogram.types import ReplyKeyboardRemove, \
    ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton
import datetime as dt
from django.utils import timezone

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
    
from client.models import Client
from service import (
    auth, get_pictures_url, bot, get_menu, get_cluster_name,
    get_cluster, get_detector, get_time_keyboard, get_detector_id
)

print('Connecting to Telegram Bot...')

@bot.callback_query_handler(func=lambda call: True)
def callback_inline(call):
    '''
    Подсказка. 
    Если выбирается промежуток времени, то в call.data после : идет имя кластера
    '''

    if 'data' in call.data:
        if 'half_year' in call.data:
            begin_date = timezone.now() - dt.timedelta(days=181)
            currency = 24

        elif '3_months' in call.data:
            begin_date = timezone.now() - dt.timedelta(days=91)
            currency = 12

        elif 'month' in call.data:
            begin_date = timezone.now() - dt.timedelta(days=30)
            currency = 4

        elif 'week' in call.data:
            begin_date = timezone.now() - dt.timedelta(days=7)
            currency = 1

        if 'cluster' in call.data:
            cluster = get_cluster(call)
            detectors = cluster.detectors.all()
        else:
            detector = get_detector(call)
            detectors = [detector]

        for url in get_pictures_url(detectors, currency, begin_date):
            bot.send_photo(call.message.chat.id, url)


    elif 'cluster' in call.data:
        cluster_name = get_cluster_name(call)
        if 'info' in call.data:
            keyboard = get_time_keyboard('cluster', cluster_name)
            bot.send_message(
                call.message.chat.id, 
                f'Выберите помежуток времени, чтобы получить данные по кластеру {cluster_name}', 
                reply_markup=keyboard
            )
        else:
            cluster = get_cluster(call)
            keyboard = types.InlineKeyboardMarkup()
            for detector_id in cluster.get_detector_ids():
                keyboard.add(types.InlineKeyboardButton(
                    f'Датчик {detector_id}', callback_data=f'detector:{detector_id}')
                )
            bot.send_message(
                call.message.chat.id,  
                f'Пожалуйста, выберите датчик из кластера {cluster_name}.', 
                reply_markup=keyboard
            )

    elif 'detector' in call.data:
        detector_id = get_detector_id(call)
        keyboard = get_time_keyboard('detector', detector_id)
        bot.send_message(
            call.message.chat.id, 
            f'Выберите помежуток времени, чтобы получить данные по датчику {detector_id}', 
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
            keyboard = types.InlineKeyboardMarkup()
            menu = get_menu(message)
            for cluster_name in user.get_cluster_names():
                keyboard.add(types.InlineKeyboardButton(
                    f'Кластер {cluster_name}', callback_data=f'cluster:list:{cluster_name}')
                )
            bot.send_message(
                message.chat.id,  
                'Выберите кластер, список датчиков которого вы хотите посмотреть: ', 
                reply_markup=keyboard
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
                    f'Кластер {cluster_name}', callback_data=f'cluster:info:{cluster_name}')
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