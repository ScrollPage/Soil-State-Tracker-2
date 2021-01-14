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
from backend.local import CHAT_BOT_TOKEN

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

@bot.callback_query_handler(func=lambda call: True)
def callback_inline(call):
    '''
    Подсказка. 
    Если выбирается промежуток времени, то в call.data после ; идет имя кластера
    '''

    if 'half_year' in call.data:
        cluster = get_cluster(call)
        bot.send_message(call.message.chat.id, 'Здесь должен быть график за полгода:') 

    elif '3_months' in call.data:
        cluster = get_cluster(call)
        bot.send_message(call.message.chat.id, 'Здесь должен быть график за 3 месяца:')

    elif 'month' in call.data:
        cluster = get_cluster(call)
        bot.send_message(call.message.chat.id, 'Здесь должен быть график за 1 месяц:')

    elif 'week' in call.data:
        cluster = get_cluster(call)
        bot.send_message(call.message.chat.id, 'Здесь должен быть график за неделю:')

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
        bot.send_message(message.chat.id, 'Я вас не понимаю. Выберите одно из возможных действий на клавиатуре.', reply_markup=menu)  
        
print('Compiled')

bot.enable_save_next_step_handlers()
bot.load_next_step_handlers()

bot.polling(none_stop=True, interval=0)