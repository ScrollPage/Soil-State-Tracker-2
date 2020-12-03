from django.urls import path

from .views import DetectorViewSet

detector_list = DetectorViewSet.as_view({
    'get': 'free_detectors'
})

detector_data = DetectorViewSet.as_view({
    'get': 'get_detector_data',
})

urlpatterns = [
    path('detector/', detector_list, name='free-detectors'),
    path('detector/<int:pk>/', detector_data, name='detector-data')
]