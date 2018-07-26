from django.urls import path, include
from django.conf.urls import url


from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('posts', views.PostViewSet)

urlpatterns = [
    path('posts/mostliked/', views.PostMostLikedView.as_view()),
    path('', include(router.urls)),
    url('^posts/(?P<pk>[^/.]+)/like/$',
        views.PostLikeAPIView.as_view(), name='post-like'),
    path('posts/<int:pk>/comments/', views.CommentsListCreateAPIView.as_view()),
]
