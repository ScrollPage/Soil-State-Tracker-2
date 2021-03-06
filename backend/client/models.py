from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, 
    BaseUserManager, 
    PermissionsMixin
)

from random import randint

from .tasks import send_activation_email
from .service import create_code 

class ClientManager(BaseUserManager):
    '''Мэнэджер кастомного пользователя'''

    def create_user(self, email, first_name, last_name, password=None):
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name.capitalize(),
            last_name=last_name.capitalize()
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, first_name, last_name, password=None):
        user = self.create_user(email, first_name, last_name, password)

        user.is_manager = True
        user.is_superuser = True
        user.is_active = True
        user.is_staff = True

        user.save(using=self._db)
        return user

class Client(AbstractBaseUser, PermissionsMixin):
    '''Кастомная модель пользователя'''
    email = models.EmailField('Почта', max_length=60, unique=True)
    first_name = models.CharField('Имя', max_length=30, default='')
    last_name = models.CharField('Фамлиия', max_length=30, default='')
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    chat_id = models.IntegerField(null=True, default=None)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    objects = ClientManager()

    def __str__(self):
        return self.email
        
    class Meta:
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'

    def get_full_name(self):
        return self.last_name + ' ' + self.first_name

    def get_cluster_names(self):
        return [cluster.name for cluster in self.clusters.all()]

class AuthCode(models.Model):
    '''Код авторизации для телеграма'''
    code = models.CharField(null=False, unique=True, max_length=6)
    user = models.ForeignKey(Client, verbose_name='Пользователь', null=False, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Код авторизации'
        verbose_name_plural = 'Коды авторизации'

    @classmethod
    def create_unique_code(cls, user):
        code = create_code()
        while cls.objects.filter(code=code):
            code = create_code()
        cls.objects.create(code=code, user=user)

@receiver(post_save, sender=Client)
def send_conf_mail(sender, instance=None, created=False, **kwargs):
    '''Отправляет письмо с подтверждением'''
    if created and not instance.is_superuser:
        token = Token.objects.create(user=instance)
        send_activation_email.delay(instance.email, token.key)

@receiver(post_save, sender=Client)
def create_private_auth_code(sender, instance=None, created=False, **kwargs):
    '''Создает индивидульный код авторизации в телеграме'''
    if created and not instance.is_superuser:
        AuthCode.create_unique_code(instance)