from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin

from backend.service import PermissionSerializerMixin

class PSListViewSet(PermissionSerializerMixin,
                    GenericViewSet,
                    ListModelMixin
                ):
    '''
    Переопредение методов определения прав доступа и сериализатора
    Методы: list
    '''
    pass