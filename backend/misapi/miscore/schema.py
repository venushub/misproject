import graphene

from graphene_django.types import DjangoObjectType

from .models import Bug

class BugType(DjangoObjectType):
    class Meta:
        model = Bug


class Query(object):
    all_bugs = graphene.List(BugType)

    def resolve_all_bugs(self, info, **kwargs):
        return Bug.objects.all()

