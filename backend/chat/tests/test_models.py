from mixer.backend.django import mixer
from django.test import TestCase 


class TestModels(TestCase):

    def test_chat_last_message(self):
        client = mixer.blend('client.Client', email='test@case.com')
        chat = mixer.blend('chat.Chat', user=client)
        message1 = mixer.blend('chat.Message', chat=chat)
        message2 = mixer.blend('chat.Message', chat=chat)
        self.assertEqual(chat.last_message, message2)
