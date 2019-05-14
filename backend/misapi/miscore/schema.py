import graphene

from graphene_django.types import DjangoObjectType

from .models import Bug, ActivityType

class BugType(DjangoObjectType):
    class Meta:
        model = Bug
    
class ActivityTypeType(DjangoObjectType):
    class Meta:
        model = ActivityType



class Query(object):
    all_bugs = graphene.List(BugType)

    def resolve_all_bugs(self, info, **kwargs):
        return Bug.objects.all()



    all_activity_types = graphene.List(ActivityTypeType)

    def resolve_all_activity_types(self, info, **kwargs):
        return ActivityType.objects.all()

