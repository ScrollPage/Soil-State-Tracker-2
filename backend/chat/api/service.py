from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
)

from backend.core import PermissionMixin, SerializerMixin, FastResponseMixin


class PRetrieveCreateDestroyViewSet(
    PermissionMixin,
    FastResponseMixin,
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    GenericViewSet,
):
    """
    Создание, удаление
    Доп методы
    """

    pass
