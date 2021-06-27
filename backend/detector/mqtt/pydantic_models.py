from pydantic import BaseModel, Field

from typing import Optional


class Numbers(BaseModel):
    """Числа для подтверждения передачи"""

    sync_num: Optional[int] = Field(alias="s")
    ack_num: Optional[int] = Field(alias="a")


class Data(BaseModel):
    """Возможные данные в передаче"""

    # For authentication
    token: Optional[str] = Field(alias="t")

    # For comamnd with id 100
    inner_id: Optional[str] = Field(alias="i")

    # For command with id 101
    first_temp: Optional[str] = Field(alias="t1")
    second_temp: Optional[str] = Field(alias="t2")
    humidity: Optional[str] = Field(alias="hu")
    lightning: Optional[str] = Field(alias="li")

    # For command with id 0
    currency: Optional[str] = Field(alias="c")
    remaining_time: Optional[str] = Field(alias="rt")


class Message(BaseModel):
    """Передаваемое сообщение"""

    user_key: str = Field(alias="uk")
    cid: str = Field(alias="c")
    data: Optional[Data] = Field(alias="d")
    numbers: Optional[Numbers] = Field(alias="n")
