from rest_framework.viewsets import GenericViewSet

from backend.core import PermissionMixin, SerializerMixin, FastResponseMixin

class PSFViewSet(
    PermissionMixin, SerializerMixin, 
    FastResponseMixin, GenericViewSet
):
    '''Доп методы к стандартному вью сету'''
    pass