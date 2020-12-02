from django.db import models

from client.models import Client

class Cluster(models.Model):
    '''Группа датчиков'''
    name = models.CharField('Название', max_length=30)
    user = models.ForeignKey(Client, verbose_name='Владелец кластера', on_delete=models.CASCADE)

    def __str__(self):
        return f'Группа пользователя {self.user}'

    class Meta:
        verbose_name = 'Кластер'
        verbose_name_plural = 'Кластеры'