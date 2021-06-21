from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from model_utils.managers import QueryManager

from backend.settings import pusher_client
from client.models import Client


class Chat(models.Model):
    """Чатик"""

    user = models.OneToOneField(
        Client, verbose_name="Клиент", on_delete=models.CASCADE, related_name="chat"
    )
    admin = models.ForeignKey(
        Client,
        verbose_name="Администратор",
        null=True,
        on_delete=models.SET_NULL,
        related_name="chats",
    )

    objects = models.Manager()
    free = QueryManager(admin=None).order_by("-id")

    @property
    def last_message(self):
        return self.messages.last()

    class Meta:
        verbose_name = "Чат"
        verbose_name_plural = "Чаты"


class Message(models.Model):
    """Сообщение"""

    chat = models.ForeignKey(
        Chat, verbose_name="Чат", on_delete=models.CASCADE, related_name="messages"
    )
    user = models.ForeignKey(
        Client, verbose_name="Отправитель", null=True, on_delete=models.SET_NULL
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=5000)
    unread = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Сообщение"
        verbose_name_plural = "Сообщения"


@receiver(post_save, sender=Message)
def send_new_message_notification(sender, instance=None, created=False, **kwargs):
    if created:
        inc_counter = not bool(instance.chat.messages.filter(unread=False).count() - 1)

        user = (
            instance.chat.user
            if instance.user == instance.chat.admin
            else instance.chat.admin
        )

        if user:
            pusher_client.trigger(
                f"newmessage{user.id}",
                "new-message",
                {"increase_counter": inc_counter, "chat": instance.chat.id},
            )
