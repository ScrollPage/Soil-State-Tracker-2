from rest_framework.exceptions import AuthenticationFailed, PermissionDenied, ParseError
from rest_framework import HTTP_HEADER_ENCODING
from django.shortcuts import get_object_or_404
from backend.settings import SIMPLE_JWT as jwt_settings

from channels.generic.websocket import WebsocketConsumer

import codecs
import json
from abc import abstractmethod, ABC

AUTH_HEADER_TYPES = jwt_settings['AUTH_HEADER_TYPES']

if not isinstance(AUTH_HEADER_TYPES, (list, tuple)):
    AUTH_HEADER_TYPES = (AUTH_HEADER_TYPES,)

AUTH_HEADER_TYPE_BYTES = set(
    h.encode(HTTP_HEADER_ENCODING)
    for h in AUTH_HEADER_TYPES
)

class UpgradedWebsocketConsumer(WebsocketConsumer, ABC):
    '''Новые методы - prepare_data, check_permissions'''

    commands = {}
    permissions = []

    def check_permissions(self, data):
        if not all([
            permission()(data) for permission in self.permissions
        ]):
            self.disconnect(403)

    @abstractmethod
    def prepare_data(self, data):
        pass

    def get_raw_token(self, header):
        parts = header.split()

        if len(parts) == 0:
            return None

        if parts[0] not in AUTH_HEADER_TYPE_BYTES:
            return None

        if len(parts) != 2:
            return None

        return parts[1]

    def get_valdated_token(self, raw_token):
        for AuthToken in jwt_settings['AUTH_TOKEN_CLASSES']:
            try:
                return AuthToken(raw_token)
            except TokenError as e:
                self.disconnect(400)

    def obtain_user(self, validated_token):
        try:
            user_id = validated_token[jwt_settings['USER_ID_CLAIM']]
        except KeyError:
            self.disconnect(400)

        try:
            user = self.user_model.objects.get(**{jwt_settings['USER_ID_FIELD']: user_id})
        except self.user_model.DoesNotExist:
            self.disconnect(404)

        if not user.is_active:
            self.disconnect(401)

        return user

    def get_user(self, data):
        '''Получает пользователя по токену'''
        raw_token = self.get_raw_token(header)
        if raw_token is None:
            self.disconnect(400)

        validated_token = self.get_validated_token(raw_token)

        return self.get_user(validated_token)

    def validate(self, text_data):
        data = json.loads(text_data)

        try:
            command = data['command']
        except KeyError:
            self.disconnect(400)

        try:
            self.commands[command]
        except KeyError:
            self.disconnect(400)

        data = self.prepare_data(data)

        return data

class PermissionConsumerMixin:
    def check_permissions(self, data):
        try:
            self.permissions = self.permissions_by_command[data['command']]
        except KeyError:
            pass
        finally:
            if not all([
                permission()(data) for permission in self.permissions
            ]): 
                pass

def message_to_json(message):
    return {
        'id': message.id,
        'user': {
            'id': message.user.id,
            'full_name': message.user.get_full_name(),
        },
        'content': message.content,
        'timestamp': str(message.timestamp),
        'unread': message.unread
    }

def chat_to_json(chat):
    if chat.admin:
        admin = {
            'id': chat.admin.id,
            'full_name': chat.admin.get_full_name()
        }
    else:
        admin = None
        
    return {
        'id': chat.id,
        'last_message': self.message_to_json(chat.last_message),
        'user': {
            'id': chat.user.id,
            'full_name': chat.user.get_full_name()
        },
        'admin': admin
    }

def instances_to_json(instances, json_func):
    return [json_func(inst) for inst in instances]
