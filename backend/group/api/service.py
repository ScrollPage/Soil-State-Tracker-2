from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin, CreateModelMixin, UpdateModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.db.models import Min, Max, Avg

from datetime import datetime, timedelta

from backend.service import SerializerMixin
from detector.models import Detector, DetectorData

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
    page_size = 5
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response(data)

def slice_data_by_timestamp(queryset):
    res = list()
    i = 0
    time = datetime.now().date()
    timestamp_aggregation = Detector.objects.all().aggregate(
        min_timestamp=Min('data__timestamp'),
        max_timestamp=Max('data__timestamp')
    )
    min_timestamp = timestamp_aggregation['min_timestamp']
    max_timestamp = timestamp_aggregation['max_timestamp']
    if min_timestamp and max_timestamp:
        while min_timestamp + timedelta(days=i) <= max_timestamp:
            date_sliced_queryset = DetectorData.objects.filter(
                detector__in=queryset,
                timestamp=min_timestamp+timedelta(days=i)
            )
            i += 1
            res.append(date_sliced_queryset)
        
    return res

def queryset_mean(queryset):

    def map_slicing_func(queryset):
        aggregated_data = queryset \
            .aggregate(
                mean_first_temp=Avg('first_temp'),
                mean_second_temp =Avg('second_temp'),
                mean_third_temp=Avg('third_temp'),
                mean_humidity=Avg('humidity'),
                mean_lightning=Avg('lightning'),
                mean_pH=Avg('pH'),
                mean_timestamp=Min('timestamp'),
            )

        return dict(
            first_temp = aggregated_data['mean_first_temp'],
            second_temp = aggregated_data['mean_second_temp'],
            third_temp = aggregated_data['mean_third_temp'],
            humidity = aggregated_data['mean_humidity'],
            lightning = aggregated_data['mean_lightning'],
            pH = aggregated_data['mean_pH'],
            timestamp = aggregated_data['mean_timestamp'],
        )
    
    return list(map(map_slicing_func, queryset))
