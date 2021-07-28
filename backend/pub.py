# type: ignore
import paho.mqtt.client as mqtt
from loguru import logger
import asyncio
from backend.settings import MQTT_HOST, MQTT_PORT, SERVER_TOPIC, DETECTOR_TOPIC


def on_connect(client, userdata, flags, rc):
    logger.info(f"Connected with result code {rc}")


def on_publish(client, userdata, mid):
    logger.info(f"Published {mid}")


client = mqtt.Client()
client.on_publish = on_publish
client.on_connect = on_connect
client.connect(MQTT_HOST, MQTT_PORT, 3600)

while True:
    client.publish(SERVER_TOPIC, input())
