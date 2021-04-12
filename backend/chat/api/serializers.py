from rest_framework import serializers

from ..models import Chat, Message

from client.api.serializers import ClientSerialzier

class MessageSerializer(serializers.ModelSerializer):
    '''Сериализация сообщения'''
    user = ClientSerialzier()

    class Meta:
        model = Message
        exclude = ['chat']

class ChatSerializer(serializers.ModelSerializer):
    '''Сериализация чата'''
    last_message = MessageSerializer(read_only=True)
    user = ClientSerialzier(read_only=True)
    admin = ClientSerialzier(read_only=True)

    class Meta:
        model = Chat
        fields = '__all__'