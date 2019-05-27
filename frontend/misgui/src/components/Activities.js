import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {getActivitiesQuery, createActivityMutation, getProjectsQuery} from './queries/queries'
import Header from './Header'
import ActivityForm from './ActivityForm'
import ActivitiesList from './ActivitiesList'

class Activities extends Component {

  constructor(props){
    super(props)

    this.state = {
      display_form : false,
      button_content : 'Add Activity +',
      activities : this.props.getActivitiesQuery.allActivities
    }
  }

  handleDisplayForm = () => {
    if(!this.state.display_form){
    this.setState({
      display_form : true,
      button_content : 'Cancel'
    })
  } else {
    this.setState({
      display_form : false,
      button_content : 'Add Activity +'
    })
  }
  }



  render() {

    console.log("mmmmmmmmm", this.props.getActivitiesQuery.allActivities)
    console.log("ye kya hei", this.state.activities)

    let my_form = null
    if(this.state.display_form){
      my_form = <ActivityForm />
    }

    let button_class = ''
    if(this.state.display_form){
      button_class = "cancel-button"
    } else {
      button_class = "login-button"
    }



    console.log("activi", this.props);
    //console.log("all activities", this.props.data.allActivities)

    // let activities = []
    // let activities_render = ''
    // if(this.props.getActivitiesQuery.loading){
    //   activities = []
    //   activities_render = <h1>Loading..</h1>
    // } else {
    //   activities = this.props.getActivitiesQuery.allActivities  &&  this.props.getActivitiesQuery.allActivities != undefined ? this.props.getActivitiesQuery.allActivities : []
    //   activities = activities.reverse()
    //   }




     // activities_render = activities.map((activity, index) => {return(
     //  <div className="activity-item-div" key={index}>
     //      <div className="activity-sub-item-div-2">{activity.activityProject.projectName}</div>
     //      <div className="activity-sub-item-div-3">{activity.activityType.activityTypeName}</div>
     //      <div className="activity-sub-item-div-4">{activity.activityTypeIdentifier.activityTypeIdentifierName}</div>
     //      <div className="activity-sub-item-div-5">{activity.activityDescription}</div>
     //      <div className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</div>
     //      <div className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</div>
     //  </div>)})



    return (
      <div className="activities-container">
        <Header />
        <div className="activities-header">
          <div>Activities</div>
          <div className="add-activity"><button onClick={this.handleDisplayForm} className={button_class}>{this.state.button_content}</button></div>
        </div>
        {my_form}
        <ActivitiesList activitiesvp={this.props.getActivitiesQuery.allActivities}/>
      </div>
    );
  }
}


// export default compose(
//     //graphql(createActivityMutation, { name: "createActivityMutation" }),
//     graphql(getActivitiesQuery, { name: "getActivitiesQuery" })
//     // graphql(getBugsQuery, { name: "getBugsQuery" }),
//     // graphql(getProjectsQuery, { name: "getProjectsQuery" })
// )(Activities);



//export default graphql(getActivitiesQuery)(Activities);


export default compose(
    graphql(getActivitiesQuery, { name: "getActivitiesQuery" }),
    graphql(createActivityMutation, { name: "createActivityMutation" }),
    //graphql(getProjectsQuery, { name: "getProjectsQuery" })
)(Activities);
