import graphene
from graphene_django import DjangoObjectType
from miscore.models import Project, ActivityType
import json


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
    projectPic = graphene.String()

    class Arguments:
        projectName = graphene.String(required= True)
        projectDesc =graphene.String(required=True)
        projectPic=graphene.String(required=True)
        invActTypes=graphene.String(required=True)


    def mutate(self, info, projectName, projectDesc,projectPic, invActTypes ):
        project = Project(
            projectName= projectName,
            projectDesc =projectDesc,
            projectPic = projectPic
        )

        project.save()

        projecth = Project.objects.get(projectName = projectName)

        criteria = json.loads(invActTypes)
        invATs = criteria["invActTypes"]

        for x in invATs:
            at = ActivityType.objects.get(id= int(x))
            projecth.activitiesInvolved.add(at)

        projecth.save()

        return CreateProject(
            id = project.id,
            projectName = project.projectName,
            projectDesc = project.projectDesc,
            projectPic = project.projectPic
        )


class UpdateProject(graphene.Mutation):
    id = graphene.Int()
    projectName= graphene.String()
    projectDesc = graphene.String()
    projectPic = graphene.String()

    class Arguments:
        project = graphene.String(required= True)
        projectDesc=graphene.String(required=True)
        projectPic=graphene.String(required=True)
        invActTypes=graphene.String(required=True)

    def mutate(self, info,  project, projectDesc, projectPic, invActTypes):
        print(info)
        print("ooooooooooooooo")
        if(project != 'default'):
            projectInstance = Project.objects.get(id = int(project))


        if(projectDesc != 'default'):
            projectInstance.projectDesc = projectDesc

        if(projectPic != 'default'):
            projectInstance.projectPic = projectPic
            print("set kar diyaaaaaaaaaa")
        if(invActTypes != 'default'):
            print('see')
            criteria = json.loads(invActTypes)
            invATs = criteria["invActTypes"]


            psi = projectInstance.activitiesInvolved.all()
            for y in psi:
                projectInstance.activitiesInvolved.remove(y)
                # profile.save()
            for x in invATs:
                at = ActivityType.objects.get(id= int(x))
                projectInstance.activitiesInvolved.add(at)
                # profile.save()
        projectInstance.save()

        return UpdateProject(
            id = projectInstance.id,
            projectName=  projectInstance.projectName,
            projectDesc = projectInstance.projectDesc,
            projectPic = projectInstance.projectPic
        )


class Mutation(graphene.ObjectType):
    create_project = CreateProject.Field()
    update_project = UpdateProject.Field()
