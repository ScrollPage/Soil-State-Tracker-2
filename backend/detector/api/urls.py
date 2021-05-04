from django.urls import path

from .views import DetectorViewSet, DetectorComamndView

detector_list = DetectorViewSet.as_view({
    'get': 'free_detectors'
})

detector_data = DetectorViewSet.as_view({
    'get': 'get_detector_data',
})

urlpatterns = [
    path(
        'detector/command/', 
        DetectorComamndView.as_view(), 
        name='detector-command-list'
    ),
    path('detector/', detector_list, name='free-detectors'),
    path('detector/<int:pk>/', detector_data, name='detector-data')
]