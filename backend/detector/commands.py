# type: ignore

from django.utils import timezone

from dataclasses import dataclass
from typing import Union
import json

from detector.models import (
    DetectorCommand,
    Detector,
    DetectorData,
    InnerDetectorCounter,
)
from backend.core import ReceivedAnswer
from backend.settings import (
    DATA_COMMAND_ID,
    JOIN_COMMAND_ID,
    CURRRENCY_COMMAND_ID,
    DEFAULT_DATA_LEN,
    DEFAULT_SEND_CURRENCY_MINUTES,
)


@dataclass
class DefaultCommandClass:

    instance: Union[DetectorCommand, ReceivedAnswer]

    DEFAULT_LEN = DEFAULT_DATA_LEN


# __create_data - используется для создания валидной команды для отправки
# __call_back - используется для создания валидного ответа на полученные данные


class CommandJoin(DefaultCommandClass):
    """Команда на присоединение датчика"""

    UID = JOIN_COMMAND_ID
    UID_LEN = 3

    @staticmethod
    def new_detector(user) -> str:
        detector = Detector.objects.create(user=user)
        return user.counter.counter

    def __create_data(self, *args, **kwargs) -> str:
        now = timezone.now()
        uid = new_detector(self.instance.user)
        data = f"{uid}:{DEFAULT_SEND_CURRENCY_MINUTES}".center(
            self.DEFAULT_LEN - self.UID_LEN - 1, "-"
        )


class CommandData(DefaultCommandClass):
    """Команда на отправку данных датчиком"""

    UID = DATA_COMMAND_ID

    @staticmethod
    def create_data(data):
        DetectorData.objects.create(**json.loads(data))

    def __create_data(self, *args, **kwargs) -> str:
        return "".center(self.DEFAULT_LEN, "-")

    def __call_back(self):
        create_data(self.instance.data)


class CommandCurrency(DefaultCommandClass):
    """Команда на изменения частоты включения датчика"""

    UID = CURRRENCY_COMMAND_ID

    def __create_data(self, *args, **kwargs) -> str:
        return str(self.instance.extra["currency"]).center(self.DEFAULT_LEN, "-")
