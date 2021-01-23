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
        return f'датчик {self.id}'

    class Meta:
        verbose_name = 'Датчик'
        verbose_name_plural = 'Датчики'