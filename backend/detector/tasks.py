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
    DEFAULT_SEND_DELAY_SECONDS,
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
            sett.last_send = timezone.now() - timedelta(seconds=DEFAULT_SEND_DELAY_SECONDS)
            command.wait_resp = True
            command.save()
            sett.save()

    client.disconnect()

    SendSettings.objects.filter(user__in=clients).update(
        last_send=timezone.now() - timedelta(seconds=DEFAULT_SEND_DELAY_SECONDS)
    )


@celery_app.task
def duplicate_send():
    confirms = (
        ReceiveConfirmation.objects.select_related("command")
        .select_related("command__user__settings")
        .prefetch_related(
            Prefetch("detectors", queryset=Detector.objects.all().only("token"))
        )
        .filter(command__wait_resp=True)
    )

    client = mqtt.Client()
    client.connect(MQTT_HOST, MQTT_PORT, 3600)

    for confirm in confirms:
        for command in confirm.generate_commands():
            client.publish(DETECTOR_TOPIC, command)

    client.disconnect()
