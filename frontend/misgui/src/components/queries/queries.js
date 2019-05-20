import {gql} from 'apollo-boost'


const getBugsQuery = gql`
{
  allBugs {
    id
    bugId
  }
}
`

const getTokenMutation = gql`
    mutation TokenAuth($username: String!, $password: String!){
        tokenAuth(username: $username, password: $password){
            token
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

export {getBugsQuery, getTokenMutation};
