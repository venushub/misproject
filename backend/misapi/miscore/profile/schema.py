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
    my_profile = graphene.Field(ProfileType, user=graphene.String())

    def resolve_all_profiles(self, info, **kwargs):
        return Profile.objects.all()

    def resolve_my_profile(self, info, user, **kwargs):
        #my_criteria = json.loads(search)
        print("error idhar heiiiiii")
        print(user)
        userInstance = get_user_model().objects.filter(id = user)[0]
        return Profile.objects.get(user = userInstance.id)


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
        print("ooooooooooooooo")
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
            print("set kar diyaaaaaaaaaa")

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
