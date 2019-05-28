import graphene
from graphene_django import DjangoObjectType
from miscore.models import Activity
from miscore.models import Project
from miscore.models import ActivityTypeIdentifier
from miscore.models import ActivityType as ActivityTypeModel
from miscore.activitytype.schema import ActivityTypeType
from miscore.activitytypeidentifier.schema import ActivityTypeIdentifierType
from miscore.project.schema import ProjectType
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
    all_activities_for_week = graphene.List(ActivityType, search=graphene.String())

    def resolve_all_activities(self, info, **kwargs):
        print("the user currently logged in is", info.context.user)
        return Activity.objects.filter(activityUser = info.context.user.id)

    def resolve_all_activities_for_week(self, info, search,  **kwargs):
        return Activity.objects.filter(activityUser = info.context.user.id, activityStartTime__week = 22)



class CreateActivity(graphene.Mutation):

    id = graphene.Int()
    activityType= graphene.Field(ActivityTypeType)
    activityDescription = graphene.String()
    activityStartTime = graphene.String()
    activityEndTime = graphene.String()
    activityUser = graphene.Field(UserType)
    activityTypeIdentifier = graphene.Field(ActivityTypeIdentifierType)
    activityProject = graphene.Field(ProjectType)

    class Arguments:
        activityTypeArg = graphene.String()
        activityDescriptionArg = graphene.String()
        activityStartTimeArg = graphene.String()
        activityEndTimeArg = graphene.String()
        activityTypeIdentifierArg = graphene.String()
        activityProjectArg = graphene.String()
        activityMutateOrUpdateArg = graphene.String()

    def mutate(self, info,  activityTypeArg, activityDescriptionArg, activityStartTimeArg, activityEndTimeArg, activityTypeIdentifierArg, activityProjectArg, activityMutateOrUpdateArg):
        print("activity type instance is ")
        print(ActivityTypeModel)
        activityTypeInstance = ActivityTypeModel.objects.get(id = int(activityTypeArg))
        print("activityTypeInstance is...", activityTypeInstance)

        activityProjectInstance = Project.objects.get(id = int(activityProjectArg))
        activityTypeIdentifierInstance = ActivityTypeIdentifier.objects.get(id = int(activityTypeIdentifierArg))
        activityUserInstance = info.context.user
        print("activity type instance is after ", activityTypeInstance)
        print("activityTypeArg", activityTypeArg)



        activity = Activity(
            activityType=  activityTypeInstance,
            activityUser= activityUserInstance,
            activityDescription= activityDescriptionArg,
            activityStartTime = activityStartTimeArg,
            activityEndTime = activityEndTimeArg,
            activityTypeIdentifier = activityTypeIdentifierInstance,
            activityProject = activityProjectInstance
        )

        activity.save()

        return CreateActivity(
            id = activity.id,
            activityType=  activity.activityType,
            activityUser= activity.activityUser,
            activityDescription = activity.activityDescription,
            activityStartTime = activity.activityStartTime,
            activityEndTime = activity.activityEndTime,
            activityProject = activity.activityProject,
            activityTypeIdentifier = activity.activityTypeIdentifier
        )






class Mutation(graphene.ObjectType):
    create_activity = CreateActivity.Field()
