from django.utils import timezone

import paho.mqtt.client as mqtt

from backend.settings import MQTT_HOST, MQTT_PORT
from detector.models import DetectorCommand
from backend.celery import app as celery_app

@celery_app.task
def release():
    client = mqtt.Client()
    client.connect(MQTT_HOST, MQTT_PORT, 3600)
    commands = DetectorCommand.objects.filter(timestamp__lte=timezone.now())
    for command in commands:
        client.publish('data', command.command)
    client.disconnect()
    commands.delete()
