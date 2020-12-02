from rest_framework import serializers

from detector.models import Detector

class DetectorSerializer(serializers.ModelSerializer):
    '''Сериализация датчика'''
    class Meta:
        model = Detector
        exclude = ['user', 'cluster']