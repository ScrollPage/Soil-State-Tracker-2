class CommandCreator:

    def __init__(self, user, cid):
        self.user = user
        self.cid = cid

    def create_data(self):
        if int(self.cid) == 1:
            now = timezone.now()
            detector = Detector.objects.create()
            uid = '{}'.format(detector.id).rjust(3, '-')
            lasted = 60 - now.second
            timestamp = str(now.timestamp()).rjust(10, '-')
            data = '{uid}{lasted}{timestamp}' \
                .format(uid=uid, lasted=lasted, timestamp=timestamp)

        elif int(self.cid) == 2:
            data = ''.rjust(16, '-')

        elif int(self.cid) == 3:
            data = str(timezone.now().timestamp()).rjust(10, '-')

        user = '{id}{email}'.format(
            id=self.user.id, email=self.user.email
        ).rjust(16, '-')
        cid = self.cid.rjust(4, '-')

        return '{user}{cid}{data}' \
            .format(user=user, cid=cid, data=data)