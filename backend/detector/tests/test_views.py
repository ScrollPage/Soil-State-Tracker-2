from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from django.conf import settings
from django.test import override_settings

from client.models import Client
from group.models import Cluster
from detector.models import Detector, DetectorData
from backend.service import get_response

class TestViews(APITestCase):

    def setUp(self):
        self.user1 = Client.objects.create_user(
            email='test@case1.test',
            first_name='admin',
            last_name='admin',
            password='very_strong_psw'
        )
        self.free_detector = Detector.objects.create(
            user=self.user1,
            x=1, 
            y=2
        )

        DetectorData.create_random(self.free_detector)

    @override_settings(CACHEOPS_ENABLED=False)
    def test_free_detectors_unauth(self):
        response = get_response('free-detectors', 'get')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_free_detectors_auth(self):
        response = get_response('free-detectors', 'get', self.user1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.free_detector.id)

    def test_detector_data_auth(self):
        response = get_response('detector-data', 'get', self.user1, kwargs={'pk': self.free_detector.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), self.free_detector.data.count())

    