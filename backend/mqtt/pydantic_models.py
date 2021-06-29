from pydantic import BaseModel, Field

from typing import Optional


class Data(BaseModel):
    """Возможные данные в передаче"""

    # For authentication
    token: Optional[str] = Field(alias="t")

    # For comamnd with id 100
    sensor_id: Optional[str] = Field(alias="si")

    # For command with id 101
    temp_soil: Optional[str] = Field(alias="ts")
    temp_air: Optional[str] = Field(alias="ta")
    humidity: Optional[str] = Field(alias="hu")
    lightning: Optional[str] = Field(alias="li")

    # For command with id 0 and 100
    sleeping_time: Optional[int] = Field(alias="st")
    remaining_time: Optional[int] = Field(alias="rt")


class Message(BaseModel):
    """Передаваемое сообщение"""

    user_key: str = Field(alias="uk")
    cid: str = Field(alias="c")
    data: Optional[Data] = Field(alias="d")
