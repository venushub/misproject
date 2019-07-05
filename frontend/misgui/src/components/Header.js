import React , {Component} from 'react'
import { Link , NavLink} from 'react-router-dom'
import { getUserName } from './helpers/getUserName';
import {getMe} from './queries/queries'
import { graphql, compose } from 'react-apollo';



class Header extends Component{

  constructor(props){
    super(props)

    this.state = {
      username : '',
      extradark : "rgb(40,55,71)",
      dark : "rgb(52,73,71)",
      light : "rgb(174,182,191)",
      extralight : "rgb(235,237,239)",
      showadminpanel : false
    }
  }

  componentDidMount(){

    const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false

    if(me.isSuperuser){
      this.setState({
        showadminpanel : true
      })
    }

    let mytheme = localStorage.getItem('theme');
    if(mytheme === "green") {

      console.log("greeeen")

      this.setState({
        extradark : "rgb(25,111,61)",
        dark : "rgb(34, 153, 84)",
        light : "rgb(169, 223,191)",
        extralight : "rgb(233, 247, 239)",
        // translight : "rgb(34, 153, 84,0.3)"
      })

    } else if (mytheme === "blue") {
      this.setState({
        extradark : "rgb(40,55,71)",
        dark : "rgb(52,73,71)",
        light : "rgb(174,182,191)",
        extralight : "rgb(235,237,239)",
        // translight : "rgb(52,73,71,0.3)"
      })
    } else if (mytheme === "red") {
      this.setState( {
        extradark : "rgb(146, 43, 33)",
        dark : "rgb(192, 57, 43)",
        light : "rgb(230, 176, 170)",
        extralight : "rgb(249, 235, 234)",
        // translight : "rgb(192, 57, 43, 0.3)"
      })
    } else if (mytheme === "yellow") {
      this.setState({
        extradark : "rgb(154, 125, 10)",
        dark : "rgb(212, 172, 13)",
        light : "rgb(249, 231, 159)",
        extralight : "rgb(254, 249, 231)",
        // translight : "rgb(212, 172, 13, 0.3)"
      })
    }



      const username = getUserName();
      this.setState({
        username : username
      })

  }

  componentDidUpdate(prevProps){
      if (this.props.getMe !== prevProps.getMe) {
        const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false
          if(me.isSuperuser){
            this.setState({
              showadminpanel : true
            })
          }
      }
  }


  render(){


    let adminpanelrender = null;
    if(this.state.showadminpanel){
      adminpanelrender = <NavLink className="Header-nav-item" to="/admintoolkit" activeStyle={{  fontWeight: "bold",  color: this.state.extralight}} >AdminSite</NavLink>

    }

    return(
      <div className="Header-div">
        <div className="bundle">
          <h1 className="header-title">MAPI</h1>
          <h1 className="header-username"> ({this.state.username})</h1>
        </div>
        <div>
          <NavLink className="Header-nav-item" to="/activities" activeStyle={{  fontWeight: "bold",  color: this.state.extralight}}>Activities</NavLink>
          <NavLink className="Header-nav-item" to="/dashboard" activeStyle={{  fontWeight: "bold",  color: this.state.extralight}} >Dashboard</NavLink>
          <NavLink className="Header-nav-item" to="/matcher" activeStyle={{  fontWeight: "bold",  color: this.state.extralight}} >Matcher</NavLink>
          {adminpanelrender}
          <NavLink className="Header-nav-item" to="/settings" activeStyle={{  fontWeight: "bold",  color: this.state.extralight}} >Settings</NavLink>
        </div>
      </div>
    )
  }
}


export default compose(
    graphql(getMe, {name : "getMe"}),
  )(Header)
