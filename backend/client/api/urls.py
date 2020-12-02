from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    
]

activate = views.ClientActivity.as_view({
    'post': 'activate'
})

urlpatterns += format_suffix_patterns([
    path('activate/', activate, name='activate'),
])