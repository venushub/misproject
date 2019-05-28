import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import {getActivitiesQuery} from './queries/queries'
import Header from './Header'
import ActivityForm from './ActivityForm'
import Moment from 'react-moment';





class ActivitiesN extends Component {


  constructor(props){
    super(props)

    this.state = {
      display_form : false,
      button_content : 'Add Activity +',
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



  render(){
    const activities = this.props.getActivitiesQuery

    if(activities.loading){
      return 'Loading..'
    }

    if(activities.error){
      return 'Error bhai..'
    }


    let button_class = ''
    if(this.state.display_form){
      button_class = "cancel-button"
    } else {
      button_class = "login-button"
    }

    


    return(
      <div className="activities-container">

      <Header />
      <div className="activities-header">
        <div>Activities</div>
        <div className="add-activity"><button onClick={this.handleDisplayForm} className={button_class}>{this.state.button_content}</button></div>
        {
          activities.allActivities.slice(0).reverse().map((activity, index) => {return(
           <div className="activity-item-div" key={activity.id}>
               <div className="activity-sub-item-div-2">{activity.activityProject.projectName}</div>
               <div className="activity-sub-item-div-3">{activity.activityType.activityTypeName}</div>
               <div className="activity-sub-item-div-4">{activity.activityTypeIdentifier.activityTypeIdentifierName}</div>
               <div className="activity-sub-item-div-5">{activity.activityDescription}</div>
               <div className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</div>
               <div className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</div>
               <div>
               <Moment diff="activity-sub-item-div-6"> {activity.activityStartTime.toString.substring(0.19)}</Moment>
               <Moment diff="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</Moment>
               console.log('apna time aayega')
               </div>
           </div>)})
        }
      </div>

      </div>
    )
  }
}




export default compose(
    graphql(getActivitiesQuery, { name: "getActivitiesQuery" }),
    //graphql(createActivityMutation, { name: "createActivityMutation" }),
    //graphql(getProjectsQuery, { name: "getProjectsQuery" })
)(ActivitiesN);
