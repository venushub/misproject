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
          <label>Name</label>
          <input type="text" id='name' placeholder="Enter Name" onChange={this.handleChange} value={this.state.name} />
          <label>E-Mail</label>
          <input type="text" id='email' placeholder ="Enter E-mail" onChange={this.handleChange} value={this.state.email} />
          <label>Password</label>
          <input type="password" id='password'  placeholder="Enter Password" onChange={this.handleChange} value={this.state.password} />
          <label>Confirm Password</label>
          <input type="password" id='confirm_password' placeholder="Re-enter Password" onChange={this.handleChange} value={this.state.confirm_password} />
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
