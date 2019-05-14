import graphene

import miscore.schema
import miscore.users.schema


class Mutation(miscore.users.schema.Mutation, graphene.ObjectType,):
    pass



class Query(miscore.schema.Query, graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
