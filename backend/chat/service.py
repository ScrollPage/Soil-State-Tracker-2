from rest_framework.exceptions import AuthenticationFailed, PermissionDenied, ParseError
from django.contrib.auth import get_user_model

from channels.generic.websocket import WebsocketConsumer

import codecs
import json

from chat.models import Chat

class UpgradedWebsocketConsumer(WebsocketConsumer):
    '''Новые методы - prepare_data, check_permissions'''

    def __init__(self):
        self.user_model = get_user_model()
        self.chat_model = Chat
        super().__init__()

    commands = {}
    permissions = []

    def check_permissions(data):
        if not all([
            permission(data) for permission in self.permissions
        ]):
            raise PermissionDenied()

    def prepare_data(self, text_data):
        data = json.loads(text_data)

        try:
            self.commands[data['command']]
        except KeyError:
            raise ParseError(f"""
                No command {data['command']} in self.commands: {self.commands}
            """)

        data['chat'] = get_object_or_404(self.chat_model, id=self.room_name)
        data['user'] = get_object_or_404(self.user_model, id=data['user'])

        return data