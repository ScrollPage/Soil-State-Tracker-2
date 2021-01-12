import telebot
import random
from telebot import types
from aiogram.types import ReplyKeyboardRemove, \
    ReplyKeyboardMarkup, KeyboardButton, \
    InlineKeyboardMarkup, InlineKeyboardButton
    
from client.models import CLient, AuthCode
from detector.models import Detector
from group.models import Cluster

bot = telebot.TeleBot('1467374444:AAHuKNmwn6GgzXR0nS2WFZHksy1kuWtpOco');
print('connecting to Telegram Bot...')

Stickers_Hi = [
   "CAACAgIAAxkBAAEHkI1f9HIMO_5QPhVveSOlqKTeLZXtOwACdQQAAsxUSQk-AwAB8-URJbUeBA", 
   "CAACAgIAAxkBAAEHkJdf9HMp34x7n1zvs3FTa1-0nUC7qgACAQADFm5MEh97vwZE6duLHgQ",
   "CAACAgIAAxkBAAEHkJlf9HONpc1SoTo2ArPdqxNGUKsMdgACoAEAAjDUnRGDNNeGcpfWEx4E",
   "CAACAgIAAxkBAAEHkLdf9HV5aFYnVJV5NFZF1yExOnPANAACJQAD5KDOB12xgTPob610HgQ",
   "CAACAgEAAxkBAAEHkLtf9HYxtI2zpUWsx0uXkjNdFmdFcgAC4wkAAr-MkAQnneSdFDZsch4E",
   "CAACAgIAAxkBAAEHkL1f9HZPtcRZNTsYh2TGbkvheqNonQACHS0AAulVBRjT6XN_0fcGTR4E",
   "CAACAgIAAxkBAAEHkL9f9Ha_3NSLMcKF3u0r-2zqO0lBAwACTQEAArd76yC9kMEcaX5sPx4E",
   "CAACAgIAAxkBAAEHkMNf9HeYXvvSGsLWO-FALQqA9PtQuAACWAgAAotGbScKh7nty6T8mB4E",
   "CAACAgIAAxkBAAEHkMtf9Hh5jwgAATClpLJBuLBOyygc5i8AAlcBAAIQGm0ipSs8VPt6NKoeBA",
   "CAACAgIAAxkBAAEHkPZf9H3y_PuupNgVyXGZEIBRbQztiQACqgEAAzigCsWJFShDeX0PHgQ",
   "CAACAgEAAxkBAAEHkRpf9IDPokQcR74hldVu1-0ouvY2TQACAwYAAmbKaAkvNRuin918tB4E",
   "CAACAgIAAxkBAAEHkTxf9IOEBO786Z7o9cbbfTPkizxghgACyhwAAtjY4QABnf1hUJoSj8MeBA",
   "CAACAgIAAxkBAAEHkUJf9IPkEElrAbpCl3IfKHbdAkMmrwACzFkAAuCjggdOT2_t1Yt8wh4E",
   "CAACAgIAAxkBAAEHkXRf9IUwAVFSdn-iQj8iMx9KL1XgtgAC8gMAAlrmjhE8FTchLFECOB4E",
   "CAACAgIAAxkBAAEHkYpf9IbAapikbfKIA9DwaFzeXMm62wACdhkAAtjY4QABVnZl3gJDIBQeBA"  
]

