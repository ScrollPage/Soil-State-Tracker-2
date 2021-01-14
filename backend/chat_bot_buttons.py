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
    menu = types.InlineKeyboardMarkup()
    try:
        Client.objects.get(chat_id=message.chat.id)
    except Client.DoesNotExist:
        auth_button = types.InlineKeyboardButton(text="Авторизация", callback_data="Auth")
        menu.add(auth_button)
    else:
        exit_button = types.InlineKeyboardButton(text="Авторизация", callback_data="Exit")
        menu.add(exit_button)
    finally:
        detectors_button = types.InlineKeyboardButton(text="Список датчиков", callback_data="Detectors")
        clusters_button = types.InlineKeyboardButton(text="Список кластеров", callback_data="Clusters")
        menu.add(detectors_button, clusters_button)
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

@bot.callback_query_handler(func=lambda call: True)
def callback_inline(call):
    if call.data == "Auth":
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
                f'Вы уже авторизованы, {user.get_full_name()}. Выберите одно из возможных действий:',
                reply_markup=menu    
            )

    if call.data == "Exit":
        user = Client.objects.get(chat_id=message.chat.id)
        user.chat_id = None
        user.save()
        menu = get_menu(message)
        bot.send_message(message.chat.id, 'Вы успешно вышли.', reply_markup=menu)

    if call.data == "Detectors":
        try:
            user = Client.objects.get(chat_id=message.chat.id)
        except Client.DoesNotExist:
            menu = get_menu(message)
            bot.send_message(message.chat.id, 'Вы не авторизовались!', reply_markup=menu)
        else:
            menu = get_menu(message)
            bot.send_message(message.chat.id, f'Список датчиков: {user.get_detector_ids()}', reply_markup=menu)

    if call.data == "Clusters":
        try:
            user = Client.objects.get(chat_id=message.chat.id)
        except Client.DoesNotExist:
            menu = get_menu(message)
            bot.send_message(message.chat.id, 'Вы не авторизовались!', reply_markup=menu)
        else:
            keyboard = types.InlineKeyboardMarkup()
            btn1 = types.InlineKeyboardButton('Полгода', callback_data='half_year')
            btn2 = types.InlineKeyboardButton('3 месяца', callback_data='3_months')
            btn3 = types.InlineKeyboardButton('месяц', callback_data='month')
            btn4 = types.InlineKeyboardButton('неделя', callback_data='week')
            keyboard.add(btn1, btn2, btn3, btn4)
            menu = get_menu(message)
            bot.send_message(message.chat.id, f'Список кластеров: {user.get_cluster_names()}')   
            bot.send_message(message.chat.id, 'Пожалуйста, выберите, за какой временной промежуток вывести график:', reply_markup=keyboard)

    if call.data == "half_year":
        menu = get_menu(message)
        bot.send_message(message.chat.id, 'Здесь должен быть график за полгода:', reply_markup=menu) 
    if call.data == "3_months":
        menu = get_menu(message)
        bot.send_message(message.chat.id, 'Здесь должен быть график за 3 месяца:', reply_markup=menu)
    if call.data == "month":
        menu = get_menu(message)
        bot.send_message(message.chat.id, 'Здесь должен быть график за 1 месяц:', reply_markup=menu)
    if call.data == "week":
        menu = get_menu(message)
        bot.send_message(message.chat.id, 'Здесь должен быть график за неделю:', reply_markup=menu)

@bot.message_handler(commands=['start'])
def send_welcome(message):
menu = get_menu(message)
bot.send_message(message.chat.id, 'Добро пожаловать! Выберите одно из возможных действий:', reply_markup=menu)

@bot.message_handler(content_types=['text'])
def get_various_messages(message):    
    bot.send_message(message.chat.id, 'Я вас не понимаю. Выберите одно из возможных действий:', reply_markup=menu)  
        
print('Compiled and successfully connected!')

bot.enable_save_next_step_handlers()
bot.load_next_step_handlers()

bot.polling(none_stop=True, interval=0)