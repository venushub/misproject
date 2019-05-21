import React, {Component} from 'react' ;
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Bugs from './Bugs'
import AuthenticatedComponent from './AuthenticatedComponent'
import Activities from './Activities'

class App extends Component {
  render(){
    return(
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/bugs" exact component={Bugs} />
          <Route path="/AuthenticatedComponent" exact component={AuthenticatedComponent} />
          <Route path="/activities" exact component={Activities} />
        </Switch>
    )
  }
}

export default App
