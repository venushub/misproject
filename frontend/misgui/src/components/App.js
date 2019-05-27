import React, {Component} from 'react' ;
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import AuthenticatedComponent from './AuthenticatedComponent'
import Activities from './Activities'
import Register from './Register'
import Logout from './Logout'

class App extends Component {
  render(){
    return(
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/" exact component={Home} />

          <AuthenticatedComponent>

            <Route path="/activities" exact component={Activities} />
            <Route path="/logout" exact component={Logout} />

          </AuthenticatedComponent>
        </Switch>
    )
  }
}

export default App