import graphene
from graphene_django import DjangoObjectType
from miscore.models import Project



class ProjectType(DjangoObjectType):
    class Meta:
        model = Project


class Query(object):
    all_projects = graphene.List(ProjectType)
    # all_projects_for_user = graphene.List(ProjectType)

    def resolve_all_projects(self, info, **kwargs):
        print("the user currently logged in is", info.context.user)
        return Project.objects.all()

    # def resolve_all_projects_for_user(self, info, **kwargs):
    #     print("the user currently logged in is", info.context.user)
    #     if(info.context.user.is_superuser):
    #         return Activity.objects.all()


class CreateProject(graphene.Mutation):
    id = graphene.Int()
    projectName = graphene.String()
    projectDesc = graphene.String()

    class Arguments:
        projectName = graphene.String(required= True)
        projectDesc =graphene.String(required=True)


    def mutate(self, info, projectName, projectDesc):
        project = Project(
            projectName= projectName,
            projectDesc =projectDesc,
        )
        project.save()

        return CreateProject(
            id = project.id,
            projectName = project.projectName,
            projectDesc = project.projectDesc
        )



# 
# class UpdateProject(graphene.Mutation):
#     id = graphene.Int()
#     projectName= graphene.Field(UserType)
#     projectDesc = graphene.String()
#     location = graphene.String()
#     profilePic = graphene.String()
#
#     class Arguments:
#         user = graphene.String(required= True)
#         empCode=graphene.String(required=True)
#         location=graphene.String(required=True)
#         profilePic=graphene.String(required=True)
#         invProjects=graphene.String(required=True)
#
#     def mutate(self, info,  user, empCode,location ,  profilePic, invProjects):
#         print(info)
#         print("ooooooooooooooo")
#         if(user != 'default'):
#             userInstance = get_user_model().objects.get(id = int(user))
#         else:
#             userInstance = info.context.user
#         profile = Profile.objects.get(user = userInstance)
#         if(empCode != 'default'):
#             profile.empCode = empCode
#         if(location != 'default'):
#             profile.location = location
#         if(profilePic != 'default'):
#             profile.profilePic = profilePic
#             print("set kar diyaaaaaaaaaa")
#         if(invProjects != 'default'):
#             print('see')
#             criteria = json.loads(invProjects)
#             inProjs = criteria["invProjects"]
#             print(inProjs)
#             print(len(inProjs))
#             print(profile.projectsInvolved.all())
#             piqs = profile.projectsInvolved.all()
#             for y in piqs:
#                 profile.projectsInvolved.remove(y)
#                 # profile.save()
#             for x in inProjs:
#                 p = Project.objects.get(id= int(x))
#                 profile.projectsInvolved.add(p)
#                 # profile.save()
#         profile.save()
#
#         return UpdateProfile(
#             id = profile.id,
#             user=  profile.user,
#             empCode = profile.empCode,
#             location = profile.location,
#             profilePic = profile.profilePic
#         )
#






class Mutation(graphene.ObjectType):
    create_project = CreateProject.Field()
