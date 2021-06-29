from django.test import TestCase
from django.urls import reverse, resolve


class TestUrls(TestCase):
    def test_email_activation_url(self):
        """Убедиться, что ссылка и вью связаны правильно"""
        path = reverse("client-activate")
        self.assertEqual(resolve(path).view_name, "client-activate")

    def test_chat_url(self):
        """Убедиться, что ссылка и вью связаны правильно"""
        path = reverse("client-chat")
        self.assertEqual(resolve(path).view_name, "client-chat")
