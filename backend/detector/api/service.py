from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin

from backend.service import SerializerMixin

class PSListViewSet(SerializerMixin,
                    GenericViewSet,
                    ListModelMixin
                ):
    '''
    Переопредение методов определения прав доступа и сериализатора
    Методы: list
    '''
    pass