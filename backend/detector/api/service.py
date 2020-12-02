from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import ListModelMixin

from backend.service import PermissionSerializerMixin

class PSListViewSet(PermissionSerializerMixin,
                      GenericViewSet,
                      ListModelMixin
                    ):
    pass