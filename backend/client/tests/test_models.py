from mixer.backend.django import mixer
from django.test import TestCase 

class TestModels(TestCase):

    def test_client_str(self):
        client = mixer.blend('client.Client', first_name='test', last_name='case')
        self.assertEqual(str(client), 'case test')