import telebot
from telebot import types
from aiogram.types import ReplyKeyboardRemove, \
    ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton
from quickchart import QuickChart
from datetime import timedelta
import numpy as np
import requests

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

def auth(message):
    msg = bot.send_message(message.chat.id, 'Введите код: ')
    bot.register_next_step_handler(msg, code_authorization)   

def get_menu(message):
    menu = types.ReplyKeyboardMarkup(True, one_time_keyboard=True)
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
    arr = np.array(arr)
    return list(arr[arr!=None])

def divide_queryset(resulting_queryset, attribute_arr):
    return ([get_none_value(d, attr) for d in resulting_queryset] for attr in attribute_arr)

def time_correction(date):
    try:
        return f'{date.year}-{date.month}-{date.day}'
    except AttributeError:
        return 

def time_arr_correction(timestamp_arr):
    return list(map(time_correction, timestamp_arr))

def get_chart_url(mean_data, timestamp_arr, attribute):
    qc = QuickChart()
    qc.width = 500
    qc.height = 300
    qc.device_pixel_ratio = 2.0
    qc.config = {
        "type": "line",
        "data": {
            "labels": timestamp_arr,
            "datasets": [{
                "label": attribute,
                "data": mean_data
            }]
        }
    }
    return qc.get_url()

def get_pictures_url(time_interval, time_frequency, cluster):
    attribute_arr_ru = [
        'Первая температура', 'Вторая температура', 'Третья температура',
        'Влажность', 'Освещенность', 'Кислотность'
    ]
    attribute_arr_eng = [
        'first_temp', 'second_temp', 'third_temp',
        'humidity', 'lightning', 'pH', 'timestamp'
    ]
    detectors = cluster.cluster_detectors.all() \
            .prefetch_related(
                Prefetch(
                    'data',
                    queryset=DetectorData.objects.all() \
                        .only('timestamp')
                )
            )
        
    sliced_data = slice_data_by_timestamp(detectors, time_frequency, time_interval)
    resulting_queryset = queryset_mean(sliced_data, detectors)

    data_arr = list(map(detect_non_none_values, 
            map(list, divide_queryset(resulting_queryset, attribute_arr_eng))
        )
    )
    timestamp_arr = time_arr_correction(data_arr[-1])
    data_arr = data_arr[:-1]

    return map(
        lambda data_slice, attr: get_chart_url(data_slice, timestamp_arr, attr), 
        data_arr, attribute_arr_ru
    )