from django.db import models
from django.urls import reverse
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    GENDER = (
        ('', ''),
        ('M', 'Male'),
        ('F', 'Female')
    )

    bio = models.TextField(max_length=400, blank=True)
    location = models.CharField(max_length=40, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER)
    profile_pic = models.ImageField(
        upload_to="profile_pics/", default="profile_pics/default.jpg", blank=True)
    likes = models.ManyToManyField(
        'posts.Post', related_name='liked_by', blank=True)

    def get_api_url(self):
        return reverse("users:user-detail", kwargs={'pk': self.pk})

    def like(self, post):
        self.likes.add(post)

    def dislike(self, post):
        self.likes.remove(post)

    def has_liked(self, post):
        return self.likes.filter(pk=post.pk).exists()
