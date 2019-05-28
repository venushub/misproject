import graphene
from graphene_django import DjangoObjectType
from miscore.models import ActivityTypeIdentifier

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


# class CreateActivityType(graphene.Mutation):
#     id = graphene.Int()
#     activityTypeName= graphene.String()
#     activityTypeDesc = graphene.String()
#
#     class Arguments:
#         activityTypeName = graphene.String(required= True)
#         activityTypeDesc=graphene.String(required=True)
#
#
#     def mutate(self, info,  activityTypeName, activityTypeDesc):
#         print(info)
#         activity = ActivityType(
#             activityTypeName=  activityTypeName,
#             activityTypeDesc =  activityTypeDesc,
#         )
#         activity.save()
#
#
#         return CreateActivityType(
#             id = activity.id,
#             activityTypeName=  activity.activityTypeName,
#             activityTypeDesc = activity.activityTypeDesc
#         )



# class Mutation(graphene.ObjectType):
#     create_activity_type = CreateActivityType.Field()
