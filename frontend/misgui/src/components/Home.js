import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {getTokenMutation} from './queries/queries'


class Home extends Component {
  constructor(props){
    super(props)

    this.state = {
      name : '',
      email : '',
      password : '',
      confirm_password : '',
      submit : ''
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
            user: this.state.name,
            username: this.state.email,
            password: this.state.password,
            password: this.state.confirm_password,
            submit : this.state.submit
        }
    }).then(res => {
      console.log(res)
      localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
    });
  }

  render(){
    return(
      <div className = "registration_content" >
        <form className ="registration-form  thicker "  onSubmit={this.handleSubmit}>
         < img  className="img"src={require('../Images/signup.png')}/>
          <label className="form-input-label">Name</label>
          <input className="form-input" type ="text" id='name'  onChange={this.handleChange} value={this.state.name} />
          <label className="form-input-label">E-Mail</label>
          <input className="form-input" type="text" id='email'  onChange={this.handleChange} value={this.state.email} />
          <label className="form-input-label">Password</label>
          <input className="form-input" type="password" id='password'  onChange={this.handleChange} value={this.state.password} />
          <label className="form-input-label">Confirm Password</label>
          <input className="form-input" type="password" id='confirm_password' onChange={this.handleChange} value={this.state.confirm_password} />
          <button className="submit-button">Login</button >
          <button className="cancel-button">Cancel</button>

        </form>
      </div>
    )
  }


}

export default compose(
    graphql(getTokenMutation, { name: "getTokenMutation" })
)(Home);
