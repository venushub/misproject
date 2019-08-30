import graphene
from graphene_django import DjangoObjectType
from miscore.models import CostingPerHour
import json
from users.schema import UserType
from django.contrib.auth import get_user_model


class CostingPerHourType(DjangoObjectType):
    class Meta:
        model = CostingPerHour


class Query(object):
    all_costings = graphene.List(CostingPerHourType)
    # all_projects_for_user = graphene.List(ProjectType)

    def resolve_all_costings(self, info, **kwargs):
        print("the user currently logged in is", info.context.user)
        return CostingPerHour.objects.all()


class CreateCostingPerHour(graphene.Mutation):
    id = graphene.Int()
    user = graphene.Field(UserType)
    date = graphene.String()
    amount = graphene.Float()

    class Arguments:
        user = graphene.String(required= True)
        date = graphene.String(required=True)
        amount = graphene.String(required=True)


    def mutate(self, info, user, date,amount):
        userInstance = get_user_model().objects.get(id = int(user))
        amount_in = float(amount)
        costing = CostingPerHour(
            user= userInstance,
            date =date,
            amount = amount_in
        )

        costing.save()

        return CreateCostingPerHour(
            id = costing.id,
            user = costing.user,
            date = costing.date,
            amount = costing.amount
        )


class UpdateCostingPerHour(graphene.Mutation):
    id = graphene.Int()
    user = graphene.Field(UserType)
    date = graphene.String()
    amount = graphene.Float()

    class Arguments:
        costingId = graphene.String(required=True)
        date = graphene.String(required=True)
        amount = graphene.String(required=True)

    def mutate(self, info,  costingId, date, amount):
        # print(info)
        # print("ooooooooooooooo")

        costingInstance = CostingPerHour.objects.get(id = int(costingId))

        costingInstance.date = date
        costingInstance.amount = float(amount)

        costingInstance.save()

        return UpdateCostingPerHour(
            id = costingInstance.id,
            date = costingInstance.date,
            amount = costingInstance.amount
        )


class Mutation(graphene.ObjectType):
    create_costing_per_hour = CreateCostingPerHour.Field()
    update_costing_per_hour = UpdateCostingPerHour.Field()
