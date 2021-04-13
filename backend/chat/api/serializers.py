from rest_framework import serializers

from ..models import Chat, Message

from client.api.serializers import ClientSerializer

class MessageSerializer(serializers.ModelSerializer):
    '''Сериализация сообщения'''
    user = ClientSerializer()

    class Meta:
        model = Message
        exclude = ['chat']

class ChatSerializer(serializers.ModelSerializer):
    '''Сериализация чата'''
    last_message = MessageSerializer(read_only=True)
    user = ClientSerializer(read_only=True)
    admin = ClientSerializer(read_only=True)

    class Meta:
        model = Chat
        fields = '__all__'