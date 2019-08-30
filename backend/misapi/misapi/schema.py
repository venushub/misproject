import graphene
import users.schema
import miscore.activitytype.schema
import miscore.activitytypeidentifier.schema
import miscore.project.schema
import miscore.activity.schema
import miscore.matcher.schema
import miscore.profile.schema
import miscore.costing.schema
import miscore.AttendanceFile.schema
import graphql_jwt


class Mutation(miscore.costing.schema.Mutation, miscore.activity.schema.Mutation, miscore.profile.schema.Mutation ,miscore.project.schema.Mutation , miscore.activitytypeidentifier.schema.Mutation , users.schema.Mutation, miscore.activitytype.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()



class Query(miscore.costing.schema.Query, miscore.profile.schema.Query, miscore.activity.schema.Query, miscore.matcher.schema.Query, miscore.AttendanceFile.schema.Query , miscore.activitytypeidentifier.schema.Query , miscore.project.schema.Query , miscore.activitytype.schema.Query ,  users.schema.Query ,graphene.ObjectType):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass



schema = graphene.Schema(query=Query, mutation=Mutation)
