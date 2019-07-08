import graphene
from graphene_django import DjangoObjectType
from miscore.models import Project



class ProjectType(DjangoObjectType):
    class Meta:
        model = Project


class Query(object):
    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(self, info, **kwargs):
        print("the user currently logged in is", info.context.user)
        return Project.objects.all()


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



class Mutation(graphene.ObjectType):
    create_project = CreateProject.Field()
