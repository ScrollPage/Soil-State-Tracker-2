from rest_framework import permissions, status
from rest_framework.exceptions import ParseError
from rest_framework.decorators import action
from rest_framework.response import Response

from .service import PCreateDestroyViewSet
from .serializers import ChatSerializer
from ..models import Chat
from .permissions import AsUserInChat, NotStaff, IsStaff, NoAdmin

class ChatViewSet(PCreateDestroyViewSet):
    '''Создание, удаление чатов'''

    serializer_class = ChatSerializer
    permission_classes = [permissions.IsAuthenticated, NotStaff]
    permission_classes_by_action = {
        'destroy': [permissions.IsAuthenticated, AsUserInChat],
        'free': [permissions.IsAuthenticated, IsStaff],
        'admin': [permissions.IsAuthenticated, IsStaff, NoAdmin],
    }
    queryset = Chat.objects.all()
    model = Chat

    def perform_create(self, serializer):
        try:
            chat = self.model.objects.get(user=self.request.user)
        except self.model.DoesNotExist:
            serializer.save(user=self.request.user)
        else:
            raise ParseError({'error': 'Chat is already exists.', 'id': chat.id})

    @action(detail=False, methods=['get'])
    def free(self, request, *args, **kwargs):
        '''Чаты без админа'''
        return self.fast_response('free', filtering='all', detail=False)

    @action(detail=True, methods=['put'])
    def admin(self, request, *args, **kwargs):
        '''Стать админом в чате'''
        chat = self.get_object()
        chat.admin = request.user
        chat.save()
        return Response(status=status.HTTP_202_ACCEPTED)