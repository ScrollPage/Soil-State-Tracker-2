# type: ignore
from django.db.models import F, DateTimeField, ExpressionWrapper
from django.utils import timezone

import paho.mqtt.client as mqtt

from datetime import time, timedelta

from backend.settings import (
    MQTT_HOST,
    MQTT_PORT,
    DETECTOR_TOPIC,
    DATA_COMMAND_ID,
    CURRRENCY_COMMAND_ID,
    DEFAULT_SEND_CURRENCY_MINUTES,
)
from detector.models import DetectorCommand
from client.models import Client, SendSettings
from backend.celery import app as celery_app
from detector.mqtt.service import CommandCreator


@celery_app.task
def release():

    clients = (
        Client.objects.filter(is_superuser=False, is_staff=False, is_active=True)
        .select_related("settings")
        .annotate(
            required_time=ExpressionWrapper(
                F("settings__last_send") + F("settings__currency"),
                output_field=DateTimeField(),
            ),
        )
        .filter(required_time__lte=timezone.now())
    )

    commands = (
        DetectorCommand.objects.select_related("user__settings")
        .annotate(
            required_time=ExpressionWrapper(
                F("user__settings__last_send") + F("user__settings__currency"),
                output_field=DateTimeField(),
            ),
        )
        .filter(required_time__lte=timezone.now(), wait_resp=False)
    )

    client = mqtt.Client()
    client.connect(MQTT_HOST, MQTT_PORT, 3600)

    # Send data commands
    for user in clients:
        client.publish(
            DETECTOR_TOPIC,
            CommandCreator(
                DetectorCommand(category=DATA_COMMAND_ID, user=user)
            ).create_data(),
        )

    # Send user created commands
    for command in commands:
        client.publish(DETECTOR_TOPIC, command.command)

        if command.category == CURRRENCY_COMMAND_ID:
            sett = command.user.settings
            sett.currency = timedelta(minutes=int(command.extra["currency"]))
            sett.last_send = timezone.now() - timedelta(seconds=5)
            sett.save()

    client.disconnect()

    SendSettings.objects.filter(user__in=clients).update(
        last_send=timezone.now() - timedelta(seconds=5)
    )
