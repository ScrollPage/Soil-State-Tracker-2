from django.urls import path

from .views import DetectorViewSet

detector_list = DetectorViewSet.as_view({
    'get': list
})

urlpatterns = [
    path('detector/', detector_list, name='detector')
]