import telebot
import random
from telebot import types
from aiogram.types import ReplyKeyboardRemove, \
    ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
    
from client.models import Client, AuthCode
from detector.models import Detector
from group.models import Cluster

bot = telebot.TeleBot('1467374444:AAHuKNmwn6GgzXR0nS2WFZHksy1kuWtpOco')
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
    finally:
        menu.row('Список датчиков', 'Список кластеров')
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
            bot.send_message(message.chat.id, f'Список датчиков: {user.get_detector_ids()}', reply_markup=menu)

    elif message.text == "Список кластеров":
        try:
            user = Client.objects.get(chat_id=message.chat.id)
        except Client.DoesNotExist:
            menu = get_menu(message)
            bot.send_message(message.chat.id, 'Вы не авторизовались!', reply_markup=menu)
        else:
            menu = get_menu(message)
            bot.send_message(message.chat.id, f'Список кластеров: {user.get_cluster_names()}', reply_markup=menu)
            
    elif message.text == '/start':
        menu = get_menu(message)
        bot.send_message(message.chat.id, 'Добро пожаловать! Выберите одно из возможных действий на клавиатуре.', reply_markup=menu)

    elif message.text == 'Выход':
        user = Client.objects.get(chat_id=message.chat.id)
        user.chat_id = None
        user.save()
        menu = get_menu(message)
        bot.send_message(message.chat.id, 'Вы успешно вышли.', reply_markup=menu)

    else:   
        menu = get_menu(message)
        bot.send_message(message.chat.id, 'Я вас не понимаю. Выберите одно из возможных действий на клавиатуре.', reply_markup=menu)  
        
print('Compiled')

bot.enable_save_next_step_handlers()
bot.load_next_step_handlers()

bot.polling(none_stop=True, interval=0)