import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {getTokenMutation} from './queries/queries'


class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      email : '',
      password : '',
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }


  handleSignupclick =(e) =>{
    e.preventDefault();
    console.log("OK")
    this.props.history.push("/")
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
      <div className="mycontent">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <img className="loginimg" src={require('../Images/loginicon.png')}  />
            <label className="form-input-label"  for= "email">E-mail</label>
            <input className="form-input" type="text" id='email'onChange={this.handleChange} name ="email" value={this.state.email} />
            <label className="form-input-label">Password</label>
            <input className="form-input" type="password" id='password'   onChange={this.handleChange} value={this.state.password} />
            <button className="login-button">Sign-in</button >
            <button className="signup-button" onClick={this.handleSignupclick} >Sign-up</button >
            <span class="psw">Forgot <a href="#">password?</a></span>
        </form>
      </div>
    )
  }


}

export default compose(
    graphql(getTokenMutation, { name: "getTokenMutation" })
)(Login);
