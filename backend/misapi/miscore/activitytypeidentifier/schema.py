import graphene
from graphene_django import DjangoObjectType
from miscore.models import ActivityTypeIdentifier
from miscore.activitytype.schema import ActivityTypeType
from miscore.models import ActivityType as ActivityTypeModel


class ActivityTypeIdentifierType(DjangoObjectType):
    class Meta:
        model = ActivityTypeIdentifier


class Query(object):
    all_activity_type_identifiers = graphene.List(ActivityTypeIdentifierType, search=graphene.String())

    def resolve_all_activity_type_identifiers(self, info, search=None , **kwargs):

        # if search:
        #     return Link.objects.filter(ActivityType = search)
        #
        # return Link.objects.all()
        return ActivityTypeIdentifier.objects.filter(activityType = int(search))





class CreateActivityTypeIdentifier(graphene.Mutation):
    id = graphene.Int()
    activityTypeIdentifierName= graphene.String()
    activityType= graphene.Field(ActivityTypeType)
    activityTypeIdentifierSubCat = graphene.String()

    print("flow idhar aya")

    class Arguments:
        activityType = graphene.String(required= True)
        activityTypeIdentifierName=graphene.String(required=True)
        activityTypeIdentifierSubCat = graphene.String(required=True)

    print("type", activityType, "name", activityTypeIdentifierName)

    def mutate(self, info,  activityType, activityTypeIdentifierName, activityTypeIdentifierSubCat):
        print(info)
        activityTypeInstance = ActivityTypeModel.objects.get(id = int(activityType))
        activitytypeidentifier = ActivityTypeIdentifier(
            activityType=  activityTypeInstance,
            activityTypeIdentifierName =  activityTypeIdentifierName,
            activityTypeIdentifierSubCat = activityTypeIdentifierSubCat
        )
        activitytypeidentifier.save()


        return CreateActivityTypeIdentifier(
            id = activitytypeidentifier.id,
            activityType=  activitytypeidentifier.activityType,
            activityTypeIdentifierName = activitytypeidentifier.activityTypeIdentifierName,
            activityTypeIdentifierSubCat = activitytypeidentifier.activityTypeIdentifierSubCat
        )


class Mutation(graphene.ObjectType):
    create_activity_type_identifier = CreateActivityTypeIdentifier.Field()
