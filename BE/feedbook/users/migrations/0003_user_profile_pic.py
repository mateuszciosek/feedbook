# Generated by Django 2.0.3 on 2018-05-21 20:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20180518_1705'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(blank=True, upload_to='media/'),
        ),
    ]