Stickers_help = [
    "CAACAgIAAxkBAAEHa6tf5M6IGAQ_BeYeDJ87CJVnXsdgwwACBwAD5fLbL3U3ASFpTKhdHgQ",
    "CAACAgIAAxkBAAEHa7Nf5M9sRbr-GziKDHtzTyAkUgMKIgACSgADfzdMK5XBs4IrrbOkHgQ",
    "CAACAgEAAxkBAAEHa7Vf5M-BGAQVcCX1Ie7rGSIHrw8y0wAC4AkAAr-MkAQwN-UmfXmbVh4E",
    "CAACAgIAAxkBAAEHa7lf5NFfUswTWdo3ijqD2UscoT9n2wACRi0AAulVBRjJVbspVyQ_8x4E",
    "CAACAgIAAxkBAAEHkQhf9H8v_Y3i9Z_n6YOmSnTZpRFa0gAC1yMAAtjY4QABdvBqFNjXl_MeBA",
    "CAACAgQAAxkBAAEHkQxf9IAiXePY9OOvhfSrY_LSA8jELgAC6wQAAkXeuwU3qLlx-7t97R4E",
    "CAACAgEAAxkBAAEHkQ5f9IBXuNB06blt4NlFkOmqhKEkhwAChwUAAmbKaAkksVKrCSqHyR4E",
    "CAACAgQAAxkBAAEHkSRf9IGjqE3ZdSyfgs14KekRmeFhNAAC4gADHc-4B4QpBFro6ZLPHgQ",
    "CAACAgIAAxkBAAEHkS5f9IKvl6rrs7b45I4uR3mZAzb2fwACZzIAAuCjggdlCkh1Ov0hax4E",
    "CAACAgIAAxkBAAEHkTZf9IMUWPdyYUYnHVL1UASx_DbjvgACaiAAAulVBRiDHeTANuheXx4E",
    "CAACAgIAAxkBAAEHkThf9INEQFOwI-dpZ3M8svvL8kbDkQACHgQAAsSraAvev-zAPetNTx4E",
    "CAACAgIAAxkBAAEHkTpf9INj2MRsIt6tc7x3btyD5etWeQACsgMAAkcVaAkjjRKLKkO86R4E",
    "CAACAgIAAxkBAAEHkUBf9IOpilwKFGPkDUgsHBGDjRRllAACrE8AAuCjggeKembLdDifGh4E"
]

Stickers = [
    "CAACAgIAAxkBAAEHbEVf5O0AAfD5JOo08mBsvCmUDcj69IYAAjEDAALMVEkJX1BJuS-k1poeBA",
    "CAACAgIAAxkBAAEHbEFf5OyAL8_YyutXh0oGrJrStxhv8gACZgEAArd76yCrb8lJT9tAAh4E",
    "CAACAgIAAxkBAAEHbD1f5OxJub_LZK7e_k0evCBpw7pDfQACPwEAAmHWGgU_xXYbdiL2Fh4E",
    "CAACAgIAAxkBAAEHbDlf5OwH4hIb5RINHP8cBGFft94rFwACQAQAAvyawQg-2EjNyeD77h4E",
    "CAACAgIAAxkBAAEHbDFf5OuNbh_hpwIWHVsfNKBInZk5qwACLgAD68beDgoqn8wG-fkkHgQ",
    "CAACAgIAAxkBAAEHbC9f5OtgVa_llrXbyXqCzdmTcWbgTgACzAcAAkb7rAQEzIIXCDlyQh4E",
    "CAACAgIAAxkBAAEHbC1f5OsrZTY9gtjMT4aMtTg51CuVLwAC84UAAp7OCwABT0EzcXx3pdUeBA",
    "CAACAgIAAxkBAAEHbClf5OrR2_ANIg6VTP06kM-Amqf-pwACCAkAAmMr4gl9ThAuxwWEwR4E",
    "CAACAgIAAxkBAAEHbCdf5OqdaJ_ALrEysTgr8P4ZMtHoNgACbQQAAsxUSQmHrlHDqKGz9h4E",
    "CAACAgIAAxkBAAEHbCNf5OoHIEaGQAkzj39dcy5WZb8SZQACIQADFm5MEkhLGMmOZdQZHgQ",
    "CAACAgIAAxkBAAEHbCFf5OmSH_TI4D1cg0YLj4Pl-Ozy8wAClgEAAjDUnRHTK9BWN-s7iR4E",
    "CAACAgIAAxkBAAEHbBtf5OkTZF97-qOPEM7EM_Z7MMGa1gACdhUAAowt_QeIzM2uYyeRXR4E",
    "CAACAgIAAxkBAAEHbBdf5Og9H_xrcwEFhDiyUclmB6hTnQAC8QkAAkIWmEooMCgKjl4dkB4E",
    "CAACAgIAAxkBAAEHbAVf5OZGLETh27hQZ8G_8flb7jqD_gACKgADyqv7GcXpzvn1AAG6JB4E",
    "CAACAgIAAxkBAAEHbA1f5ObG_k3kqFwgVjJRybnx2zlXUwACnAEAAjtkAAEFUH1_tJYjLfseBA",
    "CAACAgIAAxkBAAEHbA9f5OcswlMkOAABvo-MMi1c0O7UICEAArsFAAI_lcwKwfkMaDTUHTYeBA",
    "CAACAgIAAxkBAAEHkPhf9H4nfn0weWWXawFYY8Glt7BjtwACzwEAAzigChplfCUbdyTXHgQ",
    "CAACAgIAAxkBAAEHkQRf9H7r5-Ot5u4pdgyglUdDrSzU0AACFgEAArd76yDm7EbmZEKvsh4E",
    "CAACAgIAAxkBAAEHkQZf9H8HyELr9yM4LK4PpOwfD3cO5wACAwEAArd76yChrk8ggvIvUB4E",
    "CAACAgEAAxkBAAEHkQpf9H_ZjKHq4DsfRqdqDNUfm2A4NwAC0gcAAg6_0AokR8eQM2DR4R4E",
    "CAACAgEAAxkBAAEHkRJf9IB21dfho8A8F8h9LJcLGy60YAACvQUAAmbKaAlcMdjYueIaWx4E",
    "CAACAgEAAxkBAAEHkRZf9ICpB34AAbPJHWGSFAg-gi3sY_MAAv0FAAJmymgJf5YwILr33JQeBA",
    "CAACAgIAAxkBAAEHkSJf9IE15wMKMX6ND1rCcmuvP8S0cAACFgMAAvPjvgtU5nZY_J7lkh4E"    
]

