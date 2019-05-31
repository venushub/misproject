import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {getTokenMutation} from './queries/queries'
import { Link , NavLink} from 'react-router-dom'


class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      email : '',
      password : '',
      error : ''
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
      localStorage.setItem('username', this.state.email)
      this.props.history.push('/activities');
    }).catch(err => {
      this.setState({
        error : 'Invalid Credentials'
      })
      console.log("error aya")
    });
  }


  render(){

    let errorprone = ''

    if(this.state.error === ''){
      errorprone = <p></p>
    } else {
      errorprone = <p>{this.state.error}</p>
    }

    return(
      <div className="mycontent">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <img className="loginimg" src={require('../images/fruit_mango.png')}  />
            <label className="form-input-label">email</label>
            <input className="form-input" type="text" id='email' onChange={this.handleChange} value={this.state.email} />
            <label className="form-input-label">password</label>
            <input className="form-input" type="password" id='password' onChange={this.handleChange} value={this.state.password} />
            <button className="login-button">Login</button >
            <Link className="register-link" to="/register">New User Register Here</Link>
            {errorprone}
        </form>
      </div>
    )
  }


}

export default compose(
    graphql(getTokenMutation, { name: "getTokenMutation" })
)(Login);
