from django.contrib import admin

from .models import Detector, DetectorData 

admin.site.register(Detector)
admin.site.register(DetectorData)