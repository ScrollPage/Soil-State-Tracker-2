class UpgradedWebsocketConsumer(WebsocketConsumer):
    '''Новые методы - prepare_data, check_permissions'''

    required_fields = []
    permissions = []

    def check_permissions(self):
        if not all([
            permission(self.chat, self.user) for permission in self.permissions
        ]):
            raise HttpResponseForbidden()

    def prepare_data(self, text_data):
        data = json.loads(text_data)

        if not self.required_fields:
            raise TypeError('Required fields must not be empty.')

        for model, field in self.required_fields:

            if not isinstance(model, models.Model):
                raise TypeError(f'''
                    Required fields list must be a type of (models.Model, str), 
                    not ({type(model)}, {type(field)})
                ''')

            data[field] = get_object_or_404(model, id=data[field])
            setattr(self, field, data[field])

        return data