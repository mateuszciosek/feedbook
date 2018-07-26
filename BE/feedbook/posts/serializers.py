from rest_framework import serializers
from feedbook.settings import MEDIA_URL

from users.serializers import UserSerializer
from . import models
from users.models import User


class PostSerializer(serializers.ModelSerializer):
    author = serializers.SerializerMethodField()

    liked = serializers.SerializerMethodField()
    likesCount = serializers.SerializerMethodField(
        method_name='get_likes_count')

    publishedAt = serializers.SerializerMethodField(
        method_name='get_published_at')

    commentsCount = serializers.SerializerMethodField(
        method_name='get_comments_count')

    class Meta:
        model = models.Post
        fields = [
            'id',
            'title',
            'author',
            'liked',
            'likesCount',
            'content',
            'publishedAt',
            'commentsCount',
        ]
        read_only_fields = [
            'author',
            'liked',
            'likes_count',
        ]

    def validate_title(self, value):
        return value.title()

    def get_author(self, obj):
        author_dict = {
            'username': obj.author.username,
            'id': obj.author.id
        }
        return author_dict

    def get_author_id(self, obj):
        return obj.author.id

    def get_liked(self, obj):
        request = self.context.get('request', None)

        if request is None:
            return False

        # if not request.user.is_authenticated():
        #     return False

        return request.user.has_liked(obj)

    def get_comments_count(self, obj):
        comments_set = models.Comment.objects.filter(
            post__id__iexact=obj.id)

        return comments_set.count()

    def get_likes_count(self, obj):
        return obj.liked_by.count()

    def get_published_at(self, obj):
        return obj.timestamp.strftime('%d %b %Y - %H:%M')


class CommentSerializer(serializers.ModelSerializer):

    author = UserSerializer(read_only=True)

    publishedAt = serializers.SerializerMethodField(
        method_name='get_published_at')

    class Meta:
        model = models.Comment
        fields = [
            'id',
            'author',
            'content',
            'publishedAt',
        ]

    def get_published_at(self, obj):
        return obj.timestamp.strftime('%d %b %Y - %H:%M')

    def create(self, validated_data):
        post = self.context['post']
        author = self.context['author']

        return models.Comment.objects.create(author=author, post=post, **validated_data)
