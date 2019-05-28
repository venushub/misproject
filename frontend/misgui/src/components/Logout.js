import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {getTokenMutation} from './queries/queries'
import { Link , NavLink} from 'react-router-dom'


class Logout extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }
handlecancel =(e) =>{
e.preventDefault();
this.props.history.push('/activities')

}

  handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('cool-jwt')
    this.props.history.push('/login');
    window.location.reload();
  }


  render(){
    return(
      <div className="mycontent">
          <form className="login-form" onSubmit={this.handleSubmit}>
            <h2>Are you sure you want to logout</h2>
            <button className="login-button">Logout ♥</button >
            <button className="login-button" onClick={this.handlecancel}>Cancel</button >
        </form>
      </div>
    )
  }


}

export default Logout
