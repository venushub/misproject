import graphene
from graphene_django import DjangoObjectType
from miscore.models import Bug


class BugType(DjangoObjectType):
    class Meta:
        model = Bug


class Query(object):
    all_bugs = graphene.List(BugType)

    def resolve_all_bugs(self, info, **kwargs):
        return Bug.objects.all()



class CreateBug(graphene.Mutation):
    id = graphene.Int()
    bugId = graphene.String()
    bugDesc = graphene.String()

    class Arguments:
        bugId = graphene.String(required= True)
        bugDesc =graphene.String(required=True)
        

    def mutate(self, info,bugId, bugDesc):
        bug = Bug(
            bugId= bugId,
            bugDesc =bugDesc,
        )
        bug.save()
        

        return CreateBug(
            id = bug.id,
            bugId = bug.bugId,
            bugDesc = bug.bugDesc
        )
    


class Mutation(graphene.ObjectType):
    create_bug = CreateBug.Field()