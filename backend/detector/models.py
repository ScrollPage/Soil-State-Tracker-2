from django.db import models

from client.models import Client
from group.models import Cluster

class Detector(models.Model):
    x = models.DecimalField('Координата x', max_digits=9, decimal_places=6)
    y = models.DecimalField('Координата y', max_digits=9, decimal_places=6)
    cluster = models.ForeignKey(
        Cluster, 
        verbose_name='Группа',
        null=True,
        on_delete=models.SET_NULL,
        related_name='cluster_detectors'
    )
    user = models.ForeignKey(
        Client, 
        verbose_name='Подчиненный-владелец', 
        null=True,
        on_delete=models.SET_NULL, 
        related_name='detectors'
    )

    def __str__(self):
        return f'датчик {self.id}, принадлежащий {self.user}'

    class Meta:
        verbose_name = 'Датчик'
        verbose_name_plural = 'Датчики'

class DetectorData(models.Model):
    detector = models.ForeignKey(
        Detector, 
        verbose_name='Привязанный датчик',
        on_delete=models.DO_NOTHING, 
        related_name='data'
    )
    first_temp = models.DecimalField('Первая температура', max_digits=4, decimal_places=2)
    second_temp = models.DecimalField('Вторая температура', max_digits=4, decimal_places=2)
    third_temp = models.DecimalField('Третья температура', max_digits=4, decimal_places=2)
    humidity = models.DecimalField('Влажность', max_digits=4, decimal_places=2)
    lightning = models.DecimalField('Освещенность', max_digits=4, decimal_places=2)
    pH = models.DecimalField('Кислотность', max_digits=4, decimal_places=2)
    timestamp = models.DateTimeField('Дата сбора данных', auto_now_add=True)

    def __str__(self):
        return f'Отчет в {self.timestamp} от {self.detector}'

    class Meta:
        verbose_name = 'Данные датчика'
        verbose_name_plural = 'Данные датчиков'