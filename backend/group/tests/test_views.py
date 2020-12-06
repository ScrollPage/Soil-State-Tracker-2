from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from django.conf import settings

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
        self.cluster = Cluster.objects.create(user=self.user1)
         
        self.free_detector = Detector.objects.create(user=self.user1, x=1, y=2)

        self.cluster_detector = Detector.objects.create(user=self.user1, x=1, y=1, cluster=self.cluster)
        self.todays_data_first = DetectorData.create_random(self.cluster_detector)
        self.todays_data_second = DetectorData.create_random(self.cluster_detector)

    def test_cluster_list_unauth(self):
        resposne = get_response('cluster-list', 'get')
        self.assertEqual(resposne.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_cluster_list_auth(self):
        response = get_response('cluster-list', 'get', self.user1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(len(response.data[0]['cluster_detectors']), 1)

    def test_cluster_detectors_list(self):
        response = get_response('cluster-detectors', 'get', self.user1, kwargs={'pk': self.cluster.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.cluster_detector.id)

    def test_cluster_detectors_list_wrong_cluster(self):
        response = get_response('cluster-detectors', 'get', self.user1, kwargs={'pk': 999})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_cluster_detectors_add(self):
        response = get_response(
            'cluster-detectors', 'post', self.user1,
            {"detectors": [self.free_detector.id]}, {'pk': self.cluster.id},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = get_response('cluster-detectors', 'get', self.user1, kwargs={'pk': self.cluster.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['id'], self.free_detector.id)

    def test_cluster_detectors_remove(self):
        response = get_response(
            'remove-detectors', 'post', 
            self.user1, {"detectors": [self.cluster_detector.id]}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = get_response('cluster-detectors', 'get', self.user1, kwargs={'pk': self.cluster.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_cluster_mean_data(self):
        response = get_response('cluster-mean-data', 'get', self.user1, kwargs={'pk': self.cluster.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(
            float(response.data[0]['pH']),
            round((self.todays_data_first.pH+self.todays_data_second.pH)/2, 2)
        )
    

    