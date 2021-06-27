# type: ignore

from dataclasses import dataclass
from typing import Union
import json
import random

from detector.mqtt.pydantic_models import Message, Data, Numbers
from client.models import Client
from detector.models import DetectorCommand, Detector
from detector_data.models import DetectorData
from backend.settings import (
    DATA_COMMAND_ID,
    JOIN_COMMAND_ID,
    CURRRENCY_COMMAND_ID,
    DEFAULT_DATA_LEN,
    DEFAULT_SEND_CURRENCY_MINUTES,
    LOWER_BORDER_NUM,
    HIGHER_BORDER_NUM,
)


class DefaultCommandClass:

    DEFAULT_LEN = DEFAULT_DATA_LEN

    def __init__(self, message: Message):
        self.message = message
        self.user = self.get_user()

    def get_user(self):
        self.user = Client.objects.get(user_key__code=self.message.user_key)


# __create_data - используется для создания валидной команды для отправки
# __call_back - используется для создания валидного ответа на полученные данные


class CommandJoin(DefaultCommandClass):
    """Команда на присоединение датчика"""

    UID = JOIN_COMMAND_ID

    def create_detector(self) -> int:
        detector = Detector.objects.create(user=self.user)
        return self.user.counter.counter

    def call_back(self, *args, **kwargs) -> str:
        uid = self.create_detector()

        data = Data(inner_id=uid, currency=DEFAULT_SEND_CURRENCY_MINUTES)

        ack_num = random.randrange(LOWER_BORDER_NUM, HIGHER_BORDER_NUM)
        numbers = Numbers(sync_num=self.message.numbers.syn + 1, ack_num=ack_num)

        extra_dict = data.json()
        extra_dict.update(numbers.json())

        DetectorCommand.objects.create(
            user=self.user,
            cid=self.message.cid,
            wait_resp=True,
            extra=extra_dict,
        )

        message = Message(
            uk=self.message.user_key, c=self.message.cid, d=data, n=numbers
        )

        return message.json(by_alias=True, exclude_none=True)

    def create_data(self) -> None:
        return self.message.json(by_alias=True, exclude_none=True)


class CommandData(DefaultCommandClass):
    """Команда на отправку данных датчиком"""

    UID = DATA_COMMAND_ID

    def create_data(self, *args, **kwargs) -> str:
        return self.message.json(by_alias=True, exclude_none=True)

    def create_data_in_db(self) -> None:
        data = self.message.data.json(by_alias=True, exclude_none=True)
        token = data.pop("token")
        data["detector"] = Detector.objects.get(token=token)
        DetectorData.objects.create(**data)

    def call_back(self) -> None:
        self.create_data_in_db()


class CommandCurrency(DefaultCommandClass):
    """Команда на изменения частоты включения датчика"""

    UID = CURRRENCY_COMMAND_ID

    def create_data(self, *args, **kwargs) -> str:
        return str(self.message.extra["currency"]).center(self.DEFAULT_LEN, "-")

    def call_back(self) -> None:
        pass
