class UserInChat:

    def __call__(self, data):
        return any([
            data['user'] == data['chat'].admin,
            data['user'] == data['chat'].user
        ])