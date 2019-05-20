import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {getTokenMutation} from './queries/queries'


class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      email : '',
      password : ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    console.log(this.props)
    this.props.getTokenMutation({
        variables: {
            username: this.state.email,
            password: this.state.password,
        }
    }).then(res => {
      console.log(res)
      localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
    });
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>email</label>
          <input type="text" id='email' onChange={this.handleChange} value={this.state.email} />
          <label>password</label>
          <input type="password" id='password' onChange={this.handleChange} value={this.state.password} />
          <button>Login</button >
        </form>
      </div>
    )
  }


}

export default compose(
    graphql(getTokenMutation, { name: "getTokenMutation" })
)(Login);
