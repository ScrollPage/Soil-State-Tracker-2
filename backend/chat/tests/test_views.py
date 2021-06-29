from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from client.models import Client
from backend.core import get_response

from chat.models import Chat


class TestViews(APITestCase):
    def setUp(self):
        self.user1 = Client.objects.create_user(
            email="test@case1.test",
            first_name="common",
            last_name="user",
            password="very_strong_psw",
        )

        self.user2 = Client.objects.create_user(
            email="test@case2.test",
            first_name="common",
            last_name="user",
            password="very_strong_psw",
        )

        self.user3 = Client.objects.create_user(
            email="test@case3.test",
            first_name="common",
            last_name="user",
            password="very_strong_psw",
        )

        self.user4 = Client.objects.create_superuser(
            email="test@case4.test",
            first_name="admin",
            last_name="admin",
            password="very_strong_psw",
        )

        self.chat1 = Chat.objects.create(user=self.user1, admin=self.user4)
        self.chat2 = Chat.objects.create(user=self.user2)

    def test_chat_create_already_created(self):
        response = get_response("chat-list", "post", self.user1)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(int(response.data["id"]), self.chat1.id)

    def test_chat_create(self):
        response = get_response("chat-list", "post", self.user3)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_chat_delete_user(self):
        response = get_response(
            "chat-detail", "delete", self.user1, kwargs={"pk": self.chat1.id}
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_chat_delete_admin(self):
        response = get_response(
            "chat-detail", "delete", self.user4, kwargs={"pk": self.chat1.id}
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_chat_delete_other_user(self):
        response = get_response(
            "chat-detail", "delete", self.user3, kwargs={"pk": self.chat1.id}
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_chat_free_user(self):
        response = get_response("chat-free", "get", self.user1)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_chat_free_admin(self):
        response = get_response("chat-free", "get", self.user4)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], self.chat2.id)

    def test_chat_admin_by_user(self):
        response = get_response(
            "chat-admin", "put", self.user1, kwargs={"pk": self.chat2.id}
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_chat_admin_exists(self):
        response = get_response(
            "chat-admin", "put", self.user4, kwargs={"pk": self.chat1.id}
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_chat_admin_by_admin(self):
        response = get_response(
            "chat-admin", "put", self.user4, kwargs={"pk": self.chat2.id}
        )
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
