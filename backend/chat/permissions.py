class UserInChat:

    def __call__(self, chat, user):
        return any([
            user == chat.admin,
            user == chat.user
        ])