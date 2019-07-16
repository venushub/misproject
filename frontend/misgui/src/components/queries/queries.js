import {gql} from 'apollo-boost'


// const getBugsQuery = gql`
// {
//   allBugs {
//     id
//     bugId
//   }
// }
// `


// const getProjectsQuery = gql`
// {
//   allProjects {
//     id
//     projectName
//     projectDesc
//   }
// }
// `


const getProjectsQuery = gql`
{
  allProjects {
    id
    projectName
    projectDesc
    projectPic
    activitiesInvolved{
      id
      activityTypeName
    }
  }
}
`

const createProject = gql`
      mutation createProject($projectName: String!, $projectDesc: String!, $projectPic: String!, $invActTypes: String!){
         createProject(projectName: $projectName, projectDesc: $projectDesc, projectPic: $projectPic, invActTypes : $invActTypes){
            projectDesc
        }
    }
`;


const createActivityType = gql`
      mutation createActivityType($activityTypeName: String!, $activityTypeDesc: String!, $activityTypeRequired: String!){
         createActivityType(activityTypeName: $activityTypeName, activityTypeDesc: $activityTypeDesc, activityTypeRequired: $activityTypeRequired){
            activityTypeName
        }
    }
`;

const updateActivityType = gql`
      mutation updateActivityType($activityType: String!, $activityTypeDesc: String!, $activityTypeRequired: String!){
         updateActivityType(activityType: $activityType, activityTypeDesc: $activityTypeDesc, activityTypeRequired: $activityTypeRequired){
            activityTypeName
        }
    }
`;


const getProfilesQuery = gql`
{
  allProfiles {
    id
    empCode
    user{
      id
      username
    }
    projectsInvolved{
      id
      projectName
    }
    profilePic
  }
}
`

const getProfileQuery = gql`
  query myProfile($user : String){
    myProfile(user : $user){
      empCode
      location
      projectsInvolved{
        id
        projectName
      }
      profilePic
    }
  }
`

const updateProfile = gql`
      mutation updateProfile($user: String!, $empCode: String!, $location: String!, $profilePic: String!, $invProjects: String!){
         updateProfile(user: $user, empCode: $empCode, location : $location, profilePic: $profilePic, invProjects : $invProjects){
            empCode
        }
    }
`;


const updateProject = gql`
      mutation updateProject($project: String!, $projectDesc: String!, $projectPic: String!, $invActTypes: String!){
         updateProject(project: $project, projectDesc: $projectDesc, projectPic: $projectPic, invActTypes : $invActTypes){
            projectDesc
        }
    }
`;


const getAttendanceQuery = gql`
  query allAttendance($criteria : String){
    allAttendance(criteria : $criteria){
      id
      totalHours
    }
  }
`





const getAttendanceFilesQuery = gql`
{
  allAttendanceFiles {
    year
    month
    fileName
    timeOfUpload
  }
}
`

// const getOneAttendanceFileQuery = gql`
//   query allActivityTypeIdentifiers($search : String){
//     allActivityTypeIdentifiers(search : $search){
//       id
//       activityTypeIdentifierName
//       activityType{
//         activityTypeName
//       }
//     }
//   }
// `


const getUsersQuery = gql`
{
  users {
    id
    username
  }
}
`

const getMe = gql`
{
  me {
    id
    username
    isSuperuser
  }
}
`

const getActivityTypesQuery = gql`
{
  allActivityTypes {
    id
    activityTypeName
    activityTypeDesc
    activityTypeRequired
  }
}
`

const getActivityTypeIdentifiersQuery = gql`
  query allActivityTypeIdentifiers($search : String){
    allActivityTypeIdentifiers(search : $search){
      id
      activityTypeIdentifierName
      activityType{
        activityTypeName
      }
    }
  }
`



const getActivitiesForWeekQuery = gql`
  query allActivitiesForWeek($search : String){
    allActivitiesForWeek(search : $search){
      id
      activityProject {
        projectName
        id
      }
      activityUser {
        username
      }
      activityType {
        activityTypeName
        id
      }
      activityTypeIdentifier{
        activityTypeIdentifierName
        id
        activityTypeIdentifierSubCat
      }
      activityDescription
      activityStartTime
      activityEndTime
      activityHours
    }
  }
`


const getActivitiesForMonthQuery = gql`
  query allActivitiesForMonth($criteria : String){
    allActivitiesForMonth(criteria : $criteria){
      id
      activityProject {
        projectName
        id
      }
      activityUser {
        username
      }
      activityType {
        activityTypeName
        id
      }
      activityTypeIdentifier{
        activityTypeIdentifierName
        id
        activityTypeIdentifierSubCat
      }
      activityDescription
      activityStartTime
      activityEndTime
      activityHours
    }
  }
`