Stickers_gratitude = [
    "CAACAgIAAxkBAAEHbBlf5OjE0D27j-DPHdc7w5vFo1iNKwACiBUAAowt_QfaoaLcxcJoOB4E",
    "CAACAgIAAxkBAAEHbBFf5Oe9i33yOoIdi_NP1K4egl_cZwACvAUAAj-VzAoTSKpoG9FPRh4E",
    "CAACAgQAAxkBAAEHa99f5N3DJoEWAvlFa5n4lw3U1alrmgACiQAD-t4aIM2PM0fq1DRgHgQ",
    "CAACAgIAAxkBAAEHa-Ff5N4M2LaKy0VF1HpHX7zvXPXaHAACGgADbFTVEy8WlQKIdTYKHgQ",
    "CAACAgIAAxkBAAEHa-df5N5n9uGd4RDMUH8SlrGc4BWUDAACPwEAArd76yBXrSIHKNosdh4E",
    "CAACAgIAAxkBAAEHa_Nf5N9vy8gve0jb9lZJ69b8PeyZMwACwAUAAotGbSdnnATETNNZXx4E",
    "CAACAgIAAxkBAAEHa_Vf5N-3LEll8U7hKqzAAfpA2mKWIQACWQEAAhAabSIdlWw5X85AHx4E",
    "CAACAgIAAxkBAAEHa_lf5OBlYv9xhwtvUnWM7wNb63d25AACYBAAAulVBRgUxlzBacQ8MB4E",
    "CAACAgIAAxkBAAEHa_tf5OCe6PAQ_wRCMjy2mGGlOhi1HgACAQYAAkb7rAQJuBy3H-Ro9x4E",
    "CAACAgIAAxkBAAEHkKNf9HQ0BE1q_3tZO7Bku0T_qKO1WAACiBUAAowt_QfaoaLcxcJoOB4E",
    "CAACAgIAAxkBAAEHkK9f9HTybn8JkLxDF0v5rjIXQP19iAACZwsAAorCmEoayuIF9OEC_h4E",
    "CAACAgIAAxkBAAEHkPxf9H5dvUmQoEB--sXVJKxQiI45nAACLQADS9C7EDHq8s4rVeHVHgQ",
    "CAACAgIAAxkBAAEHkWhf9ISvrOlp4j7leqsRMd8FAAFOJfcAAqNdAALgo4IHBbtUq2Uu7mIeBA"
]

