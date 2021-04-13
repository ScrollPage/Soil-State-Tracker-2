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
            permission(data) for permission in self.permissions
        ]):
            raise PermissionDenied()

    @abstractmethod
    def prepare_data(self, data):
        pass

    def validate(self, text_data):
        data = json.loads(text_data)

        try:
            command = data['command']
        except KeyError:
            raise ParseError("No command given")
        else:
            try:
                self.commands[command]
            except KeyError:
                raise ParseError(f"""
                    No command {data['command']} in self.commands: {self.commands}
                """)

        data = self.prepare_data(data)

        return data

# class PermissionConsumerMixin:
#     def check_permissions(self, data):
#         try:
#             self.permissions = self.permissions_by_command[data['command']]
#         except KeyError:
#             pass
#         finally:
#             if not all([
#                 permission(data) for permission in self.permissions
#             ]): 
#                 pass
