import graphene
from graphene_django import DjangoObjectType
from miscore.models import Profile
from django.contrib.auth import get_user_model
from users.schema import UserType

class ProfileType(DjangoObjectType):
    class Meta:
        model = Profile


class Query(object):
    all_profiles = graphene.List(ProfileType)

    def resolve_all_profiles(self, info, **kwargs):
        return Profile.objects.all()


class UpdateProfile(graphene.Mutation):
    id = graphene.Int()
    user= graphene.Field(UserType)
    empCode = graphene.String()
    location = graphene.String()
    profilePic = graphene.String()

    class Arguments:
        user = graphene.String(required= True)
        empCode=graphene.String(required=True)
        location=graphene.String(required=True)
        profilePic=graphene.String(required=True)


    def mutate(self, info,  user, empCode,location ,  profilePic):
        print(info)

        if(user != 'default'):
            userInstance = get_user_model().objects.get(id = int(user))
        else:
            userInstance = info.context.user
        profile = Profile.objects.get(user = userInstance)
        if(empCode != 'default'):
            profile.empCode = empCode
        if(location != 'default'):
            profile.location = location
        if(profilePic != 'default'):
            profile.profilePic = profilePic

        profile.save()

        return UpdateProfile(
            id = profile.id,
            user=  profile.user,
            empCode = profile.empCode,
            location = profile.location,
            profilePic = profile.profilePic
        )



class Mutation(graphene.ObjectType):
    update_profile = UpdateProfile.Field()
