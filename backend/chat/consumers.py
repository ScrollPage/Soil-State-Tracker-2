from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

import json
from asgiref.sync import async_to_sync

from chat.models import Chat
from .service import UpgradedWebsocketConsumer
from .models import Chat, Message
from client.models import Client
from .permissions import UserInChat, IsAdmin

class ChatConsumer(UpgradedWebsocketConsumer):
    '''Консумер для чатов'''
    permissions = [UserInChat()]

    # Connect/Disconnect
    def connect(self):
        print(self.scope['user'])
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
    
    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Message handling
    def new_message(self, data):
        message = Message.objects.create(
            chat=data['chat'], content=data['content'], 
            user=data['user']
        )
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_chat_message(content)

    def fetch_messages(self, data):
        messages = data['chat'].messages.all().order_by('-timestamp')
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    # Main part
    def prepare_data(data):
        data['chat'] = get_object_or_404(Chat, id=self.room_name)
        data['user'] = get_object_or_404(get_user_model(), id=data['user'])
        return data

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message,
    }

    def receive(self, text_data):
        data = self.validate(text_data)
        self.check_permissions(data)
        self.commands[data.pop('command')](self, data)

    # Utils
    def messages_to_json(self, messages):
        return [self.message_to_json(message) for message in messages]

    def message_to_json(self, message):
        return {
            'id': message.id,
            'user': {
                'id': message.user.id,
                'full_name': message.user.get_full_name(),
            },
            'content': message.content,
            'timestamp': str(message.timestamp),
        }

    def send_chat_message(self, message):    
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, message):
        self.send(text_data=json.dumps(message))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))


# class AdminPanelConsumer(UpgradedWebsocketConsumer):
#     '''Консумер админ-панели'''
#     permissions = [IsAdmin()]
#     permissions_by_command = {

#     }

#     def connect(self):
#         self.room_group_name = 'admin_panel'
#         async_to_sync(self.channel_layer.group_add)(
#             self.room_group_name,
#             self.channel_name
#         )

#         self.accept()
    
#     def disconnect(self, close_code):
#         async_to_sync(self.channel_layer.group_discard)(
#             self.room_group_name,
#             self.channel_name
#         )

#     def prepare_data(data):
#         pass

#     commads = {}

#     def receive(self, text_data):
#         pass