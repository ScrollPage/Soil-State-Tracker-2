import telebot
import random
from telebot import types

from client.models import CLient

bot = telebot.TeleBot('1467374444:AAHuKNmwn6GgzXR0nS2WFZHksy1kuWtpOco');
print('connecting to Telegram Bot...')
Stickers_help = [
    "CAACAgIAAxkBAAEHa6tf5M6IGAQ_BeYeDJ87CJVnXsdgwwACBwAD5fLbL3U3ASFpTKhdHgQ",
    "CAACAgIAAxkBAAEHa7Nf5M9sRbr-GziKDHtzTyAkUgMKIgACSgADfzdMK5XBs4IrrbOkHgQ",
    "CAACAgEAAxkBAAEHa7Vf5M-BGAQVcCX1Ie7rGSIHrw8y0wAC4AkAAr-MkAQwN-UmfXmbVh4E",
    "CAACAgIAAxkBAAEHa7lf5NFfUswTWdo3ijqD2UscoT9n2wACRi0AAulVBRjJVbspVyQ_8x4E"
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
    "CAACAgIAAxkBAAEHbA9f5OcswlMkOAABvo-MMi1c0O7UICEAArsFAAI_lcwKwfkMaDTUHTYeBA"
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
    "CAACAgIAAxkBAAEHa_tf5OCe6PAQ_wRCMjy2mGGlOhi1HgACAQYAAkb7rAQJuBy3H-Ro9x4E"
]

Stickers_thanks = ["CAACAgIAAxkBAAEHbCVf5OptAeKOIh3Ef1O4fMXBQ6MlyQACZgQAAsxUSQnN4TiXiJCUZh4E","CAACAgIAAxkBAAEHbB9f5OlD4gxejafkK3UsAsRIpVECNwACVQAD3uiLC6whoi-1WwjeHgQ","CAACAgIAAxkBAAEHbBVf5OgJqk9ZJRAiOypgRG7DRLj4SAACkwQAApzW5wpZoLe2V4JtRh4E","CAACAgIAAxkBAAEHa_9f5OW2oi-QLPwvHxVN5YvUcc6rQAACJAAD5KDOBwpWAnxE9V3WHgQ","CAACAgIAAxkBAAEHbANf5OYR1NPPMXFSiezBtChRjQNlHwACDQADlp-MDjTPfw7aWjV1HgQ"]

blacklist = [
    "дурак", "идиот", "придурок", "тупой", "мразь", "тварь", 
    "гавно", "даун", "кривой", "аутист", "неадекватный", "бля", 
    "хуй", "пизд", "пидар", "сука", "суки", "Дурак", "Идиот", "Придурок", 
    "Тупой", "Мразь", "Тварь", "Гавно", "Даун", "Кривой", "Аутист", "Неадекватный", 
    "Бля", "Хуй", "Пизд", "Пидар", "Сука", "Суки"]

# DataStorage = "C:\Users\papat\Desktop\Data.txt" #"C:/Users/DragonS/AppData/Local/Programs/Python/Data.txt"
# path = "C:\Users\papat\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Python 3.9\downloaded"  #"C:/Users/DragonS/AppData/Local/Programs/Python/Downloaded/"