Stickers_thanks = [
    "CAACAgIAAxkBAAEHbCVf5OptAeKOIh3Ef1O4fMXBQ6MlyQACZgQAAsxUSQnN4TiXiJCUZh4E",
    "CAACAgIAAxkBAAEHbB9f5OlD4gxejafkK3UsAsRIpVECNwACVQAD3uiLC6whoi-1WwjeHgQ",
    "CAACAgIAAxkBAAEHbBVf5OgJqk9ZJRAiOypgRG7DRLj4SAACkwQAApzW5wpZoLe2V4JtRh4E",
    "CAACAgIAAxkBAAEHa_9f5OW2oi-QLPwvHxVN5YvUcc6rQAACJAAD5KDOBwpWAnxE9V3WHgQ",
    "CAACAgIAAxkBAAEHbANf5OYR1NPPMXFSiezBtChRjQNlHwACDQADlp-MDjTPfw7aWjV1HgQ",
    "CAACAgIAAxkBAAEHkPRf9H3QS4Ae48xcTWEnGFB9jwj3-gACpwEAAzigCiq77pQrZXN5HgQ",
    "CAACAgIAAxkBAAEHkShf9IHjvPXjBzsNVoKkNZ5UQ1jjngACTTIAAuCjggdX8rZq2MXlzx4E",
    "CAACAgIAAxkBAAEHkWpf9ITnDt4rJsLxufMPqo_iv-OSZQACpBcAAulVBRis-ywMSCqrjR4E",
    "CAACAgIAAxkBAAEHkXZf9IVQKkoZVzYTtKXh8iTk1z4fFQACXgYAAkb7rATKdXpPc4PjrR4E",
    "CAACAgIAAxkBAAEHkXpf9IV9nKedIL90niuUOGEH9GYfSQACnwMAAsxUSQmx0DSKOpodWh4E",
    "CAACAgIAAxkBAAEHkYBf9IW4B4C_ryOw7acskpUWFJufoAAC4AIAAs-71A4rnbcNIjSzuB4E",
    "CAACAgIAAxkBAAEHkYJf9IXl9L1hUZRnKPqF0gABClLgyOoAAhYAAxcQnQewrMHhmu_ROB4E",
    "CAACAgIAAxkBAAEHkYRf9IYGiuBqFgxMscTZvVQOtH4VzAACcQYAAtJaiAFRu0dNW5WR-R4E",
    "CAACAgIAAxkBAAEHkYhf9IZ_6XKks8OODmpPaYBKuBlMAgACGgADz5TEBrITlNY3yHYyHgQ"
]


def auth(message):
    msg = bot.send_message(message.chat.id, "Введите код: ")
    bot.register_next_step_handler(msg, code_authorization)   

def code_authorization(message):
    try:
        code = AuthCode.objects.get(code=message.text)
    except AuthCode.DoesNotExist:
        bot.send_message(message.chat.id, "Неверный код! Попробуйте авторизоваться еще раз!")
    else:
        user = code.user
        user.chat_id = message.chat.id
        user.save()
        bot.send_message(
            message.chat.id, 
            f"Авторизация выполнена! Добро пожаловать, {user.get_full_name()}!"
        )

