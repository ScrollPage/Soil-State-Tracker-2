from django.core.management.base import BaseCommand
from django.utils import timezone

import paho.mqtt.client as mqtt

from backend.settings import MQTT_HOST, MQTT_PORT, DETECTOR_TOPIC
from detector.models import DetectorCommand


class Command(BaseCommand):
    help = "Releases all of the storaged commands"

    def handle(self, *args, **options):
        client = mqtt.Client()
        client.connect(MQTT_HOST, MQTT_PORT, 3600)
        commands = DetectorCommand.objects.filter(timestamp__lte=timezone.now())
        for command in commands:
            client.publish(DETECTOR_TOPIC, command.command)
        client.disconnect()
        commands.delete()
