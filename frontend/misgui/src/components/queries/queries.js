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
      activityTypeIdentifierName
    }
  }
`




const getActivitiesQuery = gql`
{
  allActivities {
    activityProject {
      projectName
    }
    activityType {
      activityTypeName
    }
    activityTypeIdentifier{
      activityTypeIdentifierName
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
    mutation createActivity($activityProjectArg: String!, $activityTypeArg: String!, $activityTypeIdentifierArg: String!, $activityDescriptionArg: String!, $activityStartTimeArg: String!, $activityEndTimeArg: String!){
        createActivity(activityProjectArg: $activityProjectArg, activityTypeArg: $activityTypeArg, activityTypeIdentifierArg : $activityTypeIdentifierArg, activityDescriptionArg: $activityDescriptionArg, activityStartTimeArg : $activityStartTimeArg, activityEndTimeArg: $activityEndTimeArg){
            activityDescription
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

export {getTokenMutation, verifyTokenMutation, getActivitiesQuery, createUserMutation, createActivityMutation, getProjectsQuery, getActivityTypesQuery, getActivityTypeIdentifiersQuery};
