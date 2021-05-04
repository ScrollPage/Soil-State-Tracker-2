from django.contrib import admin

from .models import Detector, DetectorCommand

admin.site.register(Detector)
admin.site.register(DetectorCommand)