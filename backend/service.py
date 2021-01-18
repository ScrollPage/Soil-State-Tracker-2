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
from detector.models import Detector
from detector_data.models import DetectorData
from group.models import Cluster
from backend.local import CHAT_BOT_TOKEN
from group.api.service import get_aggregated_data

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
    cluster = user.clusters.get(name=call.data.split(':')[1])
    return cluster

def get_none_value(d, key):
    val = d[key]
    try: 
        return float(val)
    except TypeError:
        return val

def divide_queryset(resulting_queryset, attribute_arr):
    return ([get_none_value(d, attr) for d in resulting_queryset] for attr in attribute_arr)

def time_correction(date):
    return f'{date.year}-{date.month}-{date.day}'

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

def get_pictures_url(cluster, multiplier, begin_date):
    attribute_arr_ru = [
        'Первая температура', 'Вторая температура', 'Третья температура',
        'Влажность', 'Освещенность', 'Кислотность'
    ]
    attribute_arr_eng = [
        'first_temp', 'second_temp', 'third_temp',
        'humidity', 'lightning', 'pH'
    ]
    detectors = cluster.cluster_detectors.all()
        
    resulting_queryset = get_aggregated_data(detectors, multiplier, begin_date)
    timestamp_arr = list(
        [time_correction(data['timestamp'].date()) for data in resulting_queryset]
    )
    print(timestamp_arr)
    resulting_queryset = divide_queryset(resulting_queryset, attribute_arr_eng)

    return map(
        lambda data_slice, attr: get_chart_url(data_slice, timestamp_arr, attr), 
        resulting_queryset, attribute_arr_ru
    )