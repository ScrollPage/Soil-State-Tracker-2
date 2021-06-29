from mixer.backend.django import mixer
from django.test import TestCase


class TestModels(TestCase):
    def test_client_str(self):
        client = mixer.blend("client.Client", email="test@case.com")
        self.assertEqual(str(client), "test@case.com")

    def test_cliset_full_name(self):
        client = mixer.blend("client.Client", first_name="test", last_name="case")
        self.assertEqual(client.get_full_name(), "case test")
