import React , {Component} from 'react'
import {Router, Switch, Route} from 'react-router-dom'
import { Link , NavLink} from 'react-router-dom'
import Logout from './Logout'
import Theme from './Theme'
import Header from './Header'
import ProfilePic from './ProfilePic'
import {getMe} from './queries/queries'
import { graphql, compose } from 'react-apollo';


class Settings extends Component {

  constructor(props){
    super(props)

    this.state = {
      username : ''
    }

  }


  componentDidMount(){

    const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false

    if(me.isSuperuser){
      this.setState({
        username : me.id
      })
    }
  }

  componentDidUpdate(prevProps){
      if (this.props.getMe !== prevProps.getMe) {
        const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false
          if(me.isSuperuser){
            this.setState({
              username : me.id
            })
          }
      }
  }



  render(){

    console.log("dddddddddddd", this.props)

    return(
      <div className="settings-container">
        <Header />
        <ProfilePic user={this.state.username}/>
        <Theme />
        <Logout />
      </div>
    )

  }
}



export default compose(
  graphql(getMe, {name : "getMe"}),
)(Settings)
