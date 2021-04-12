from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin

from backend.core import SerializerMixin, QueryDate

class PSListViewSet(SerializerMixin,
                    GenericViewSet,
                    ListModelMixin,
                    QueryDate
                ):
    '''
    Переопредение методов определения прав доступа и сериализатора
    Методы: list
    '''
    pass