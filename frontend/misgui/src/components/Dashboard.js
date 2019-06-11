import React, {Component} from 'react'
import Header from './Header'
import Filter from './Filter'

class Dashboard extends Component {

  constructor(props){
    super(props)

  }

  render(){


    return(
      <div className="dashboard-container">
      <Header />
      <Filter />
      </div>
    )
  }

}

export default Dashboard
