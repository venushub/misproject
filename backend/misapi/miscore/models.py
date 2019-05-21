from django.db import models
from django.conf import settings

# Create your models here.
class Bug(models.Model):
    bugId = models.CharField(max_length=30)
    bugDesc = models.TextField()

    def __str__(self):
        return self.bugId


class ActivityType(models.Model):
    activityTypeName =models.CharField(max_length=50)
    activityTypeDesc =models.TextField()

    def __str__(self):
        return self.activityTypeName


class Activity(models.Model):
    activityType = models.ForeignKey(
        'ActivityType',
        related_name = 'activitytype',
        on_delete = models.CASCADE)
    activityUser = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    activityTypeIdentifier = models.CharField(max_length=50)
    activityDescription =models.TextField()
    activityStartTime = models.DateTimeField()
    activityEndTime = models.DateTimeField()
