from django.contrib import admin

from .models import Detector, DetectorCommand, InnerDetectorCounter

admin.site.register(Detector)
admin.site.register(DetectorCommand)
admin.site.register(InnerDetectorCounter)
