from rest_framework import serializers

from drf_extra_fields.fields import Base64ImageField
from . import models


class UserRegistrationSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    confirm_password = serializers.CharField(
        max_length=128,
        min_length=8,
        write_only=True
    )

    class Meta:
        model = models.User
        fields = [
            'email',
            'username',
            'password',
            'confirm_password',
            'gender'
        ]

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError(
                'Passwords does not match')

        return data

    def create(self, validated_data):

        user = models.User(
            email=validated_data['email'],
            username=validated_data['username'],
            gender=validated_data['gender']
        )
        user.set_password(validated_data['password'])

        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):

    profile_pic = Base64ImageField()

    class Meta:
        model = models.User
        fields = [
            'id',
            'email',
            'username',
            'bio',
            'location',
            'gender',
            'profile_pic'
        ]
        read_only_fields = [
            'gender',
            'username',
        ]
