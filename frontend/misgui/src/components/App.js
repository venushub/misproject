import React, {Component} from 'react' ;
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Bugs from './Bugs'

class App extends Component {
  render(){
    return(
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/bugs" exact component={Bugs} />
        </Switch>
    )
  }
}

export default App
