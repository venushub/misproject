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
      success : false,
      errorClassName : 'error-hide'
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }


  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.email !== '' && this.state.password !== '' && this.state.confirm_password !== ''){

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
            error : 'sorry that email is already taken',
            errorClassName : 'error-show'
          }, () => {
            setTimeout(() => this.setState({errorClassName : 'error-hide'}), 2000)
          })
        });
      } else {
        this.setState({
          error : 'Sorry your passwords havent matched',
          errorClassName : 'error-show'
        }, () => {
          setTimeout(() => this.setState({errorClassName : 'error-hide'}), 2000)
        })
      }
    } else {
      this.setState({
        error : 'Some fields are left Empty 🚫',
        errorClassName : 'error-show'
      }, () => {
        setTimeout(() => this.setState({errorClassName : 'error-hide'}), 2000)
      })

    }



  }


  render(){

    let myform = ''
    let content = ''

    myform =         <div className="login-container">
      <div className="login-info">
      <div  className="login-header-title">MAPI</div>
      <div className="login-title">Register</div>
      </div>
      <div className="login-form-div">
        <div className={this.state.errorClassName}>{this.state.error}</div>
        <div className="login-form">
          <label htmlFor="email" className="login-form-label">Email</label>
          <input className="login-input" type="text" id='email' name="loginEmail" onChange={this.handleChange} value={this.state.email} />
          <label  htmlFor="password" className="login-form-label">Password</label>
          <input className="login-input" type="password" id='password' name="loginPassword" onChange={this.handleChange} value={this.state.password} />
          <label  htmlFor="confirm_password" className="login-form-label">Confirm Password</label>
          <input className="login-input" type="password" id='confirm_password' name="loginPassword" onChange={this.handleChange} value={this.state.confirm_password} />
          <button onClick={this.handleSubmit} className="login-button">Register</button>
        </div>
      </div>
    </div>

    if(this.state.success){
      content = <div className="registration-success-container"><p>👏Registration Successful👏</p><Link className="register-link" to="/login">Login Here</Link></div>
    } else {
      content = myform
    }



    return(
      <div>
        {content}
      </div>
    )
  }

}

export default compose(
    graphql(createUserMutation, { name: "createUserMutation" })
)(Register);
