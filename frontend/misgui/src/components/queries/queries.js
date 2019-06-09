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
  }
}
`

const getUsersQuery = gql`
{
  users {
    id
    username
  }
}
`



const getActivityTypesQuery = gql`
{
  allActivityTypes {
    id
    activityTypeName
  }
}
`


const getActivityTypeIdentifiersQuery = gql`
  query allActivityTypeIDentifiers($search : String){
    allActivityTypeIdentifiers(search : $search){
      id
      activityTypeIdentifierName
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
      mutation createActivity($activityProjectArg: String!, $activityTypeArg: String!, $activityTypeIdentifierArg: String!, $activityDescriptionArg: String!, $activityStartTimeArg: String!, $activityEndTimeArg: String!, $activityMutateOrUpdateArg : String!){
         createActivity(activityProjectArg: $activityProjectArg, activityTypeArg: $activityTypeArg, activityTypeIdentifierArg : $activityTypeIdentifierArg, activityDescriptionArg: $activityDescriptionArg, activityStartTimeArg : $activityStartTimeArg, activityEndTimeArg: $activityEndTimeArg, activityMutateOrUpdateArg : $activityMutateOrUpdateArg){
            activityDescription
        }
    }
`;


const updateActivityMutation = gql`
      mutation updateActivity($activityProjectArg: String!, $activityTypeArg: String!, $activityTypeIdentifierArg: String!, $activityDescriptionArg: String!, $activityStartTimeArg: String!, $activityEndTimeArg: String!, $activityMutateOrUpdateArg : String!){
         updateActivity(activityProjectArg: $activityProjectArg, activityTypeArg: $activityTypeArg, activityTypeIdentifierArg : $activityTypeIdentifierArg, activityDescriptionArg: $activityDescriptionArg, activityStartTimeArg : $activityStartTimeArg, activityEndTimeArg: $activityEndTimeArg, activityMutateOrUpdateArg : $activityMutateOrUpdateArg){
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

export {getTokenMutation, verifyTokenMutation, getActivitiesQuery, getUsersQuery ,createUserMutation, createActivityMutation, getProjectsQuery, getActivityTypesQuery, getActivityTypeIdentifiersQuery, getActivitiesForWeekQuery, createActivityTypeIdentifierMutation,updateActivityMutation};
