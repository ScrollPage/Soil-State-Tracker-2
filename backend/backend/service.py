from rest_framework.test import APIClient
from rest_framework.views import exception_handler as drf_exception_handler
from django.urls import reverse

from .bot import bot

def exception_handler(exc, context):
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

def get_response(url, method, user=None, data=None, kwargs=None, format=None):
    client = APIClient()

    if user:
        client.force_authenticate(user)

    url = reverse(url, kwargs=kwargs)

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
