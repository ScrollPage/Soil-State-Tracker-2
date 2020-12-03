from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin, UpdateModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from backend.service import SerializerMixin

class PSListCreateViewSet(SerializerMixin,
                          GenericViewSet,
                          ListModelMixin,
                          UpdateModelMixin,
                          CreateModelMixin
                        ):
    '''
    Переопредение методов определения прав доступа и сериализатора
    Методы: list create
    '''
    pass

class PaginationData(PageNumberPagination):
    page_size = 20
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response(data)
