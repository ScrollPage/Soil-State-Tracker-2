from rest_framework.decorators import action
from rest_framework import permissions, status
from rest_framework.response import Response

from .service import PSListViewSet
from .serializers import DetectorSerializer
from detector.models import Detector

class DetectorViewSet(PSListViewSet):
    '''
    Список датчиков
    '''
    serializer_class = DetectorSerializer
    serializer_class_by_action = {

    }
    permission_classes = [permissions.IsAuthenticated]
    permission_classes_by_action = {

    }
    
    def get_queryset(self):
        return Detector.objects.filter(user=self.request.user)
    
    @action(detail=False, mmethods=['get'])
    def free_detectors(self, request, *args, **kwargs):
        detectors = self.get_queryset().filter(cluster=None)
        serializer = self.get_serializer(detectors, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)