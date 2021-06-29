from django.test import TestCase
from django.urls import reverse, resolve


class TestUrls(TestCase):
    def test_cluster_url(self):
        """Убедиться, что ссылка и вью связаны правильно"""
        path = reverse("cluster-list")
        self.assertEqual(resolve(path).view_name, "cluster-list")

    def test_cluster_detector_remove_url(self):
        """Убедиться, что ссылка и вью связаны правильно"""
        path = reverse("remove-detectors")
        self.assertEqual(resolve(path).view_name, "remove-detectors")

    def test_cluster_add_detector_url(self):
        """Убедиться, что ссылка и вью связаны правильно"""
        path = reverse("cluster-detectors", kwargs={"pk": 1})
        self.assertEqual(resolve(path).view_name, "cluster-detectors")

    def test_cluster_mean_data_url(self):
        """Убедиться, что ссылка и вью связаны правильно"""
        path = reverse("cluster-mean-data", kwargs={"pk": 1})
        self.assertEqual(resolve(path).view_name, "cluster-mean-data")
