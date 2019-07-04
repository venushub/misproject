import graphene
from graphene_django import DjangoObjectType
from miscore.models import Profile

class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile


class Query(object):
    all_profiles = graphene.List(ProfileType)

    def resolve_all_profiles(self, info, **kwargs):
        return Profile.objects.all()


# class CreateAttendance(graphene.Mutation):
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
#
#
#
# class Mutation(graphene.ObjectType):
#     create_activity_type = CreateActivityType.Field()
