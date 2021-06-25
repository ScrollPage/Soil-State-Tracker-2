from dataclasses import dataclass

import paho.mqtt.client as mqtt
from loguru import logger

from detector import commands
from backend.settings import (
    MQTT_HOST, 
    MQTT_PORT, 
    DETECTOR_TOPIC, 
    DEFAULT_MESSAGE_LEN, 
    STRIP_DELIMETER
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
client.connect(MQTT_HOST, MQTT_PORT, 3600)


class Sender:
    """Отправляет данные брокеру"""

    mqtt_client = client

    @classmethod
    def publish(cls, msg):
        cls.mqtt_client.publish(msg)


class Receiver:
    """Получает данные от брокера"""

    DATA_TUPLE = ReceivedAnswer
    sender = Sender

    COMMAND_DICT = {
        getattr(commands, cls).UID: getattr(commands, cls)
        for cls in filter(lambda x: x.startswith("Command"), dir(commands))
    }

    def is_valid(self):

        if len(self.msg.split("/")) == DEFAULT_MESSAGE_LEN:
            return True

        raise ValueError("wrong message len.")

    def __init__(self, msg):
        self.msg = msg
        self.data = self.__parse(self.msg)


    def __parse(self, validated_msg):
        return self.DATA_TUPLE(*list(
            map(
                labmda x: x.strip(STRIP_DELIMETER), 
                validated_msg.split'/'
            )    
        ))

    def process(self, *args, **kwargs):
        data = self.ANSWER_DICT[self.data.cid](self.data).__call_back(
            *args, **kwargs
        )

        if data:
            self.sender.publish(data)
