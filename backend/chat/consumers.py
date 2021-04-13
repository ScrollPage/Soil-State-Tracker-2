from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

import json
from asgiref.sync import async_to_sync

from chat.models import Chat
from .service import (
    UpgradedWebsocketConsumer, instances_to_json, 
    message_to_json, chat_to_json, PermissionConsumerMixin
)
from .models import Chat, Message
from client.models import Client
from .permissions import UserInChat, IsAdmin, NoAdmin


class ChatConsumer(UpgradedWebsocketConsumer):
    '''Консумер для чатов'''
    permissions = [UserInChat]

    # Connect/Disconnect
    def connect(self):
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
            'messages': instances_to_json(messages, message_to_json)
        }
        self.send_message(content)

    # Main part
    def prepare_data(self, data):
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


class AdminPanelConsumer(
    UpgradedWebsocketConsumer, PermissionConsumerMixin
):
    '''Консумер админ-панели'''
    permissions = [IsAdmin]
    permissions_by_command = {
        'become_admin': [IsAdmin, NoAdmin]
    }

    # Connect/Disconnect
    def connect(self):
        self.room_group_name = 'admin_panel'
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

    # Event handling
    def free_chats(self, data):
        chats = Chat.free.all()
        content = {
            'command': 'free_chats',
            'chats': instances_to_json(chats, chat_to_json)
        }
        self.send_chats(content)

    def become_admin(self, data):
        chat = data['chat']
        chat.admin = data['user']
        chat.save()
        chats = Chat.free.all()
        content = {
            'command': 'free_chats',
            'chats': instances_to_json(chats, chat_to_json)
        }
        self.send_admin_panel_update(content)

    # Main part
    def prepare_data(self, data):
        if data['command'] == 'become_admin':
            data['chat'] = get_object_or_404(Chat, id=self.data['user'])
        data['user'] = get_object_or_404(get_user_model(), id=data['user'])

    commands = {
        'free_chats': free_chats,
        'become_admin': become_admin    
    }

    def receive(self, text_data):
        data = self.validate(text_data)
        self.check_permissions(data)
        self.commands[data.pop('command')](self, data)

    # Utils
    def send_admin_panel_update(self, chats):    
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'panel_update',
                'message': chats
            }
        )

    def panel_update(self, event):
        chats = event['chats']
        self.send(text_data=json.dumps(chats))

    def send_chats(self, message):
        self.send(text_data=json.dumps(message))