from rest_framework import serializers

from group.models import Cluster
from detector.api.serializers import DetectorSerializer

class ClusterSerializer(serializers.ModelSerializer):
    '''Сериализация группы'''
    cluster_detectors = DetectorSerializer(read_only=True, many=True)
    num_detectors = serializers.IntegerField(read_only=True)

    class Meta:
        model = Cluster
        fields = ['name', 'num_detectors', 'cluster_detectors']

class ClusterDetectorSerializer(serializers.Serializer):
    '''Сериализация списка идентификаторов'''
    detectors = serializers.ListField()