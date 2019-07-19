from django.db import models
from django.conf import settings

from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.






class ActivityType(models.Model):
    activityTypeName =models.CharField(max_length=50, unique = True)
    activityTypeDesc =models.TextField()
    activityTypeRequired = models.CharField(max_length=3)

    def __str__(self):
        return self.activityTypeName

class Project(models.Model):
    projectName = models.CharField(max_length=30, unique = True)
    projectDesc = models.TextField()
    projectPic = models.TextField()
    activitiesInvolved = models.ManyToManyField(ActivityType)

    def __str__(self):
        return self.projectName


class ActivityTypeIdentifier(models.Model):
    activityType = models.ForeignKey(
        'ActivityType',
        related_name = 'activityTypeNameFk',
        on_delete = models.CASCADE)
    activityTypeIdentifierName = models.CharField(max_length=100, unique = True)
    activityTypeIdentifierSubCat = models.CharField(max_length=100)

    def __str__(self):
        return self.activityTypeIdentifierName


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
    activityHours = models.FloatField()


class Attendance(models.Model):
    cardNo  = models.CharField(max_length=100)
    workGroup  = models.CharField(max_length=100)
    empCode  = models.CharField(max_length=100)
    firstName  = models.CharField(max_length=100)
    lastName  = models.CharField(max_length=100)
    firstIn = models.DateTimeField()
    lastOut = models.DateTimeField()
    totalHours = models.CharField(max_length=100)
    companyName = models.CharField(max_length=100)


class AttendanceFile(models.Model):
    year = models.CharField(max_length=100)
    month = models.CharField(max_length=100)
    fileName = models.CharField(max_length=100)
    timeOfUpload = models.DateTimeField()
    hashofFile = models.CharField(max_length=200)
    fileBase64 = models.TextField()


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    empCode = models.TextField(max_length=30, blank=True)
    location = models.CharField(max_length=30, blank=True)
    profilePic = models.TextField()
    projectsInvolved = models.ManyToManyField(Project)


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    print('signal workinggggggggggggggg')
