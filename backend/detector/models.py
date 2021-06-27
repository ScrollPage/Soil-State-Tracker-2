# type: ignore
from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

import random

from client.models import Client
from group.models import Cluster
from backend.settings import CURRRENCY_COMMAND_ID
from detector.mqtt.pydantic_models import Message, Data, Numbers


class InnerDetectorCounter(models.Model):
    user = models.OneToOneField(
        Client,
        verbose_name="Пользователь",
        related_name="counter",
        on_delete=models.CASCADE,
    )
    count = models.PositiveIntegerField(default=0)

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

    COMMAND_CHOICES = ((str(CURRRENCY_COMMAND_ID), "NewCurrency"),)

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

        if self.extra:
            data = Data()
            numbers = Numbers()
            for key, value in self.extra.items():
                if key in Data.__fields__.keys():
                    setattr(data, key, value)
                else:
                    setattr(numbers, key, value)
        else:
            data = None
            numbers = None

        return Message(uk=self.user.user_key.code, c=self.category, d=data, n=numbers)


@receiver(post_save, sender=DetectorCommand)
def make_command(sender, instance=None, created=False, **kwargs):
    """Записывает команду"""
    from detector.mqtt.service import CommandCreator

    if created:
        command = CommandCreator(instance).create_data()
        instance.command = command
        instance.save()


@receiver(post_save, sender=Detector)
def make_command(sender, instance=None, created=False, **kwargs):
    """Записывает команду"""

    if created:
        counter = InnerDetectorCounter.objects.get(user=instance.user)
        counter.counter += 1
        counter.save()
