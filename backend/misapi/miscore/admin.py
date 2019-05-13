from django.contrib import admin

from .models import Bug, ActivityType
# Register your models here.
admin.site.register(Bug)

admin.site.register(ActivityType)

