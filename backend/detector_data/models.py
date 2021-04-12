from django.db import models
from django.contrib.postgres.indexes import BrinIndex

from random import uniform
from datetime import datetime, timedelta
from timescale.db.models.fields import TimescaleDateTimeField
from timescale.db.models.managers import TimescaleManager

from detector.models import Detector

class DetectorData(models.Model):
    detector = models.ForeignKey(
        Detector, 
        verbose_name='Привязанный датчик',
        on_delete=models.DO_NOTHING, 
        related_name='data'
    )
    first_temp = models.DecimalField(
        'Температура почвы', 
        max_digits=4, decimal_places=2
    )
    second_temp = models.DecimalField(
        'Температура воздуха', 
        max_digits=4, decimal_places=2
    )
    third_temp = models.DecimalField(
        'Температура устройства', 
        max_digits=4, decimal_places=2
    )
    humidity = models.DecimalField(
        'Влажность', max_digits=4, 
        decimal_places=2
    )
    lightning = models.DecimalField(
        'Освещенность', max_digits=4, 
        decimal_places=2
    )
    pH = models.DecimalField(
        'Кислотность', max_digits=4, 
        decimal_places=2
    )
    timestamp = TimescaleDateTimeField(
        'Время сбор данных', interval='1 day', 
        auto_now_add=True
    )

    objects = models.Manager()
    timescale = TimescaleManager()

    def __str__(self):
        return f'Отчет в {self.timestamp} от {self.detector}'

    class Meta:
        verbose_name = 'Данные датчика'
        verbose_name_plural = 'Данные датчиков'
        indexes = [BrinIndex(fields=['timestamp'])]

    @classmethod
    def create_random(cls, detector, days=None):
        data = cls.objects.create(
            detector=detector,
            first_temp=round(uniform(0, 20), 2),
            second_temp=round(uniform(0, 20), 2),
            third_temp=round(uniform(0, 20), 2),
            humidity=round(uniform(0, 20), 2),
            lightning=round(uniform(0, 20), 2),
            pH=round(uniform(0, 20), 2),
        )

        if days:
            data.timestamp = datetime.now()+timedelta(days=days)
            data.save()

        return data