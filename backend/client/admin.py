from django.contrib import admin

from .models import Client, AuthCode

admin.site.register(Client)
admin.site.register(AuthCode)