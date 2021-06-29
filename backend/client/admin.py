from django.contrib import admin

from .models import Client, AuthCode, SendSettings

admin.site.register(Client)
admin.site.register(AuthCode)
admin.site.register(SendSettings)
