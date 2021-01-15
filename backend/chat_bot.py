import telebot
from telebot import types
from aiogram.types import ReplyKeyboardRemove, \
    ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton
from datetime import timedelta

import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()
    
from client.models import Client
from service import auth, get_pictures_url, bot, get_menu, get_cluster

print('Connecting to Telegram Bot...')

@bot.callback_query_handler(func=lambda call: True)
def callback_inline(call):
    '''
    Подсказка. 
    Если выбирается промежуток времени, то в call.data после ; идет имя кластера
    '''

    if 'half_year' in call.data:
        cluster = get_cluster(call)
        for url in get_pictures_url(timedelta(days=162), 36, cluster):
            bot.send_photo(call.message.chat.id, url) 

    elif '3_months' in call.data:
        cluster = get_cluster(call)
        for url in get_pictures_url(timedelta(days=91), 12, cluster):
            bot.send_photo(call.message.chat.id, url)

    elif 'month' in call.data:
        cluster = get_cluster(call)
        for url in get_pictures_url(timedelta(days=31), 4, cluster):
            bot.send_photo(call.message.chat.id, url)

    elif 'week' in call.data:
        cluster = get_cluster(call)
        for url in get_pictures_url(timedelta(days=7), 1, cluster):
            bot.send_photo(call.message.chat.id, url)

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