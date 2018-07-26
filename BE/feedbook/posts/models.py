from django.db import models


class Post(models.Model):

    title = models.CharField(max_length=255)
    author = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Comment(models.Model):

    content = models.TextField()
    author = models.ForeignKey(
        'users.User', on_delete=models.CASCADE, related_name='comments')
    post = models.ForeignKey(
        'posts.Post', on_delete=models.CASCADE, related_name='comments')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content
