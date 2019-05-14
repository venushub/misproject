import graphene

import miscore.schema
import misapi.users.schema



class Mutation(misapi.users.schema.Mutation, graphene.ObjectType,):
    pass



class Query(miscore.schema.Query, graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)