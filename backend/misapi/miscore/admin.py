from django.contrib import admin

from .models import  ActivityType, Activity, Project, ActivityTypeIdentifier, CostingPerHour
# Register your models here.

admin.site.register(ActivityType)

admin.site.register(Activity)

admin.site.register(Project)

admin.site.register(ActivityTypeIdentifier)

admin.site.register(CostingPerHour)
