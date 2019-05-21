import {gql} from 'apollo-boost'


const getBugsQuery = gql`
{
  allBugs {
    id
    bugId
  }
}
`

const getActivitiesQuery = gql`
{
  allActivities {
    activityType {
      activityTypeName
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

const verifyTokenMutation = gql`
    mutation verifyToken($token: String!){
        verifyToken(token: $token){
            payload
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

export {getBugsQuery, getTokenMutation, verifyTokenMutation, getActivitiesQuery};
