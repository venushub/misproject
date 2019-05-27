import React from 'react'
import { Link , NavLink} from 'react-router-dom'

const Header = () => {
  return(
    <div className="Header-div">
      <img className="header-icon" src={require('../images/fruit_strawberry.png')}  />
      <div>
      <NavLink className="Header-nav-item" to="/activities" activeStyle={{  fontWeight: "bold",  color: "#f7a0a0"}} >Activities</NavLink>
      <NavLink className="Header-nav-item" to="/profile" activeStyle={{  fontWeight: "bold",  color:"#f7a0a0"}} >Profile</NavLink>
      <NavLink className="Header-nav-item" to="/logout" activeStyle={{  fontWeight: "bold",  color:"#f7a0a0"}} >Logout</NavLink>
      </div>
    </div>
  )
}

export default Header
