from django.contrib import admin

from .models import Bug, ActivityType, Activity, Project
# Register your models here.
admin.site.register(Bug)

admin.site.register(ActivityType)

admin.site.register(Activity)

admin.site.register(Project)
