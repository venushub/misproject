import React , {Component} from 'react'
import { Link , NavLink} from 'react-router-dom'
import { getUserName } from './helpers/getUserName';



class Header extends Component{

  constructor(props){
    super(props)

    this.state = {
      username : ''
    }
  }

  componentDidMount(){
      const username = getUserName();
      this.setState({
        username : username
      })
  }

  render(){
    return(
      <div className="Header-div">
      <div className="bundle">

        <h1>   ⌛ {this.state.username}</h1>
        </div>
        <div>

        <NavLink className="Header-nav-item" to="/activities" activeStyle={{  fontWeight: "bold",  color: "#f7a0a0"}} >Activities</NavLink>
        <NavLink className="Header-nav-item" to="/logout" activeStyle={{  fontWeight: "bold",  color:"#f7a0a0"}} >Logout</NavLink>
        </div>
      </div>
    )
  }
}


export default Header
