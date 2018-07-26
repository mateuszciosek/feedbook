from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from . import jwt

from django.conf import settings
from django.conf.urls.static import static

from users import views as user_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', jwt.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', user_views.UserRegistrationView.as_view()),
    path('', include('posts.urls')),
    path('users/', include('users.urls', namespace='users'))
]

if settings.DEBUG:
    urlpatterns = urlpatterns + \
        static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
