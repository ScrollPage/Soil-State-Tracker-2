from django.contrib import admin

from .models import Detector, DetectorCommand, InnerDetectorCounter, ReceiveConfirmation

admin.site.register(Detector)
admin.site.register(DetectorCommand)
admin.site.register(InnerDetectorCounter)
admin.site.register(ReceiveConfirmation)
