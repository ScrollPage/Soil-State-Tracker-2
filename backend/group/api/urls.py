from django.urls import path

from .views import ClusterViewSet

cluster = ClusterViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

detectors_add = ClusterViewSet.as_view({
    'post': 'add_detector',
    'get': 'cluster_detectors',
    'put': 'update',
    'patch': 'partial_update',
})

detectors_remove = ClusterViewSet.as_view({
    'post': 'remove_detector'
})

urlpatterns = [
    path('cluster/', cluster, name='cluster-list'),
    path('cluster/<int:pk>/', detectors_add, name='add-detector'),
    path('cluster/remove/', detectors_remove, name='remove-detector')
]