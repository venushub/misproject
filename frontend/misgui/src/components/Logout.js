import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {getTokenMutation} from './queries/queries'
import { Link , NavLink, withRouter} from 'react-router-dom'
import client from '../index.js'
import Header from './Header'


class Logout extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('cool-jwt')
    localStorage.removeItem('username')
    client.clearStore()
    this.props.history.push('/login');
  }


  render(){
    return(
      <div className="logout-container">

            <div className="flex-this-row">
            <h2>Are you sure you want to </h2>
            <button onClick={this.handleSubmit} className="logout-button">Logout ♥</button ></div>
      </div>
    )
  }

}

export default withRouter(Logout)
