import React , {Component} from 'react'
import {Router, Switch, Route} from 'react-router-dom'
import { Link , NavLink} from 'react-router-dom'
import Logout from './Logout'
import Theme from './Theme'


class Settings extends Component {

  constructor(props){
    super(props)



  }




  render(){

    return(
      <div className="settings-container">
      <Logout />
      <Theme />
      </div>
    )

  }


}

export default Settings
