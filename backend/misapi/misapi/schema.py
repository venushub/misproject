import graphene
import miscore.schema
import miscore.users.schema
import miscore.bugs.schema
import miscore.activitytype.schema
import miscore.activity.schema



class Mutation(miscore.activity.schema.Mutation, miscore.users.schema.Mutation, miscore.bugs.schema.Mutation, miscore.activitytype.schema.Mutation, graphene.ObjectType):
    pass


class Query(miscore.activity.schema.Query, miscore.bugs.schema.Query,miscore.activitytype.schema.Query , graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass



schema = graphene.Schema(query=Query, mutation=Mutation)
