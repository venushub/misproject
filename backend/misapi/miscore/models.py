from django.db import models
from django.conf import settings

# Create your models here.
class Bug(models.Model):
    bugId = models.CharField(max_length=30)
    bugDesc = models.TextField()

    def __str__(self):
        return self.bugId


class Project(models.Model):
    projectName = models.CharField(max_length=30)
    projectDesc = models.TextField()

    def __str__(self):
        return self.projectName


class ActivityType(models.Model):
    activityTypeName =models.CharField(max_length=50)
    activityTypeDesc =models.TextField()

    def __str__(self):
        return self.activityTypeName


class ActivityTypeIdentifier(models.Model):
    activityType = models.ForeignKey(
        'ActivityType',
        related_name = 'activityTypeNameFk',
        on_delete = models.CASCADE)
    activityTypeIdentifierName = models.CharField(max_length=100)



class Activity(models.Model):
    activityType = models.ForeignKey(
        'ActivityType',
        related_name = 'activityTypeFk',
        on_delete = models.CASCADE)
    activityProject = models.ForeignKey(
        'Project',
        related_name = 'projectname',
        on_delete = models.CASCADE)
    activityUser = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    activityTypeIdentifier = models.ForeignKey(
        'ActivityTypeIdentifier',
        related_name = 'activityTypeIdentifierNameFk',
        on_delete = models.CASCADE)
    activityDescription =models.TextField()
    activityStartTime = models.DateTimeField()
    activityEndTime = models.DateTimeField()
