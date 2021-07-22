# type: ignore
from django.utils import timezone

from loguru import logger
from datetime import timedelta, datetime

from .pydantic_models import Message, Data
from client.models import Client
from detector.models import DetectorCommand, Detector, ReceiveConfirmation
from detector_data.models import DetectorData
from backend.settings import (
    DATA_COMMAND_ID,
    JOIN_COMMAND_ID,
    FREQUENCY_COMMAND_ID,
    DEFAULT_SEND_DELAY_SECONDS,
    DEFAULT_SEND_FREQUENCY_MINUTES,
)


class DefaultCommandClass:
    def __init__(self, message: Message):
        self.message = message
        self.user = self.get_user()

    def get_user(self) -> Client:
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

    @staticmethod
    def preprocess_send_settings(user) -> None:
        if user.settings.last_send:
            return

        time = datetime.now()
        minutes = (
            time.minute // DEFAULT_SEND_FREQUENCY_MINUTES
        ) * DEFAULT_SEND_FREQUENCY_MINUTES
        
        res_time = (
            time.replace(minute=0, second=0, microsecond=0)
            + timedelta(minutes=minutes)
            - timedelta(seconds=DEFAULT_SEND_DELAY_SECONDS)
        )

        user.settings.last_send = res_time
        user.settings.save()

    def call_back(self) -> str:
        sensor_id = self.create_detector(self.user, self.message.data.token)
        self.preprocess_send_settings(self.user)

        data = Data(
            t=self.message.data.token,
            si=sensor_id,
            st=self.user.settings.sleeping_time.seconds,
            rt=(
                self.user.settings.last_send
                + self.user.settings.sleeping_time
                + timedelta(seconds=DEFAULT_SEND_DELAY_SECONDS)
                - timezone.now()
            ).seconds,
        )

        message = Message(uk=self.message.user_key, c=self.message.cid, d=data)

        return message.json(by_alias=True, exclude_none=True)

    def create_data(self) -> str:
        return self.message.json(by_alias=True, exclude_none=True)


class CommandData(DefaultCommandClass):
    """Команда на отправку данных датчиком"""

    UID = DATA_COMMAND_ID

    def create_data(self) -> str:
        return self.message.json(by_alias=True, exclude_none=True)

    @staticmethod
    def create_data_in_db(user, message) -> None:
        data = message.data.dict(exclude_none=True)
        token = data.pop("token")
        data["detector"] = Detector.objects.get(user=user, token=token)
        DetectorData.objects.create(**data)

    def call_back(self) -> None:
        self.create_data_in_db(self.user, self.message)


class CommandCurrency(DefaultCommandClass):
    """Команда на изменение частоты включения датчика"""

    UID = FREQUENCY_COMMAND_ID

    @staticmethod
    def update_confirmation(user, message) -> None:
        confirm = ReceiveConfirmation.objects.get(
            command__user=user, command__category=message.cid
        )

        confirm.detectors.remove(
            Detector.objects.get(user=user, token=message.data.token)
        )

        if confirm.detectors.count() == 0:
            confirm.command.delete()

    def create_data(self) -> str:
        return self.message.json(by_alias=True, exclude_none=True)

    def call_back(self) -> None:
        self.update_confirmation(self.user, self.message)
