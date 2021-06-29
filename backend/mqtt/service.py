# type: ignore
import paho.mqtt.client as mqtt
from loguru import logger

from typing import List

from . import commands
from detector.models import DetectorCommand
from .pydantic_models import Message
from backend.settings import DETECTOR_TOPIC


class Receiver:
    """Получает данные от брокера"""

    COMMAND_DICT = {
        getattr(commands, cls).UID: getattr(commands, cls)
        for cls in filter(lambda x: x.startswith("Command"), dir(commands))
    }

    @staticmethod
    def parse(msg) -> Message:
        return Message.parse_raw(msg)

    def __init__(self, sender, msg):
        self.sender = sender
        self.data = self.parse(msg)

    def process(self):
        data = self.COMMAND_DICT[self.data.cid](self.data).call_back()

        if data:
            self.sender.publish(DETECTOR_TOPIC, data)


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
