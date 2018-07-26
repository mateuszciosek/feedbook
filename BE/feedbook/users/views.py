from django.shortcuts import render

from rest_framework.generics import CreateAPIView
from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from . import serializers
from . import models
from . import permissions


class UserRegistrationView(CreateAPIView):
    serializer_class = serializers.UserRegistrationSerializer
    permission_classes = (AllowAny, )


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()
    permission_classes = (permissions.UpdateOwnProfile, )
