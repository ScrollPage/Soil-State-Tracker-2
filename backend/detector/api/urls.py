from django.urls import path

from .views import DetectorViewSet

detector_list = DetectorViewSet.as_view({
    'get': 'free_detectors'
})

urlpatterns = [
    path('detectors/', detector_list, name='free-detectors')
]