from django.contrib import admin

from .models import  ActivityType, Activity, Project, ActivityTypeIdentifier
# Register your models here.


admin.site.register(ActivityType)

admin.site.register(Activity)

admin.site.register(Project)

admin.site.register(ActivityTypeIdentifier)