@bot.message_handler(content_types=['text', 'document', 'audio', 'photo', 'video', 'voice', 'sticker', 'location', 'poll', 'contact'])
def get_various_messages(message):              
        if message.text in ("приветики","привет",
                            "привет!","приветики!",
                            "Приветики","Привет",
                            "Привет!","Приветики!"):
            print('Bot received message.Reacting...')
            bot.send_sticker(message.chat.id, random.choice(Stickers_Hi))
            start_menu = types.ReplyKeyboardMarkup(True, True)
            start_menu.row('Авторизация')
            start_menu.row('Пришли показания', 'Спасибо!', 'Help')
            bot.send_message(message.chat.id, 'Привет, чем я могу тебе помочь?', reply_markup=start_menu)

        elif message.text in ("здравствуйте!", "здравствуй!",
                              "здравствуйте", "здравствуй",
                              "Здравствуйте!", "Здравствуй!",
                              "Здравствуйте", "Здравствуй"):
            print('Bot received message.Reacting...')
            bot.send_sticker(message.chat.id, random.choice(Stickers_Hi))
            start_menu = types.ReplyKeyboardMarkup(True, True)
            start_menu.row('Авторизация')
            start_menu.row('Пришли показания', 'Спасибо!', 'Help')
            bot.send_message(message.chat.id, 'И вам не хворать! Чем я могу помочь?', reply_markup=start_menu)

        elif message.text in ("Hello", "Hi", "Hi!", "Hello!", "/start"):
            print('Bot received start message.Reacting...')
            start_menu = types.ReplyKeyboardMarkup(True, True)
            start_menu.row('Авторизация', 'Привет!', 'Здравствуй!')
            start_menu.row('Пришли показания', 'Спасибо!', 'Help')
            bot.send_message(message.chat.id, 'Стартовое меню', reply_markup=start_menu)
            
        elif message.text in ("Авторизация","Авторизоваться","Войти","Вход",
                              "Залогиниться","Логин","авторизация", "авторизоваться",
                              "войти","вход","залогиниться","логин"):
            try:
                user = CLient.objects.get(chat_id=message.chat.id)
            except Client.DoesNotExist:
                bot.send_message(message.chat.id, "Пожалуйста, авторизуйтесь.")
                auth(message)            
            else:
                bot.send_message(message.chat.id, f"Вы уже авторизованы, {user.get_full_name()}")

        elif message.text in ("дай показания","пришли показания",
                              "пришли данные","дай данные",
                              "пришли отчёт","дай отчёт",
                              "Дай показания","Пришли показания",
                              "Пришли данные","Дай данные",
                              "Пришли отчёт","Дай отчёт"):
            print('Bot received data request.Reacting...')
            try:
                client = CLient.objects.get(chat_id=message.chat.id)
            except Client.DoesNotExist:
                bot.send_message(message.chat.id, "Вы не авторизовались!")
                auth(message)
            else:
                start_menu = types.ReplyKeyboardMarkup(True, True)
                start_menu.row('Пришли показания', 'Спасибо!', 'Help')
                bot.send_message(message.chat.id, 'Что будем делать?', reply_markup=start_menu)

        elif message.text in ("Спасибо!","спасибо!",
                              "спасибо","Спасибо",
                              "Благодарю!","Благодарю",
                              "благодарю!","благодарю"):
            print('Bot received message.Reacting...')
            bot.send_sticker(message.chat.id, random.choice(Stickers_gratitude))
            start_menu = types.ReplyKeyboardMarkup(True, True)
            start_menu.row('Авторизация', 'Привет!', 'Здравствуй!')
            start_menu.row('Пришли показания', 'Спасибо!', 'Help')
            bot.send_message(message.chat.id, 'Всегда пожалуйста! Если ещё что-нибудь будет нужно - пиши, не стесняйся!', reply_markup=start_menu)

        elif message.text in ("/help","help","Help","помоги",
                              "помогите","Помоги","Помогите"):
            print('Bot received "help" message.Reacting...')
            bot.send_message(message.chat.id, "Для начала напишите приветствие, запросите данные или пришлите файл, картинку и т.д. ")
            start_menu = types.ReplyKeyboardMarkup(True, True)
            start_menu.row('Авторизация', 'Привет!', 'Здравствуй!')
            start_menu.row('Пришли показания', 'Спасибо!', 'Help')
            bot.send_message(message.chat.id, 'Или просто воспользуйтесь клавишами:', reply_markup=start_menu)

        elif not warn:
            print('Bot received incorrect message!Reacting...')    
            bot.send_message(message.chat.id, "Я вас не понимаю. Напишите help.")
            bot.send_sticker(message.chat.id, random.choice(Stickers_help))       
               
print('successfully connected!')

bot.enable_save_next_step_handlers()
bot.load_next_step_handlers()

bot.polling(none_stop=True, interval=0)
