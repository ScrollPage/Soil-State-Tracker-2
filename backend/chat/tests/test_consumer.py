from django.test import TestCase

from channels.testing import WebsocketCommunicator

from ..consumers import ChatConsumer

class TestConsumer(TestCase):
    async def test_my_consumer(self):
        communicator = WebsocketCommunicator(ChatConsumer, "GET", "/ws/chat/")
        response = await communicator.get_response()
        self.assertEqual(response["status"], 404)