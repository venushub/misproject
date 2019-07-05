import graphene
from graphene_django import DjangoObjectType
from miscore.models import Attendance

class AttendanceType(DjangoObjectType):
    class Meta:
        model = Attendance


class Query(object):
    all_attendance = graphene.List(AttendanceType)

    def resolve_all_attendance(self, info, **kwargs):
        if(info.context.user.is_superuser):
            return Attendance.objects.all()
        else:
            return Attendance.objects.filter(empCode = info.context.user.profile.empCode)


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
