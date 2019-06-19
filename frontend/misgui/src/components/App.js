import React, {Component} from 'react' ;
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import AuthenticatedComponent from './AuthenticatedComponent'
import ActivitiesN from './ActivitiesN'
import Register from './Register'
import Logout from './Logout'
import Dashboard from './Dashboard'
import GanttPoc from './GanttPoc'
import Settings from './Settings'


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      color : "orange"
    }
  }

  handleTheme = () => {
    console.log("theme coming")
  }


  render(){
    document.documentElement.style.setProperty('--main-bg-color', this.state.color);
    return(
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Home} />
          <Route path="/gantt" component={GanttPoc} />


          <AuthenticatedComponent>
            <Route path="/activities" exact  render={(props) => <ActivitiesN {...props} handleTheme={this.handleTheme} />} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/settings" exact component={Settings} />

          </AuthenticatedComponent>
        </Switch>
    )
  }
}

export default App
