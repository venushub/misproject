import graphene
from graphene_django import DjangoObjectType
from miscore.models import ActivityType

class ActivityTypeType(DjangoObjectType):
    class Meta:
        model = ActivityType


class Query(object):
    all_activity_types = graphene.List(ActivityTypeType)

    def resolve_all_activity_types(self, info, **kwargs):
        return ActivityType.objects.all()



class CreateActivityType(graphene.Mutation):
    id = graphene.Int()
    activityTypeName= graphene.String()
    activityTypeDesc = graphene.String()

    class Arguments:
        activityTypeName = graphene.String(required= True)
        activityTypeDesc=graphene.String(required=True)


    def mutate(self, info,  activityTypeName, activityTypeDesc):
        print(info)
        activity = ActivityType(
            activityTypeName=  activityTypeName,
            activityTypeDesc =  activityTypeDesc,
        )
        activity.save()


        return CreateActivityType(
            id = activity.id,
            activityTypeName=  activity.activityTypeName,
            activityTypeDesc = activity.activityTypeDesc
        )



class Mutation(graphene.ObjectType):
    create_activity_type = CreateActivityType.Field()
