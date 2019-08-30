import graphene
from graphene_django import DjangoObjectType
from miscore.models import AttendanceFile

class AttendanceFileType(DjangoObjectType):
    class Meta:
        model = AttendanceFile


class Query(object):
    all_attendance_files = graphene.List(AttendanceFileType)
    # attendance_files_for_filter = graphene.List()

    def resolve_all_attendance_files(self, info, **kwargs):
        return AttendanceFile.objects.all()


# year=jsonredata['fileYear'],
#                     month=jsonredata['fileMonth'],
#                     fileName=jsonredata['fileName'],
#                     timeOfUpload=jsonredata['fileUploadTime'],
#                     hashofFile=hashlib.md5(jsonredata['filebase64'].encode()).hexdigest(),
#                     fileBase64 = jsonredata['filebase64']

#
# class CreateAttendanceFile(graphene.Mutation):
#     id = graphene.Int()
#     month= graphene.String()
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
