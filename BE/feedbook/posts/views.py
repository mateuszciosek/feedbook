from django.shortcuts import render
from rest_framework.exceptions import NotFound
from rest_framework import filters
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Count

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from . import views, serializers, models, permissions


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PostSerializer
    permission_classes = (permissions.UpdateOwnPost, IsAuthenticated)
    queryset = models.Post.objects.all().order_by('-timestamp')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = self.queryset

        liked_by = self.request.query_params.get('liked', None)
        if liked_by is not None:
            queryset = queryset.filter(liked_by__user__username=liked_by)

        return queryset


class PostMostLikedView(ListAPIView):
    serializer_class = serializers.PostSerializer
    permission_classes = (permissions.UpdateOwnPost, IsAuthenticated)
    queryset = models.Post.objects.annotate(
        likesCount=Count('liked_by')).order_by('-likesCount')[0:3]


class PostLikeAPIView(APIView):
    serializer_class = serializers.PostSerializer
    permission_classes = (IsAuthenticated, )

    def delete(self, request, pk=None):
        user = self.request.user
        serializer_context = {'request': request}

        try:
            post = models.Post.objects.get(pk=pk)
        except models.Post.DoesNotExist:
            raise NotFound('A post with this ID was not found')

        user.dislike(post)

        serializer = self.serializer_class(post, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, pk=None):
        user = self.request.user
        serializer_context = {'request': request}

        try:
            post = models.Post.objects.get(pk=pk)
        except models.Post.DoesNotExist:
            raise NotFound('A post with this ID was not found')

        user.like(post)

        serializer = self.serializer_class(post, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CommentsListCreateAPIView(ListCreateAPIView):
    lookup_field = 'post__pk'
    lookup_url_kwarg = 'pk'
    serializer_class = serializers.CommentSerializer
    permission_classes = (IsAuthenticated, )
    queryset = models.Comment.objects.select_related(
        'post', 'post__author', 'author').order_by('-timestamp')

    def filter_queryset(self, queryset):

        filters = {self.lookup_field: self.kwargs[self.lookup_url_kwarg]}

        return queryset.filter(**filters)

    def create(self, request, pk=None):
        data = request.data
        context = {'author': request.user}
        print(context)

        try:
            context['post'] = models.Post.objects.get(pk=pk)
        except models.Post.DoesNotExist:
            raise NotFound('A post with this ID does not exist.')

        serializer = self.serializer_class(data=data, context=context)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
