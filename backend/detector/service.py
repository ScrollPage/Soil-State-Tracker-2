# type: ignore
from django.utils import timezone

from backend.settings import DATA_COMMAND_ID


class CommandCreator:
    def __init__(self, instance):
        self.instance = instance

    def create_data(self):
        if int(self.instance.category) == 1:
            now = timezone.now()
            detector = Detector.objects.create()
            uid = "{}".format(detector.id).rjust(3, "-")
            lasted = 60 - now.second
            timestamp = str(now.timestamp()).rjust(10, "-")
            data = "{uid}/{lasted}/{timestamp}".format(
                uid=uid, lasted=lasted, timestamp=timestamp
            )

        elif int(self.instance.category) == 2:
            data = str(timezone.now().timestamp()).rjust(10, "-")

        elif int(self.instance.category) == 3:
            data = str(self.instance.extra["currency"]).rjust(10, "-")

        elif int(self.instance.category) == int(DATA_COMMAND_ID):
            data = "".rjust(16, "-")

        user = "{id}{email}".format(
            id=self.instance.user.id, email=self.instance.user.email
        ).rjust(16, "-")

        cid = self.instance.category.rjust(4, "-")

        return "{user}{cid}{data}".format(user=user, cid=cid, data=data)
