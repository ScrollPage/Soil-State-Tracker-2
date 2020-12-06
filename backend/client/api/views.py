from rest_framework.viewsets import GenericViewSet
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .serializers import TokenSerialzizer
from client.models import Client

class ClientActivity(GenericViewSet):
    '''Активация аккаунта'''

    serializer_class = TokenSerialzizer
    permission_classes = [permissions.AllowAny]

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