@bot.message_handler(content_types=['text', 'document', 'audio', 'photo', 'video', 'voice','sticker'])
def get_various_messages(message):   
    # try:
    
    try:
        CLient.objects.get(chat_id=message.chat.id)
    except Client.DoesNotExist:
        bot.send_message(message.chat.id, "Залогинься")

    warn = False
    angry = False
    for x in blacklist:
        if x in message.text: 
            print('Bot received expletive!Reacting...')
            revenge = x
            if angry:
                bot.send_message(message.chat.id, "Ты это заслужил!")
                bot.send_sticker(message.chat.id, 'CAACAgIAAxkBAAEHa0hf5KyLXfcVhctjiD8GYtlmFcEcmgACnQADPzXyBNFqL9q7maP_HgQ')
            else:
                bot.send_message(message.chat.id, "Кто как обзывается, тот так и называется! Сам ты " + revenge + "!")
                angry = True
            warn = True
    
    if message.text in ("приветики","привет",
                        "привет!","приветики!",
                        "Приветики","Привет",
                        "Привет!","Приветики!"):
        print('Bot received message.Reacting...')
        bot.send_message(message.chat.id, "Привет, чем я могу тебе помочь?")
    elif message.text in ("здравствуйте!", "здравствуй!", "здравствуйте", "здравствуй", "Здравствуйте!", "Здравствуй!", "Здравствуйте", "Здравствуй"):
        print('Bot received message.Reacting...')
        bot.send_message(message.chat.id, "И вам не хворать! Чем я могу помочь?")
    elif message.text in ("Hello", "Hi", "Hi!", "Hello!", "/start"):
        print('Bot received message.Reacting...')
        bot.send_message(message.chat.id, "Hello. Sorry, but I'm a not very advanced bot, so I can speak Russian only. Write 'Привет' or 'help', please.")
    elif message.text in ("дай показания","пришли показания","пришли данные","дай данные","пришли отчёт","дай отчёт","Дай показания","Пришли показания","Пришли данные","Дай данные","Пришли отчёт","Дай отчёт"):
        print('Bot received data request.Reacting...')
        data_file = open(DataStorage, "rb")
        bot.send_message(message.chat.id, "Актуальные показания приборов собраны в следующий файл: ")
        bot.send_document(message.chat.id, data_file)
        data_file.close()
    elif message.text in ("Спасибо!","спасибо!","спасибо","Спасибо","Благодарю!","Благодарю","благодарю!","благодарю"):
        print('Bot received message.Reacting...')
        bot.send_message(message.chat.id, "Всегда пожалуйста! Если ещё что-нибудь будет нужно - пиши, не стесняйся!")
        bot.send_sticker(message.chat.id, random.choice(Stickers_gratitude))
    elif message.text in ("/help","help","Help","помоги","помогите","Помоги","Помогите"):
        print('Bot received "help" message.Reacting...')
        bot.send_message(message.chat.id, "Для начала напишите приветствие, запросите данные или пришлите файл, картинку и т.д.")
    elif not warn:
        print('Bot received incorrect message!Reacting...')    
        bot.send_message(message.chat.id, "Я вас не понимаю. Напишите help.")
        bot.send_sticker(message.chat.id, random.choice(Stickers_help))
            
    # except Exception as skip:
    #     if message.document:
    #         print('Bot received file.Reacting...')
    #         file_info = bot.get_file(message.document.file_id)
    #         downloaded_file = bot.download_file(file_info.file_path)
    #         src = path + message.document.file_name;
    #         with open(src, 'wb') as new_file:
    #             new_file.write(downloaded_file)
    #         bot.send_message(message.chat.id, "Файл? Возьму его себе, спасибо!")
    #         bot.send_sticker(message.chat.id, random.choice(Stickers_thanks))
    #     elif message.audio:
    #         print('Bot received audio.Reacting...')
    #         file_info = bot.get_file(message.audio.file_id)
    #         downloaded_file = bot.download_file(file_info.file_path)
    #         src =path + message.audio.title + ".mp3";
    #         with open(src, 'wb') as new_file:
    #             new_file.write(downloaded_file) 
    #         bot.send_message(message.chat.id, "О, музончик! Классный трек! Наверное. Ушей-то у меня нет... Но я его себе всё равно сохраню.")
    #         bot.send_sticker(message.chat.id, random.choice(Stickers_thanks))
    #     elif message.photo:
    #         print('Bot received photo.Reacting...')
    #         file_info = bot.get_file(message.photo[len(message.photo) - 1].file_id)
    #         downloaded_file = bot.download_file(file_info.file_path)
    #         src =path + message.photo[1].file_id + ".png";
    #         with open(src, 'wb') as new_file:
    #             new_file.write(downloaded_file)
    #         bot.send_message(message.chat.id, "Прикольная картинка! Возьму её себе, спасибо! Надеюсь, меня за неё не посадят...")
    #         bot.send_sticker(message.chat.id, random.choice(Stickers_thanks))
    #     elif message.video:
    #         print('Bot received video.Reacting...')
    #         file_info = bot.get_file(message.video.file_id)
    #         downloaded_file = bot.download_file(file_info.file_path)
    #         src = path + message.video.file_id + ".mp4";
    #         with open(src, 'wb') as new_file:
    #             new_file.write(downloaded_file)
    #         bot.send_message(message.chat.id, "Зачётный видос! Сохраню его себе, спасибо! Надеюсь, меня за это не посадят...")
    #         bot.send_sticker(message.chat.id, random.choice(Stickers_thanks))
    #     elif message.voice:
    #         print('Bot received voice message.Reacting...')
    #         file_info = bot.get_file(message.voice.file_id)
    #         downloaded_file = bot.download_file(file_info.file_path)
    #         src = path + message.voice.file_id + ".ogg";
    #         with open(src, 'wb') as new_file:
    #             new_file.write(downloaded_file)
    #         bot.send_message(message.from_user.id, "Хочешь поболтать? ТОГДА НАЙДИ СЕБЕ ЖИВОГО СОБЕСЕДНИКА! А голос я твой сохраню. Так, на всякий случай...")
    #     elif message.sticker:
    #         print('Bot received sticker.Reacting...')
    #         bot.send_message(message.chat.id, "Классный стикер! Держи в ответ!")
    #         bot.send_sticker(message.chat.id, random.choice(Stickers))
               
print('successfully connected!')    
bot.polling(none_stop=True, interval=0)
