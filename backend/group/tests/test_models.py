from mixer.backend.django import mixer
from django.test import TestCase


class TestModels(TestCase):
    def test_detector_str(self):
        cluster = mixer.blend("group.Cluster", name="test cluster")
        self.assertEqual(str(cluster), "test cluster")
