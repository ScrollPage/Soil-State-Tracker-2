from rest_framework import serializers

from detector_data.models import DetectorData


class DetectorDataSerializer(serializers.ModelSerializer):
    """Сериализация данных датчика"""

    min_timestamp = serializers.DateField(read_only=True)

    class Meta:
        model = DetectorData
        exclude = ["detector"]
