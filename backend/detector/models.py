# type: ignore
from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save, pre_save, m2m_changed
from django.dispatch import receiver

import random

from client.models import Client
from group.models import Cluster
from backend.settings import FREQUENCY_COMMAND_ID
from mqtt.pydantic_models import Message, Data


class InnerDetectorCounter(models.Model):
    user = models.OneToOneField(
        Client,
        verbose_name="Пользователь",
        related_name="counter",
        on_delete=models.CASCADE,
    )
    counter = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Счетчик датчиков"
        verbose_name_plural = "Счетчики датчиков"


class Detector(models.Model):
    x = models.DecimalField("Координата x", max_digits=9, decimal_places=6, null=True)
    y = models.DecimalField("Координата y", max_digits=9, decimal_places=6, null=True)
    token = models.CharField(
        "Токен, необходимый для физических датчиков",
        max_length=6,
        unique=True,
        default="",
    )
    sensor_id = models.PositiveIntegerField(
        "Айди датчика внутри пользователя", default=0
    )
    cluster = models.ForeignKey(
        Cluster,
        verbose_name="Группа",
        null=True,
        on_delete=models.SET_NULL,
        related_name="cluster_detectors",
    )
    user = models.ForeignKey(
        Client,
        verbose_name="Подчиненный-владелец",
        null=True,
        on_delete=models.SET_NULL,
        related_name="detectors",
    )

    def __str__(self):
        return f"датчик {self.id}"

    class Meta:
        verbose_name = "Датчик"
        verbose_name_plural = "Датчики"


class DetectorCommand(models.Model):
    """Команда датчикам"""

    COMMAND_CHOICES = ((str(FREQUENCY_COMMAND_ID), "NewCurrency"),)

    REQUIRES_CONFIRM = [str(FREQUENCY_COMMAND_ID)]

    user = models.ForeignKey(
        Client,
        verbose_name="Пользователь",
        related_name="commands",
        on_delete=models.CASCADE,
    )
    category = models.CharField("Тип команды", max_length=10, choices=COMMAND_CHOICES)
    timestamp = models.DateTimeField("Время создания команды", auto_now_add=True)
    command = models.CharField("Команда для отправки", max_length=60, null=True)
    extra = models.JSONField("Дополнительно", null=True)
    wait_resp = models.BooleanField(default=False)

    def __str__(self):
        return "command category {category} by user {user}".format(
            category=self.category, user=self.user
        )

    class Meta:
        verbose_name = "Команда датчикам"
        verbose_name_plural = "Команды датчикам"

    def to_pydantic(self):

        data = None

        if self.extra:
            for key, value in self.extra.items():
                if key in Data.__fields__.keys():
                    data = data or Data()
                    setattr(data, key, value)

        return Message(
            uk=self.user.user_key.code,
            c=self.category,
            d=data,
        )


class ReceiveConfirmation(models.Model):
    """Подтверждение получения команды"""

    detectors = models.ManyToManyField(Detector, verbose_name="Датчики")
    command = models.OneToOneField(
        DetectorCommand,
        verbose_name="",
        on_delete=models.CASCADE,
        related_name="confirmation",
    )

    class Meta:
        verbose_name = "Подтверждение получения"
        verbose_name_plural = "Подтверждения получения"

    def generate_commands(self):
        pydantic_model = self.command.to_pydantic()

        for detector in self.detectors.all().only("token"):
            pydantic_model.data.token = detector.token
            yield pydantic_model.json(by_alias=True, exclude_none=True)


@receiver(post_save, sender=DetectorCommand)
def make_command(sender, instance=None, created=False, **kwargs):
    """Записывает команду, при необходимости создает подтверждение"""

    if created:
        from mqtt.service import CommandCreator

        command = CommandCreator(instance).create_data()
        instance.command = command
        instance.save()

        if instance.category in instance.REQUIRES_CONFIRM:
            ReceiveConfirmation.objects.filter(
                command__user=instance.user, command__category=instance.category
            ).delete()

            ReceiveConfirmation.objects.create(command=instance).detectors.set(
                instance.user.detectors.all()
            )


@receiver(post_save, sender=Detector)
def counter_increase(sender, instance=None, created=False, **kwargs):
    """Увеличить счетчик датчиков"""

    if created:
        counter = InnerDetectorCounter.objects.get(user=instance.user)
        counter.counter += 1
        counter.save()
        instance.sensor_id = counter.counter
        instance.save()
