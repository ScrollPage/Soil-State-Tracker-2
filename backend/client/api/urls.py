from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import ClientViewSet


urlpatterns = []


r = DefaultRouter()
r.register("client", ClientViewSet, basename="client")
urlpatterns += r.urls
