# type: ignore
from django.db.models import F, DateTimeField, ExpressionWrapper
from django.utils import timezone

import paho.mqtt.client as mqtt

from datetime import time, timedelta

from backend.settings import MQTT_HOST, MQTT_PORT, DETECTOR_TOPIC, DATA_COMMAND_ID
from detector.models import DetectorCommand
from client.models import Client, SendSettings
from backend.celery import app as celery_app
from detector.service import CommandCreator


@celery_app.task
def release():

    clients = (
        Client.objects.filter(is_superuser=False, is_staff=False, is_active=True)
        .annotate(
            required_time=ExpressionWrapper(
                F("settings__last_send") + F("settings__currency"),
                output_field=DateTimeField(),
            ),
        )
        .filter(required_time__lte=timezone.now())
    )

    commands = DetectorCommand.objects.all()

    client = mqtt.Client()
    client.connect(MQTT_HOST, MQTT_PORT, 3600)

    for user in clients:
        client.publish(
            DETECTOR_TOPIC,
            CommandCreator(
                DetectorCommand(user=user, category=DATA_COMMAND_ID)
            ).create_data(),
        )

    SendSettings.objects.filter(user__in=clients).update(
        last_send=timezone.now() - timedelta(seconds=5)
    )

    for command in commands:
        client.publish(DETECTOR_TOPIC, command.command)

        if command.category == "3":
            sett = command.user.settings
            sett.currency = timedelta(minutes=int(command.extra["currency"]))
            sett.save()

    client.disconnect()
    commands.delete()
