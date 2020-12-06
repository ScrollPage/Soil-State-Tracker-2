from django.test import TestCase
from django.urls import reverse, resolve

class TestUrls(TestCase):

    def test_free_detectors_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('free-detectors')
        self.assertEqual(resolve(path).view_name, 'free-detectors')

    def test_detector_data_url(self):
        '''Убедиться, что ссылка и вью связаны правильно'''
        path = reverse('detector-data', kwargs={'pk': 1})
        self.assertEqual(resolve(path).view_name, 'detector-data')
