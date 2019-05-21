import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {verifyTokenMutation} from './queries/queries'
import { getToken } from './helpers/getToken';

class AuthenticatedComponent extends Component {
  constructor(props){
    super(props)

  this.state = {
    user : undefined
  };

}

componentDidMount(){

  const token = getToken();
  this.props.verifyTokenMutation({
    variables : {
      token : token
    }
  }).then(res => console.log(res)).catch(err => {
     this.props.history.push('/login');
  })
}

render(){
  return(
    <div>kya chalre</div>
  )
}

}

export default compose(
    graphql(verifyTokenMutation, { name: "verifyTokenMutation" })
)(AuthenticatedComponent);
