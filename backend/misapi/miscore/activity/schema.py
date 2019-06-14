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
import json
from django.contrib.auth import get_user_model
from django.db.models import Sum


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
    all_activities_for_filter = graphene.List(ActivityType, search=graphene.String())

    def resolve_all_activities(self, info, **kwargs):
        print("the user currently logged in is", info.context.user)
        if(info.context.user.is_superuser):
            return Activity.objects.all()
        else:
            return Activity.objects.filter(activityUser = info.context.user.id)

    def resolve_all_activities_for_filter(self, info, search, **kwargs):
        print("kidar gaya re")
        filter_criteria = json.loads(search)
        print(filter_criteria["projects"])
        SD = filter_criteria["SD"]
        ED = filter_criteria["ED"]
        GB = filter_criteria["GB"]
        print(SD, ED, GB)

        activityProjectInstance = Project.objects.filter(projectName__in = filter_criteria["projects"])
        activityTypeInstance = ActivityTypeModel.objects.filter(activityTypeName__in = filter_criteria["types"])
        activityUserInstance = get_user_model().objects.filter(username__in = filter_criteria["users"])
        activityTypeIdentifierInstance = ActivityTypeIdentifier.objects.filter(activityTypeIdentifierName__in = filter_criteria["typeidens"])
        # Activity.objects.values(*GB).annotate(Sum('activityHours'))
        return Activity.objects.filter(activityProject__in = activityProjectInstance, activityUser__in = activityUserInstance, activityType__in = activityTypeInstance, activityTypeIdentifier__in = activityTypeIdentifierInstance, activityStartTime__range=[SD, ED])
        # return Activity.objects.values(*GB).annotate(Sum('activityHours')).filter(activityProject__projectName__in = filter_criteria["projects"], activityUser__username__in = filter_criteria["users"], activityType__activityTypeName__in = filter_criteria["types"], activityTypeIdentifier__activityTypeIdentifierName__in = filter_criteria["typeidens"], activityStartTime__range=[SD, ED])
        # return Activity.objects.filter(activityProject__projectName__in = filter_criteria["projects"], activityUser__username__in = filter_criteria["users"], activityType__activityTypeName__in = filter_criteria["types"], activityTypeIdentifier__activityTypeIdentifierName__in = filter_criteria["typeidens"], activityStartTime__range=[SD, ED]).values(*GB).annotate(Sum('activityHours'))



    def resolve_all_activities_for_week(self, info, search,  **kwargs):
        if(info.context.user.is_superuser):
            return Activity.objects.filter(activityStartTime__week = int(search))
        else:
            return Activity.objects.filter(activityUser = info.context.user.id, activityStartTime__week = int(search))



class CreateActivity(graphene.Mutation):

    id = graphene.Int()
    activityType= graphene.Field(ActivityTypeType)
    activityDescription = graphene.String()
    activityStartTime = graphene.String()
    activityEndTime = graphene.String()
    activityUser = graphene.Field(UserType)
    activityTypeIdentifier = graphene.Field(ActivityTypeIdentifierType)
    activityProject = graphene.Field(ProjectType)
    activityHours = graphene.Float()

    class Arguments:
        activityTypeArg = graphene.String()
        activityDescriptionArg = graphene.String()
        activityStartTimeArg = graphene.String()
        activityEndTimeArg = graphene.String()
        activityTypeIdentifierArg = graphene.String()
        activityProjectArg = graphene.String()
        activityMutateOrUpdateArg = graphene.String()
        activityHoursArg = graphene.String()

    def mutate(self, info,  activityTypeArg, activityDescriptionArg, activityStartTimeArg, activityEndTimeArg, activityTypeIdentifierArg, activityProjectArg, activityMutateOrUpdateArg, activityHoursArg):
        print("activity type instance is ")
        print(ActivityTypeModel)
        activityTypeInstance = ActivityTypeModel.objects.get(id = int(activityTypeArg))
        print("activityTypeInstance is...", activityTypeInstance)

        activityProjectInstance = Project.objects.get(id = int(activityProjectArg))
        activityTypeIdentifierInstance = ActivityTypeIdentifier.objects.get(id = int(activityTypeIdentifierArg))
        activityUserInstance = info.context.user
        print("activity type instance is after ", activityTypeInstance)
        print("activityTypeArg", activityTypeArg)
        activityHoursIns = float(activityHoursArg)


        activity = Activity(
            activityType=  activityTypeInstance,
            activityUser= activityUserInstance,
            activityDescription= activityDescriptionArg,
            activityStartTime = activityStartTimeArg,
            activityEndTime = activityEndTimeArg,
            activityTypeIdentifier = activityTypeIdentifierInstance,
            activityProject = activityProjectInstance,
            activityHours = activityHoursIns
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
            activityTypeIdentifier = activity.activityTypeIdentifier,
            activityHours = activity.activityHours
        )


