from django.test import TestCase
from django.urls import reverse, resolve

class TestUrls(TestCase):

    def test_email_activation_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('activate')
        self.assertEqual(resolve(path).view_name, 'activate')

    def test_activity_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('check-activity', kwargs={'email': 'sos@sos.com'})
        self.assertEqual(resolve(path).view_name, 'check-activity')