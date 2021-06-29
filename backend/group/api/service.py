from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    ListModelMixin,
    CreateModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from django.db.models import Min, Max, Avg, IntegerField
from django.utils import timezone
from django.db.models.functions import Cast

from datetime import timedelta

from backend.core import SerializerMixin, QueryDate
from detector_data.models import DetectorData


class SListCreateUpdateViewSet(
    SerializerMixin,
    GenericViewSet,
    ListModelMixin,
    UpdateModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
    QueryDate,
):
    """
    Переопредение методов определения прав доступа и сериализатора
    Методы: list create
    Метод get_query_params_date
    """

    pass


class PaginationData(PageNumberPagination):
    page_size = 5
    max_page_size = 1000

    def get_paginated_response(self, data):
        return Response(data)


def get_aggregated_data(queryset, multiplier, begin_date):
    ranges = (begin_date, timezone.now())
    detector_data_queryset = (
        DetectorData.timescale.filter(timestamp__range=ranges, detector__in=queryset)
        .time_bucket_gapfill(
            "timestamp",
            f"{multiplier} day",
            ranges[0],
            ranges[1],
            datapoints=1,
        )
        .annotate(
            Avg("first_temp"),
            Avg("second_temp"),
            Avg("lightning"),
            Avg("humidity"),
        )
    )

    res = list()
    for data in detector_data_queryset:
        if data["first_temp__avg"] is not None:
            res.append(
                dict(
                    first_temp=data["first_temp__avg"],
                    second_temp=data["second_temp__avg"],
                    humidity=data["humidity__avg"],
                    lightning=data["lightning__avg"],
                    timestamp=data["bucket"],
                )
            )

    return res