##########################################################
##############UPDATE ACTIVITY MUTATION START##############


class UpdateActivity(graphene.Mutation):

    activityType= graphene.Field(ActivityTypeType)
    activityDescription = graphene.String()
    activityStartTime = graphene.String()
    activityEndTime = graphene.String()
    activityTypeIdentifier = graphene.Field(ActivityTypeIdentifierType)
    activityProject = graphene.Field(ProjectType)
    activityMutateOrUpdateArg =graphene.String()
    activityHours = graphene.Float()


    class Arguments:
        activityTypeArg = graphene.String()
        activityDescriptionArg = graphene.String()
        activityStartTimeArg = graphene.String()
        activityEndTimeArg = graphene.String()
        activityTypeIdentifierArg = graphene.String()
        activityProjectArg = graphene.String()
        activityMutateOrUpdateArg = graphene.String()
        activityHoursArg = graphene.String()


    # ,  activityTypeArg, activityDescriptionArg, activityStartTimeArg, activityEndTimeArg, activityTypeIdentifierArg, activityProjectArg,

    def mutate(self, info, activityTypeArg, activityDescriptionArg, activityMutateOrUpdateArg, activityTypeIdentifierArg, activityStartTimeArg, activityEndTimeArg,activityProjectArg, activityHoursArg):
        # print("activity type instance is ")
        # print(ActivityTypeModel)
        activityTypeInstance = ActivityTypeModel.objects.get(id = int(activityTypeArg))
        # print("activityTypeInstance is...", activityTypeInstance)
        #
        activityProjectInstance = Project.objects.get(id = int(activityProjectArg))
        activityTypeIdentifierInstance = ActivityTypeIdentifier.objects.get(id = int(activityTypeIdentifierArg))
        # activityUserInstance = info.context.user
        # print("activity type instance is after ", activityTypeInstance)
        # print("activityTypeArg", activityTypeArg)
        print("hello")
        activityObject = Activity.objects.get(id=int(activityMutateOrUpdateArg))
        activityObject.activityType  = activityTypeInstance
        activityObject.activityDescription = activityDescriptionArg
        activityObject.activityTypeIdentifier = activityTypeIdentifierInstance
        activityObject.activityProject = activityProjectInstance
        activityObject.activityStartTime = activityStartTimeArg
        activityObject.activityEndTime = activityEndTimeArg
        activityObject.activityHours = float(activityHoursArg)
        print(activityObject)
        activityObject.save()
        # activity = Activity(
        #     activityType=  activityTypeInstance,
        #     activityUser= activityUserInstance,
        #     activityDescription= activityDescriptionArg,
        #     activityStartTime = activityStartTimeArg,
        #     activityEndTime = activityEndTimeArg,
        #     activityTypeIdentifier = activityTypeIdentifierInstance,
        #     activityProject = activityProjectInstance
        # )
        #
        # activity.save()

        return UpdateActivity(

            activityType=  activityObject.activityType,
            activityDescription = activityObject.activityDescription,
            activityStartTime = activityObject.activityStartTime,
            activityEndTime = activityObject.activityEndTime,
            activityProject = activityObject.activityProject,
            activityTypeIdentifier = activityObject.activityTypeIdentifier,
            activityHours = activityObject.activityHours
        )



##############UPDATE ACTIVITY MUTATION ENDS###############
##########################################################





class Mutation(graphene.ObjectType):
    create_activity = CreateActivity.Field()
    update_activity = UpdateActivity.Field()
