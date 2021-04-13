from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import TokenSerialzizer
from .service import PSFViewSet
from client.models import Client

from chat.api.serializers import ChatSerializer


class ClientViewSet(PSFViewSet):
    '''
    Активация аккаунта
    Чаты пользователя/администратора
    '''

    serializer_class = TokenSerialzizer
    serializer_class_by_action = {
        'chat': ChatSerializer
    }
    permission_classes = [permissions.AllowAny]
    permission_classes_by_action = {
        'chat': [permissions.IsAuthenticated]
    }
    queryset = Client.objects.all()

    @action(detail=False, methods=['get'])
    def chat(self, request, *args, **kwargs):
        user = request.user
        if user.is_staff:
            return self.fast_response('chats', filtering='all', instance=user)
        else:
            return self.fast_response('chat', instance=user)

    @action(detail=False, methods=['post'])
    def activate(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        key = serializer.data.get('token')
        token = get_object_or_404(Token, key=key)
        token.delete()
        
        user = token.user
        user.is_active = True
        user.save()

        return Response(status=status.HTTP_200_OK)