from rest_framework.decorators import action
from rest_framework import permissions, status
from rest_framework.response import Response

from .service import PSListViewSet
from .serializers import DetectorSerializer
from detector_data.api.serializers import DetectorDataSerializer
from detector.models import Detector

class DetectorViewSet(PSListViewSet):
    '''
    Список датчиков
    '''
    serializer_class = DetectorSerializer
    serializer_class_by_action = {
        'get_detector_data': DetectorDataSerializer
    }
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Detector.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def free_detectors(self, request, *args, **kwargs):
        detectors = self.get_queryset().filter(cluster=None)
        serializer = self.get_serializer(detectors, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def get_detector_data(self, request, *args, **kwargs):
        detector = self.get_object()
        detector_data = detector.data.all()
        serializer = self.get_serializer(detector_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
