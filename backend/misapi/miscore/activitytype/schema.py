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
    activityTypeRequired = graphene.String()

    class Arguments:
        activityTypeName = graphene.String(required= True)
        activityTypeDesc=graphene.String(required=True)
        activityTypeRequired=graphene.String(required=True)

    def mutate(self, info,  activityTypeName, activityTypeDesc, activityTypeRequired):
        print(info)
        activityType = ActivityType(
            activityTypeName=  activityTypeName,
            activityTypeDesc =  activityTypeDesc,
            activityTypeRequired = activityTypeRequired
        )
        activityType.save()


        return CreateActivityType(
            id=activityType.id,
            activityTypeName=  activityType.activityTypeName,
            activityTypeDesc = activityType.activityTypeDesc,
            activityTypeRequired = activityType.activityTypeRequired
        )


class UpdateActivityType(graphene.Mutation):
    id = graphene.Int()
    activityTypeName= graphene.String()
    activityTypeDesc = graphene.String()
    activityTypeRequired = graphene.String()

    class Arguments:
        activityType = graphene.String(required= True)
        activityTypeDesc=graphene.String(required=True)
        activityTypeRequired=graphene.String(required=True)

    def mutate(self, info,  activityType, activityTypeDesc, activityTypeRequired):
        print(info)
        activityType = ActivityType.objects.get(id = int(activityType))
        activityType.activityTypeDesc=  activityTypeDesc
        activityType.activityTypeRequired = activityTypeRequired
        activityType.save()

        return CreateActivityType(
            id=activityType.id,
            activityTypeName=  activityType.activityTypeName,
            activityTypeDesc = activityType.activityTypeDesc,
            activityTypeRequired = activityType.activityTypeRequired
        )




class Mutation(graphene.ObjectType):
    create_activity_type = CreateActivityType.Field()
    update_activity_type = UpdateActivityType.Field()
