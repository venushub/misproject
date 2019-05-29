import React, {Component} from 'react'
import Header from './Header'
import ActivitiesListN from './ActivitiesListN'
import { graphql, compose } from 'react-apollo';
import {getActivitiesQuery} from './queries/queries'
import ActivityFormN from './ActivityFormN'

class ActivitiesN extends Component {
  constructor(props){
    super(props)

    this.state = {
      editId : {}
    }
  }

  handleReturnSubmit = () => {
    this.props.getActivitiesQuery.refetch()
  }

  handleLP = (activity) => {
    console.log(activity)
    this.setState({
      editId : activity
    })
  }



  render(){
    console.log(this.state.editId)
    return(
      <div className="activities-container">
        <Header />
        <ActivityFormN handleReturnSubmit={this.handleReturnSubmit} editOption={this.state.editId} />
        <ActivitiesListN activities={this.props.getActivitiesQuery.allActivities} handleLP={this.handleLP} />
      </div>
    )
  }


}





export default compose(
    graphql(getActivitiesQuery, { name: "getActivitiesQuery" }),
)(ActivitiesN);
