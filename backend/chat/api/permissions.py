from rest_framework.permissions import BasePermission

class AsUserInChat(BasePermission):
    '''request.user - это обычный пользоваель в чате'''
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user

class NotStaff(BasePermission):
    '''Пользователь - не персонал'''
    def has_permission(self, request, view):
        return not request.user.is_staff

class IsStaff(BasePermission):
    '''Пользователь - персонал'''
    def has_permission(self, request, view):
        return request.user.is_staff

    def has_object_permission(self, request, view, obj):
        return request.user.is_staff

class NoAdmin(BasePermission):
    '''Нет админа'''
    def has_object_permission(self, requst, view, obj):
        return not bool(obj.admin)