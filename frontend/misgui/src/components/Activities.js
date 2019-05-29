import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {getActivitiesQuery, createActivityMutation, getProjectsQuery, getActivitiesForWeekQuery} from './queries/queries'
import Header from './Header'
import ActivityForm from './ActivityForm'
import ActivitiesList from './ActivitiesList'
import {CSVLink, CSVDownload } from "react-csv";
import Moment from 'react-moment';
import jsxToString from 'jsx-to-string';

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
      my_form = <ActivityForm handleSubmitButton={this.handleDisplayForm}/>
    }

    let button_class = ''
    if(this.state.display_form){
      button_class = "cancel-button"
    } else {
      button_class = "login-button"
    }
   


    let excelactivities  = this.props.getActivitiesQuery.allActivities  &&  this.props.getActivitiesQuery.allActivities != undefined ? this.props.getActivitiesQuery.allActivities : []


    const excelarray = excelactivities.map((activity) => {

    return (
        { 
        
          id : activity.id,
          activityProject : activity.activityProject.projectName,
          activityType:activity.activityType.activityTypeName,
          activityTypeIdentifier:activity.activityTypeIdentifier.activityTypeIdentifierName,
          activityDescription:activity.activityDescription,
          activityStartTime:activity.activityStartTime,
          activityEndTime:activity.activityEndTime,
         
        }
      )
    })

    console.log("my excel array", excelarray)

    console.log("activi", this.props);

  


    return (
      <div className="activities-container">
        <Header />
        <div className="activities-header">
          <div>Activities</div>
          <div className="add-activity"><button onClick={this.handleDisplayForm} className={button_class}>{this.state.button_content}</button></div>
        </div>
        {my_form}
    
        <ActivitiesList activitiesvp={this.props.getActivitiesQuery.allActivities} />
        <div><CSVLink  filename={"MIS.csv"} data={excelarray} className="login-button">Download</CSVLink></div>
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
    graphql(getActivitiesForWeekQuery, {name : "getActivitiesForWeekQuery"})
    //graphql(getProjectsQuery, { name: "getProjectsQuery" })
)(Activities);
