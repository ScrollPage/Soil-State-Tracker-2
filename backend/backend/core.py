from rest_framework.test import APIClient
from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework import status
from rest_framework.response import Response
from django.urls import reverse
from django.utils import timezone

import datetime as dt

from .bot import bot

def exception_handler(exc, context):
    '''Отправляет все исключения в телеграм'''
    # msg = f'An exception occured: {str(exc)}\n'
    # msg += traceback.format_exc() + '\n'
    # request = context['request']
    # if request.user:
    #     msg += f"User's email: {request.user.email}\n User's full name: {request.user.get_full_name()}\n"
    # else:
    #     msg += f'User is none\n'
    # d = {key: value for key, value in request.data.items()}
    # msg += f"Request's data: {d}\n"
    # bot.send_message(text=msg, chat_id=local.EXCEPTION_BOT_CHAT_ID)
    return drf_exception_handler(exc, context)

def get_response(
    url, method, user=None, data=None, 
    kwargs=None, format=None, query_params=None
):
    client = APIClient()

    if user:
        client.force_authenticate(user)

    url = reverse(url, kwargs=kwargs)

    if query_params:
        # for k, v in query_params.items():
        url += '?'
        url += ''.join(f'{k}={v}&' for k, v in query_params.items())
        print(url)

    method_dict = {
        'post': client.post,
        'get': client.get,
        'patch': client.patch,
        'delete': client.delete,
        'put': client.put
    }
    return method_dict[method](url, data, format=format)

class PermissionMixin:
    '''Mixin permission для action'''
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]] 
        except KeyError:
            return [permission() for permission in self.permission_classes]

class SerializerMixin:
    '''Класс сериализатора в зависимости от action'''
    def get_serializer_class(self):
        try:
            return self.serializer_class_by_action[self.action]
        except KeyError:
            return self.serializer_class

class PermissionSerializerMixin(PermissionMixin, SerializerMixin):
    '''Доп классы'''
    pass

class QueryDate:
    '''Позволяет получать 2 query параметра: begin_date, currency'''

    def get_query_params_date(self):
        begin_date = self.request.query_params.get('begin_date', None)
        currency = self.request.query_params.get('currency', '1')
        if begin_date is None:
            begin_date = timezone.now()
        else:
            begin_date = dt.datetime.strptime(begin_date, '%Y-%m-%d')
        currency = int(currency)
        return begin_date, currency

class FastResponseMixin:
    '''Функция быстрого ответа'''

    def fast_response(
        self, field, status=status.HTTP_200_OK, detail=True,
        many=True, filtering=None, instance=None
    ):
        if detail:
            if instance is None:
                instance = self.get_object()
            instances = getattr(instance, field)
        else:
            instances = getattr(self.model, field)


        if filtering:
            instances = getattr(instances, filtering)()

        serializer = self.get_serializer(instances, many=many)
        return Response(serializer.data, status=status)