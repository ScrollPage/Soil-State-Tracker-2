# type: ignore

import detector.commands as commands

from detector.models import DetectorCommand


class CommandCreator:

    COMMAND_DICT = {
        getattr(commands, cls).UID: getattr(commands, cls)
        for cls in filter(lambda x: x.startswith("Command"), dir(commands))
    }

    @classmethod
    def create_data(cls, instance: DetectorCommand, *args, **kwargs) -> str:
        user = f"{instance.user.id}:{instance.user.email}".center(16, "-")

        cid = instance.category.rjust(4, "0")

        data = cls.COMMAND_DICT[instance.category](instance).__create_data(
            *args, **kwargs
        )

        num = str(instance.valid_num).center(4, "-")

        return f"{user}/{cid}/{data}/{num}"
