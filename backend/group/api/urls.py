from django.urls import path

from .views import ClusterViewSet

cluster = ClusterViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

detector_add = ClusterViewSet.as_view({
    'post': 'add_detector',
    'get': 'cluster_detectors',
    'put': 'update',
    'patch': 'partial_update',
})

detector_remove = ClusterViewSet.as_view({
    'post': 'remove_detector'
})

cluster_mean_data = ClusterViewSet.as_view({
    'get': 'get_mean_data'
})

urlpatterns = [
    path('cluster/', cluster, name='cluster-list'),
    path('cluster/remove/', detector_remove, name='remove-detector'),
    path('cluster/<int:pk>/', detector_add, name='add-detector'),
    path('cluster/<int:pk>/data/', cluster_mean_data, name='cluster-mean-data'),
]