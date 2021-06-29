from mixer.backend.django import mixer
from django.test import TestCase

from detector_data.models import DetectorData


class TestModels(TestCase):
    def test_detector_str(self):
        detector = mixer.blend("detector.Detector", x=1, y=2)
        self.assertEqual(str(detector), f"датчик {detector.id}")

    def test_detector_data_str(self):
        detector = mixer.blend("detector.Detector", x=1, y=2)
        detector_data = mixer.blend("detector_data.DetectorData", detector=detector)
        self.assertEqual(
            str(detector_data), f"Отчет в {detector_data.timestamp} от {str(detector)}"
        )

    def test_create_random(self):
        detector = mixer.blend("detector.Detector", x=1, y=2)
        data = DetectorData.create_random(detector)
        self.assertEqual(type(data), DetectorData)
        self.assertEqual(data.detector, detector)
