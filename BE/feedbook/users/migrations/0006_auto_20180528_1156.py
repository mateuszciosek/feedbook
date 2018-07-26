# Generated by Django 2.0.3 on 2018-05-28 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_user_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='likes',
            field=models.ManyToManyField(blank=True, related_name='liked_by', to='posts.Post'),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(blank=True, default='profile_pics/default.jpg', upload_to='profile_pics/'),
        ),
    ]