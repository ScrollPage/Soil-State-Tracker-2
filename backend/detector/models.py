from django.db import models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver

from datetime import timedelta, time

from client.models import Client
from group.models import Cluster

class Detector(models.Model):
    x = models.DecimalField(
        'Координата x', max_digits=9, 
        decimal_places=6, null=True
    )
    y = models.DecimalField(
        'Координата y', max_digits=9, 
        decimal_places=6, null=True
    )
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

class DetectorCommand(models.Model):
    '''Команда датчикам'''
    COMMAND_CHOICES = (
        ('1', 'Id'),
        ('2', 'Data'),
    )

    user = models.ForeignKey(
        Client, verbose_name='Пользователь', 
        related_name='commands', on_delete=models.CASCADE
    )
    interval = models.TimeField('Интервал для 2-й команды', null=True)
    category = models.CharField('Тип команды', max_length=10, choices=COMMAND_CHOICES)
    timestamp = models.DateTimeField('Время создания команды', auto_now_add=True)
    command = models.CharField('Команда для отправки', max_length=60, null=True)

    def __str__(self):
        return 'command category {category} by user {user}' \
            .format(category=self.category, user=self.user)

    class Meta:
        verbose_name = 'Команда датчикам'
        verbose_name_plural = 'Команды датчикам'


@receiver(post_save, sender=DetectorCommand)
def make_command(sender, instance=None, created=False, **kwargs):
    '''Записывает команду'''
    if created:
        if int(instance.category) == 1:
            now = timezone.now()
            detector = Detector.objects.create()
            uid = '{}'.format(detector.id).rjust(3, '-')
            lasted = 60 - now.second
            timestamp = str(now.timestamp()).rjust(10, '-')
            data = '{uid}{lasted}{timestamp}' \
                .format(uid=uid, lasted=lasted, timestamp=timestamp)

        elif int(instance.category) == 2:
            data =  ''.rjust(16, '-')

        user = '{id}{email}'.format(
            id=instance.user.id, email=instance.user.email
        ) \
            .rjust(16, '-')
        cid = instance.category.rjust(4, '-')

        instance.command = '{user}{cid}{data}' \
            .format(user=user, cid=cid, data=data)
        
        instance.save()
