# Generated by Django 2.2.1 on 2019-07-04 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('miscore', '0007_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='profilePic',
            field=models.TextField(default=''),
            preserve_default=False,
        ),
    ]