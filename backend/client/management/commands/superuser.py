# type: ignore
from django.core.management.base import BaseCommand

from client.models import Client


class Command(BaseCommand):
    help = "Creates dummy superuser and user"

    def handle(self, *args, **options):
        Client.objects.create_superuser("sos@sos.com", "sos", "sos", password="1")
        c = Client.objects.create_user("sas@sas.com", "sas", "sas", password="1")
        c.is_active = True
        c.save()
