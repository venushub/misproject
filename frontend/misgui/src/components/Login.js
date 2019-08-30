import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {getTokenMutation} from './queries/queries'
import { Link , NavLink} from 'react-router-dom'


class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      loginEmail : '',
      loginPassword : '',
      error : '',
      errorClassName : 'error-hide'
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  handleSubmit = (e) => {

  e.preventDefault();

    if(this.state.loginEmail !== '' && this.state.loginPassword !== ''){
      // console.log(this.state)
      // console.log(this.props)
      this.props.getTokenMutation({
          variables: {
              username: this.state.loginEmail,
              password: this.state.loginPassword,
          }
      }).then(res => {
        // console.log(res)
        localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
        localStorage.setItem('username', this.state.loginEmail)
        this.props.history.push('/activities');

      }).catch(err => {
        this.setState({
          error : 'Invalid Credentials 🚫',
          errorClassName : 'error-show'
        }, () => {
          setTimeout(() => this.setState({errorClassName : 'error-hide'}), 2000)
        })
        console.log("error aya")
      });
    } else {
      this.setState({
        error : 'login or Password is Empty 🚫',
        errorClassName : 'error-show'
      }, () => {
        setTimeout(() => this.setState({errorClassName : 'error-hide'}), 2000)
      })
    }
  }

  
  render(){
    return(
      <div className="login-container">
        <div className="login-info">
        <div  className="login-header-title">MAPI</div>
        <div className="login-title">Login</div>
        </div>
        <div className="login-form-div">
          <div className={this.state.errorClassName}>{this.state.error}</div>
          <div className="login-form">
            <label htmlFor="loginEmail" className="login-form-label">Email</label>
            <input className="login-input" type="text" id='loginEmail' name="loginEmail" onChange={this.handleChange} value={this.state.loginEmail} />
            <label  htmlFor="loginPassword" className="login-form-label">Password</label>
            <input className="login-input" type="password" id='loginPassword' name="loginPassword" onChange={this.handleChange} value={this.state.loginPassword} />
            <button onClick={this.handleSubmit} className="login-button">Login</button>
          </div>
          <div className="register-here-text"><Link className="nav-link" to="/register">New Users Register Here</Link></div>
        </div>
      </div>
    )
  }

}


export default compose(
    graphql(getTokenMutation, { name: "getTokenMutation" })
)(Login);
