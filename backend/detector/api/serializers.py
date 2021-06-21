# type: ignore
from rest_framework import serializers

from detector.models import Detector, DetectorCommand


class ClusterNameSerializer(serializers.StringRelatedField):
    """Сериализация имени кластера"""

    def to_internal_value(self, value):
        return value


class DetectorSerializer(serializers.ModelSerializer):
    """Сериализация датчика"""

    cluster = ClusterNameSerializer(read_only=True)

    class Meta:
        model = Detector
        exclude = ["user"]


class DetectorCommandSerializer(serializers.ModelSerializer):
    """Сериализация команды датчику"""

    class Meta:
        model = DetectorCommand
        exclude = ["command", 'user']
