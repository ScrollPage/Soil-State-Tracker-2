from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin

from backend.service import PermissionSerializerMixin

class PSListCreateViewSet(PermissionSerializerMixin,
                          GenericViewSet,
                          ListModelMixin,
                          CreateModelMixin
                        ):
    '''
    Переопредение методов определения прав доступа и сериализатора
    Методы: list create
    '''
    pass