import React, {Component} from 'react' ;
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import AuthenticatedComponent from './AuthenticatedComponent'
import ActivitiesN from './ActivitiesN'
import Register from './Register'
import Logout from './Logout'
import Dashboard from './Dashboard'

class App extends Component {
  render(){
    return(
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Home} />

          <AuthenticatedComponent>
            <Route path="/activities" exact component={ActivitiesN} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/logout" exact component={Logout} />
          </AuthenticatedComponent>
        </Switch>
    )
  }
}

export default App
