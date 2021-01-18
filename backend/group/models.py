from django.db import models

from client.models import Client

class Cluster(models.Model):
    '''Группа датчиков'''
    name = models.CharField('Название', max_length=30)
    user = models.ForeignKey(
        Client, 
        verbose_name='Владелец кластера', 
        on_delete=models.CASCADE,
        related_name='clusters'
    )
    title = models.TextField(max_length=5000, default='')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Кластер'
        verbose_name_plural = 'Кластеры'