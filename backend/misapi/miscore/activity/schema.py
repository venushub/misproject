import graphene
from graphene_django import DjangoObjectType
from miscore.models import Activity
from miscore.models import ActivityType as ActivityTypeModel
from miscore.activitytype.schema import ActivityTypeType
from users.schema import UserType

class ActivityType(DjangoObjectType):
    class Meta:
        model = Activity


    # activityType = models.ForeignKey(
    #     'ActivityType',
    #     related_name = 'activitytype',
    #     on_delete = models.CASCADE)
    # activityUser = models.ForeignKey(
    #     settings.AUTH_USER_MODEL,
    #     on_delete=models.CASCADE)
    # activityDescription =models.TextField()
    # activityStartTime = models.DateTimeField()
    # activityEndTime = models.DateTimeField()



class Query(object):
    all_activities = graphene.List(ActivityType)

    def resolve_all_activities(self, info, **kwargs):
        print("the user currently logged in is", info.context.user)
        return Activity.objects.filter(activityUser = info.context.user.id)


class CreateActivity(graphene.Mutation):

    id = graphene.Int()
    activityType= graphene.Field(ActivityTypeType)
    activityDescription = graphene.String()
    activityStartTime = graphene.String()
    activityEndTime = graphene.String()
    activityUser = graphene.Field(UserType)
    activityTypeIdentifier = graphene.String()

    class Arguments:
        activityTypeArg= graphene.String()
        activityDescriptionArg = graphene.String()
        activityStartTimeArg = graphene.String()
        activityEndTimeArg = graphene.String()
        activityTypeIdentifierArg = graphene.String()


    def mutate(self, info,  activityTypeArg, activityDescriptionArg, activityStartTimeArg, activityEndTimeArg, activityTypeIdentifierArg):
        print("activity type instance is ")
        print(ActivityTypeModel)
        activityTypeInstance = ActivityTypeModel.objects.get(activityTypeName = activityTypeArg)
        activityUserInstance = info.context.user
        print("activity type instance is after ", activityTypeInstance)
        activity = Activity(
            activityType=  activityTypeInstance,
            activityUser= activityUserInstance,
            activityDescription= activityDescriptionArg,
            activityStartTime = activityStartTimeArg,
            activityEndTime = activityEndTimeArg,
            activityTypeIdentifier = activityTypeIdentifierArg
        )

        activity.save()

        return CreateActivity(
            id = activity.id,
            activityType=  activity.activityType,
            activityUser= activity.activityUser,
            activityDescription = activity.activityDescription,
            activityStartTime = activity.activityStartTime,
            activityEndTime = activity.activityEndTime,
        )


class Mutation(graphene.ObjectType):
    create_activity = CreateActivity.Field()
