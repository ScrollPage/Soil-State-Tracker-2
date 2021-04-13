class UserInChat:

    def __call__(self, data):
        return any([
            data['user'] == data['chat'].admin,
            data['user'] == data['chat'].user
        ])

class IsAdmin:

    def __call__(self, data):
        return any([
            data['user'].is_staff,
            data['user'].is_superuser
        ])