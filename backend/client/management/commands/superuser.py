# type: ignore
from django.core.management.base import BaseCommand

from client.models import Client


class Command(BaseCommand):
    help = "Creates 2 dummy superusers"

    def handle(self, *args, **options):
        Client.objects.create_superuser("sos@sos.com", "sos", "sos", password="1")
        Client.objects.create_superuser("sas@sos.com", "sas", "sas", password="1")