const getActivitiesForFilterQuery = gql`
  query allActivitiesForFilter($search : String){
    allActivitiesForFilter(search : $search){
      id
      activityProject {
        projectName
        id
      }
      activityUser {
        username
      }
      activityType {
        activityTypeName
        id
      }
      activityTypeIdentifier{
        activityTypeIdentifierName
        id
        activityTypeIdentifierSubCat
      }
      activityDescription
      activityStartTime
      activityEndTime
      activityHours
    }
  }
`


const getActivitiesQuery = gql`
{
  allActivities {
    id
    activityProject {
      projectName
      id
    }
    activityUser {
      username
    }
    activityType {
      activityTypeName
      id
    }
    activityTypeIdentifier{
      activityTypeIdentifierName
      id
      activityTypeIdentifierSubCat
    }
    activityDescription
    activityStartTime
    activityEndTime
    activityHours
  }
}
`


const getTokenMutation = gql`
    mutation tokenAuth($username: String!, $password: String!){
        tokenAuth(username: $username, password: $password){
            token
        }
    }
`;


const createActivityMutation = gql`
      mutation createActivity($activityProjectArg: String!, $activityTypeArg: String!, $activityTypeIdentifierArg: String!, $activityDescriptionArg: String!, $activityStartTimeArg: String!, $activityEndTimeArg: String!, $activityMutateOrUpdateArg : String!, $activityHoursArg : String!){
         createActivity(activityProjectArg: $activityProjectArg, activityTypeArg: $activityTypeArg, activityTypeIdentifierArg : $activityTypeIdentifierArg, activityDescriptionArg: $activityDescriptionArg, activityStartTimeArg : $activityStartTimeArg, activityEndTimeArg: $activityEndTimeArg, activityMutateOrUpdateArg : $activityMutateOrUpdateArg, activityHoursArg : $activityHoursArg){
            activityDescription
        }
    }
`;


const updateActivityMutation = gql`
      mutation updateActivity($activityProjectArg: String!, $activityTypeArg: String!, $activityTypeIdentifierArg: String!, $activityDescriptionArg: String!, $activityStartTimeArg: String!, $activityEndTimeArg: String!, $activityMutateOrUpdateArg : String! , $activityHoursArg : String!){
         updateActivity(activityProjectArg: $activityProjectArg, activityTypeArg: $activityTypeArg, activityTypeIdentifierArg : $activityTypeIdentifierArg, activityDescriptionArg: $activityDescriptionArg, activityStartTimeArg : $activityStartTimeArg, activityEndTimeArg: $activityEndTimeArg, activityMutateOrUpdateArg : $activityMutateOrUpdateArg, , activityHoursArg : $activityHoursArg){
            activityDescription
        }
    }
`;



const createActivityTypeIdentifierMutation = gql`
      mutation createActivityTypeIdentifier($activityType: String!, $activityTypeIdentifierName: String!, $activityTypeIdentifierSubCat: String!){
         createActivityTypeIdentifier(activityType: $activityType, activityTypeIdentifierName: $activityTypeIdentifierName, activityTypeIdentifierSubCat: $activityTypeIdentifierSubCat){
            id
            activityTypeIdentifierName
            activityTypeIdentifierSubCat
        }
    }
`;



const verifyTokenMutation = gql`
    mutation verifyToken($token: String!){
        verifyToken(token: $token){
            payload
        }
    }
`;


const createUserMutation = gql`
  mutation createUser($username: String!, $password: String!){
    createUser(username: $username, password: $password){
      user{
        username
        email
      }
    }
  }
`;




// const addBookMutation = gql`
//
//   mutation($username:String!, $password:String!) {
//     tokenAuth(username:$name,genre:$genre,authorId:$authorId){
//       name
//       id
//     }
//   }
// `

export {getTokenMutation, getMe, createActivityType ,updateActivityType , createProject , updateProject ,getProfilesQuery ,getProfileQuery,updateProfile, getAttendanceQuery ,getAttendanceFilesQuery , getActivitiesForMonthQuery  , verifyTokenMutation, getActivitiesQuery, getActivitiesForFilterQuery ,getUsersQuery ,createUserMutation, createActivityMutation, getProjectsQuery, getActivityTypesQuery, getActivityTypeIdentifiersQuery, getActivitiesForWeekQuery, createActivityTypeIdentifierMutation,updateActivityMutation};
