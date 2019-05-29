import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {getActivitiesQuery, createActivityMutation, getProjectsQuery} from './queries/queries'
import Header from './Header'
import ActivityForm from './ActivityForm'
import Moment from 'react-moment';

class ActivitiesList extends Component {

  constructor(props){
    super(props)

    this.state = {

    }
  }


  render(){

    console.log("lol", this.props.activitiesvp)

    //let activities = this.props.getActivitiesQuery.allActivities  &&  this.props.getActivitiesQuery.allActivities != undefined ? this.props.getActivitiesQuery.allActivities : []
    // let activities =  this.props.activitiesvp.reverse()
    let activities = this.props.activitiesvp  &&  this.props.activitiesvp != undefined ? this.props.activitiesvp : []


   const activities_render = activities.slice(0).reverse().map((activity, index) => {return(
    <div className="activity-item-div" key={index}>
        
        <div className="activity-sub-item-div-2">{activity.activityProject.projectName}</div>
        <div className="activity-sub-item-div-3">{activity.activityType.activityTypeName}</div>
        <div className="activity-sub-item-div-4">{activity.activityTypeIdentifier.activityTypeIdentifierName}</div>
        <div className="activity-sub-item-div-5">{activity.activityDescription}</div>
        <div className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</div>
        <div className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</div>
        <div className="activity-sub-item-div-7"><Moment diff={activity.activityStartTime.toString().substring(0,19)} unit="hours" decimal>{activity.activityEndTime.toString().substring(0,19)}</Moment>Hrs</div>
       
    </div>)})


    return(
      <div className="activities-div">
           <form><label>This Week<input name="isGoing" type="checkbox"checked={this.state.isGoing} onChange={this.handleWeekBoxChange}/></label></form>
        <div className="activity-item-div" >
        <div className="activity-sub-item-div-2" >Project</div>
        <div className="activity-sub-item-div-3">Type</div>
        <div className="activity-sub-item-div-4">Type Id</div>
        <div className="activity-sub-item-div-5">Description</div>
        <div className="activity-sub-item-div-6">Start At</div>
        <div className="activity-sub-item-div-7">End At</div>
        <div className="activity-sub-item-div-7">Hrs</div>
        
    </div>
      {activities_render}
      </div>
    )
  }


}

export default compose(
    graphql(getActivitiesQuery, { name: "getActivitiesQuery" }),

)(ActivitiesList);