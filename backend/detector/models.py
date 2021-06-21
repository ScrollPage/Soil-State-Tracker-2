# type: ignore
from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

from client.models import Client
from group.models import Cluster


class Detector(models.Model):
    x = models.DecimalField("Координата x", max_digits=9, decimal_places=6, null=True)
    y = models.DecimalField("Координата y", max_digits=9, decimal_places=6, null=True)
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

    COMMAND_CHOICES = (("1", "Id"), ("2", "Time"), ("3", "NewCurrency"))

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

    def __str__(self):
        return "command category {category} by user {user}".format(
            category=self.category, user=self.user
        )

    class Meta:
        verbose_name = "Команда датчикам"
        verbose_name_plural = "Команды датчикам"


@receiver(post_save, sender=DetectorCommand)
def make_command(sender, instance=None, created=False, **kwargs):
    """Записывает команду"""
    from .service import CommandCreator

    if created:
        creator = CommandCreator(instance)
        command = creator.create_data()
        instance.command = command
        instance.save()


@receiver(post_save, sender=DetectorCommand)
def update_send_settings(sender, instance=None, created=False, **kwargs):
    """Обновление настроек"""

    if created:
        pass
