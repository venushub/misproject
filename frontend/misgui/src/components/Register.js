import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {createUserMutation} from './queries/queries'
import { Link , NavLink} from 'react-router-dom'


class Register extends Component {
  constructor(props){
    super(props)

    this.state = {
      email : '',
      password : '',
      confirm_password : '',
      error : '',
      success : false
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
handleback =(e)=>
{
  
  this.props.history.push('/login');
}

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    console.log(this.props)

    if(this.state.password === this.state.confirm_password) {

      this.props.createUserMutation({
          variables: {
              username: this.state.email,
              password: this.state.password,
          }
      }).then(res => {
        console.log(res)
        this.setState({
          success : true
        })
      }).catch(err => {
        this.setState({
          error : 'sorry that email is already taken'
        })
      });

    } else {
      this.setState({
        error : 'Sorry your passwords havent matched'
      })
    }

  }
   

  render(){

    let myform = ''
    let content = ''

    myform =       <form className ="login-form"  onSubmit={this.handleSubmit}>
            < img  className="loginimg" src={require('../images/loginicon.png')}/>
            <label className="form-input-label">E-Mail</label>
            <input className="form-input" type="text" id='email'  onChange={this.handleChange} value={this.state.email} />
            <label className="form-input-label">Password</label>
            <input className="form-input" type="password" id='password'  onChange={this.handleChange} value={this.state.password} />
            <label className="form-input-label">Confirm Password</label>
            <input className="form-input" type="password" id='confirm_password' onChange={this.handleChange} value={this.state.confirm_password} />
            <button className="login-button">Register</button >
            <button className="login-button" onClick={this.handleback}>back</button >
            {this.state.error}
          </form>

    if(this.state.success){
      content = <div><p>Registration Successful</p><Link className="register-link" to="/login">Login Here</Link></div>
    } else {
      content = myform
    }



    return(
      <div className="mycontent">
        {content}
      </div>
    )
  }

}

export default compose(
    graphql(createUserMutation, { name: "createUserMutation" })
)(Register);
