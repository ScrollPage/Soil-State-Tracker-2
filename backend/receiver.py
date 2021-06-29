# type: ignore
import paho.mqtt.client as mqtt
from loguru import logger
import asyncio
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

django.setup()

from backend.settings import MQTT_PORT, MQTT_HOST, SERVER_TOPIC
from mqtt.service import Receiver


def on_connect(client, userdata, flags, rc):
    logger.info(f"Connected with result code {rc}")
    client.subscribe(SERVER_TOPIC, qos=0)
    logger.info(f"Subscribed to a server topic")


def on_disconnect(client, userdata, rc):
    if rc != 0:
        logger.error("Unexpected MQTT disconnection. Will auto-reconnect")
        client.reconnect()


def on_message(client, userdata, msg):
    logger.info(f"New message: {msg.payload.decode('utf-8')}, topic: {msg.topic}")
    recv = Receiver(client, msg.payload.decode("utf-8"))
    recv.process()


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.on_disconnect = on_disconnect

client.connect(MQTT_HOST, MQTT_PORT, 3600)

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(client.loop_forever())
    asyncio.get_event_loop().run_forever()
