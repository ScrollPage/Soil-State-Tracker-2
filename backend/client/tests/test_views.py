from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from client.models import Client
from backend.core import get_response

from chat.models import Chat


class TestViews(APITestCase):

    def setUp(self):
        self.user1 = Client.objects.create_user(
            email='test@case1.test',
            first_name='common',
            last_name='user',
            password='very_strong_psw'
        )

        self.user2 = Client.objects.create_user(
            email='test@case2.test',
            first_name='common',
            last_name='user',
            password='very_strong_psw'
        )

        self.user3 = Client.objects.create_superuser(
            email='test@case3.test',
            first_name='admin',
            last_name='admin',
            password='very_strong_psw',
        )

        self.chat1 = Chat.objects.create(user=self.user1, admin=self.user3)
        self.chat2 = Chat.objects.create(user=self.user2, admin=self.user3)

    def test_chat_first_user(self):
        response = get_response('client-chat', 'get', self.user1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.chat1.id)

    def test_chat_second_user(self):
        response = get_response('client-chat', 'get', self.user2)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], self.chat2.id)

    def test_chat_admin(self):
        response = get_response('client-chat', 'get', self.user3)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['id'], self.chat1.id)

    def test_activation(self):
        key = Token.objects.get(user=self.user1).key
        response = get_response('client-activate', 'post', data={'token': key})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_activation_wrong_key(self):
        key = Token.objects.get(user=self.user1)
        response = get_response('client-activate', 'post', data={'token': 1})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)