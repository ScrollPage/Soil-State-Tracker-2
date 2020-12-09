from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin
from django.db.models.signals import pre_save
from backend.service import SerializerMixin
from detector.models import Detector

class PSListViewSet(SerializerMixin,
                    GenericViewSet,
                    ListModelMixin
                ):
    '''
    Переопредение методов определения прав доступа и сериализатора
    Методы: list
    '''
    pass