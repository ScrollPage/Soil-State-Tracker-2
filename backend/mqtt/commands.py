# type: ignore
from django.utils import timezone

from loguru import logger

from .pydantic_models import Message, Data
from client.models import Client
from detector.models import DetectorCommand, Detector, ReceiveConfirmation
from detector_data.models import DetectorData
from backend.settings import (
    DATA_COMMAND_ID,
    JOIN_COMMAND_ID,
    FREQUENCY_COMMAND_ID,
)


class DefaultCommandClass:
    def __init__(self, message: Message):
        self.message = message
        self.user = self.get_user()

    def get_user(self):
        return Client.objects.get(user_key__code=self.message.user_key)


# __create_data - используется для создания валидной команды для отправки
# __call_back - используется для создания валидного ответа на полученные данные


class CommandJoin(DefaultCommandClass):
    """Команда на присоединение датчика"""

    UID = JOIN_COMMAND_ID

    @staticmethod
    def create_detector(user, token) -> int:
        detector, _ = Detector.objects.get_or_create(user=user, token=token)
        return detector.sensor_id

    def call_back(self) -> str:
        sensor_id = self.create_detector(self.user, self.message.data.token)

        data = Data(
            t=self.message.data.token,
            si=sensor_id,
            st=self.user.settings.sleeping_time.seconds,
            rt=(
                self.user.settings.last_send
                + self.user.settings.sleeping_time
                - timezone.now()
            ).seconds,
        )

        message = Message(uk=self.message.user_key, c=self.message.cid, d=data)

        return message.json(by_alias=True, exclude_none=True)

    def create_data(self) -> None:
        return self.message.json(by_alias=True, exclude_none=True)


class CommandData(DefaultCommandClass):
    """Команда на отправку данных датчиком"""

    UID = DATA_COMMAND_ID

    def create_data(self) -> str:
        return self.message.json(by_alias=True, exclude_none=True)

    def create_data_in_db(self) -> None:
        data = self.message.data.dict(exclude_none=True)
        token = data.pop("token")
        data["detector"] = Detector.objects.get(user=self.user, token=token)
        DetectorData.objects.create(**data)

    def call_back(self) -> None:
        self.create_data_in_db()


class CommandCurrency(DefaultCommandClass):
    """Команда на изменения частоты включения датчика"""

    UID = FREQUENCY_COMMAND_ID

    def create_data(self) -> str:
        return self.message.json(by_alias=True, exclude_none=True)

    def call_back(self) -> None:
        data = self.message.dict(exclude_none=True)

        confirm = ReceiveConfirmation.objects.get(
            user=self.user, command__category=self.UID
        )

        confirm.remove(Detector.objects.get(user=self.user, token=data.data.token))

        if confirm.detectors.count() == 0:
            confirm.command.delete()
