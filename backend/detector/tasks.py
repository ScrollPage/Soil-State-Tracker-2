from django.utils import timezone

import paho.mqtt.client as mqtt

from backend.settings import (
    MQTT_HOST, MQTT_PORT, 
    DETECTOR_TOPIC, DATA_COMMAND_ID
)
from detector.models import DetectorCommand
from client.models import Client
from backend.celery import app as celery_app
from .service import CommandCreator


@celery_app.task
def release():
    clients = Client.objects.filter(is_superuser=False, is_staff=False, is_active=True) \
        .exclude(commands__category='2')
    commands = DetectorCommand.objects.filter(timestamp__lte=timezone.now())

    client = mqtt.Client()
    client.connect(MQTT_HOST, MQTT_PORT, 3600)

    for user in clients:
        client.publish(
            DETECTOR_TOPIC,
            CommandCreator(user, DATA_COMMAND_ID).create_data()
        )
    
    for command in commands:
        client.publish(DETECTOR_TOPIC, command.command)

    client.disconnect()
    commands.delete()
