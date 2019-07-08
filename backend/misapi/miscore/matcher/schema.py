import graphene
from graphene_django import DjangoObjectType
from miscore.models import Attendance
import json
from django.contrib.auth import get_user_model

class AttendanceType(DjangoObjectType):
    class Meta:
        model = Attendance


class Query(object):
    all_attendance = graphene.List(AttendanceType, criteria=graphene.String())

    def resolve_all_attendance(self, info, criteria, **kwargs):
        print(criteria)
        my_criteria = json.loads(criteria)
        userInstance = get_user_model().objects.filter(username = my_criteria["user"])[0]
        print(my_criteria)
        if(info.context.user.is_superuser):
            print(criteria)
            return Attendance.objects.filter(empCode = userInstance.profile.empCode, firstIn__month = int(my_criteria["month"])  ,firstIn__year = int(my_criteria["year"]))
        else:
            return Attendance.objects.filter(empCode = info.context.user.profile.empCode, firstIn__month = int(my_criteria["month"]), firstIn__year = int(my_criteria["year"]))

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
