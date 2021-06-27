# type: ignore
from dataclasses import dataclass

import paho.mqtt.client as mqtt
from loguru import logger

from typing import List

from detector.mqtt import commands
from client.models import Client
from detector.models import DetectorCommand
from detector.mqtt.pydantic_models import Message
from backend.settings import (
    MQTT_HOST,
    MQTT_PORT,
)


def on_connect(client, userdata, flags, rc):
    logger.info(f"Connected with result code {rc}")


def on_publish(client, userdata, mid):
    logger.info(f"Published {mid}")


def on_disconnect(client, userdata, rc):
    if rc != 0:
        logger.error("Unexpected MQTT disconnection. Will auto-reconnect")
        client.reconnect()


client = mqtt.Client()
client.on_publish = on_publish
client.on_connect = on_connect
client.on_disconnect = on_disconnect

if __name__ == "__main__":
    client.connect(MQTT_HOST, MQTT_PORT, 3600)


class Sender:
    """Отправляет данные брокеру"""

    mqtt_client = client

    @classmethod
    def publish(cls, msg):
        cls.mqtt_client.publish(msg)


class Receiver:
    """Получает данные от брокера"""

    sender = Sender

    COMMAND_DICT = {
        getattr(commands, cls).UID: getattr(commands, cls)
        for cls in filter(lambda x: x.startswith("Command"), dir(commands))
    }

    @staticmethod
    def parse(msg) -> Message:
        return Message.parse_raw(msg)

    def __init__(self, msg):
        self.data = self.parse(msg)

    def process(self):
        data = self.COMMAND_DICT[self.data.cid](self.data).call_back()

        if data:
            self.sender.publish(data)


class CommandCreator:
    """Используется для создания валидного json-a команд"""

    COMMAND_DICT = {
        getattr(commands, cls).UID: getattr(commands, cls)
        for cls in filter(lambda x: x.startswith("Command"), dir(commands))
    }

    @staticmethod
    def parse(instance: DetectorCommand) -> Message:
        return instance.to_pydantic()

    def __init__(self, instance: DetectorCommand):
        self.data = self.parse(instance)

    def create_data(self) -> str:
        data = self.COMMAND_DICT[self.data.cid](self.data).create_data()

        return data
