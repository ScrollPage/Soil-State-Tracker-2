from rest_framework.exceptions import AuthenticationFailed, PermissionDenied, ParseError
from django.shortcuts import get_object_or_404

from channels.generic.websocket import WebsocketConsumer

import codecs
import json
from abc import abstractmethod, ABC

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

def instances_to_json(messages, json_func):
    return [json_func(inst) for inst in instances]
