# Generated by Django 2.2.1 on 2019-05-25 08:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ActivityType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activityTypeName', models.CharField(max_length=50)),
                ('activityTypeDesc', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Bug',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bugId', models.CharField(max_length=30)),
                ('bugDesc', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('projectName', models.CharField(max_length=30)),
                ('projectDesc', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ActivityTypeIdentifier',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activityTypeIdentifierName', models.CharField(max_length=100)),
                ('activityType', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='activitytypeid', to='miscore.ActivityType')),
            ],
        ),
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activityDescription', models.TextField()),
                ('activityStartTime', models.DateTimeField()),
                ('activityEndTime', models.DateTimeField()),
                ('activityProject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='projectname', to='miscore.Project')),
                ('activityType', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='activitytype', to='miscore.ActivityType')),
                ('activityTypeIdentifier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='activitytypeidentifier', to='miscore.ActivityTypeIdentifier')),
                ('activityUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
