# type: ignore
from django.db.models import F, DateTimeField, ExpressionWrapper, Prefetch, Count
from django.utils import timezone

import paho.mqtt.client as mqtt

from datetime import time, timedelta

from backend.settings import (
    MQTT_HOST,
    MQTT_PORT,
    DETECTOR_TOPIC,
    DATA_COMMAND_ID,
    FREQUENCY_COMMAND_ID,
    DEFAULT_SEND_FREQUENCY_MINUTES,
)
from detector.models import DetectorCommand, Detector, ReceiveConfirmation
from client.models import Client, SendSettings
from backend.celery import app as celery_app
from mqtt.service import CommandCreator


@celery_app.task
def release():

    clients = (
        Client.objects.filter(is_superuser=False, is_staff=False, is_active=True)
        .select_related("settings")
        .prefetch_related(
            Prefetch("detectors", queryset=Detector.objects.all().only("id"))
        )
        .annotate(
            required_time=ExpressionWrapper(
                F("settings__last_send") + F("settings__sleeping_time"),
                output_field=DateTimeField(),
            ),
        )
        .filter(required_time__lte=timezone.now(), detectors__gt=0)
    )

    commands = (
        DetectorCommand.objects.select_related("user__settings")
        .annotate(
            required_time=ExpressionWrapper(
                F("user__settings__last_send") + F("user__settings__sleeping_time"),
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

        if command.category == FREQUENCY_COMMAND_ID:
            sett = command.user.settings
            sett.sleeping_time = timedelta(minutes=int(command.extra["sleeping_time"]))
            sett.last_send = timezone.now() - timedelta(seconds=5)
            sett.save()

    client.disconnect()

    commands.update(wait_resp=True)
    SendSettings.objects.filter(user__in=clients).update(last_send=timezone.now())


@celery_app.task
def duplicate_send():
    confirms = (
        ReceiveConfirmation.objects.select_related("user")
        .select_related("user__settings")
        .select_related("command")
        .prefetch_related(
            Prefetch("detectors", queryset=Detector.objects.all().only("token"))
        )
        .annotate(
            required_time=ExpressionWrapper(
                F("user__settings__last_send") + 2 * F("user__settings__sleeping_time"),
                output_field=DateTimeField(),
            ),
        )
        .filter(required_time__lte=timezone.now())
    )

    client = mqtt.Client()
    client.connect(MQTT_HOST, MQTT_PORT, 3600)

    for confirm in confirms_to_send:
        for command in confirm.generate_commands():
            client.publish(DETECTOR_TOPIC, command)

    client.disconnect()
