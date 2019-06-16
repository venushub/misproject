import React, {Component} from 'react'
import Header from './Header'
import ActivitiesListN from './ActivitiesListN'
import { graphql, compose } from 'react-apollo';
import {getActivitiesQuery, getActivitiesForWeekQuery} from './queries/queries'
import ActivityFormN from './ActivityFormN'
import {CSVLink, CSVDownload } from "react-csv";
import moment from 'moment'
import Switch from "react-switch";

class ActivitiesN extends Component {
  constructor(props){
    super(props)

    this.state = {
      editId : {},
      checked : true,
    }
    this.handleChange = this.handleChange.bind(this);
  }

 handleChange(checked) {


  this.setState({ checked });
}


  handleReturnSubmit = () => {
    // this.props.getActivitiesQuery.refetch()
    this.props.getActivitiesForWeekQuery.refetch()
  }

  handleLP = (activity) => {
    console.log(activity)
    this.setState({
      editId : activity
    })
  }



  render(){







    console.log(this.state.editId)
    let weekHandle = '0'
    if(this.state.checked){
      weekHandle = moment(moment(), "MMDDYYYY").isoWeek().toString()
    } else {
      weekHandle = '0'
    }

    console.log("week is .......", weekHandle)

    console.log("whereeeeeeeeeeee", this.props)

    let activities = []

    // if(this.state.checked){
    //   activities = this.props.getActivitiesForWeekQuery.allActivitiesForWeek
    // } else {
    //   activities = this.props.getActivitiesQuery.allActivities
    // }

    //-------------put this code in render to use toggle-------------
    // <label  className="week-toggle-div">
    // <span className="week-toggle-div-name">This Week</span>
    // <Switch onChange={this.handleChange} checked={this.state.checked} />
    // </label>

    //-------------put this code in render to excel download-------------
    //<div className="csv-link"><CSVLink  filename={"MIS.csv"} data={excelarray} className="csv-button">⇩</CSVLink></div>

    activities = this.props.getActivitiesForWeekQuery.allActivitiesForWeek


    let excelactivities  = activities  &&  activities != undefined ? activities : []


    const excelarray = excelactivities.map((activity) => {

    const time= moment.duration(moment(activity.activityEndTime, 'YYYY-MM-DDTHH:mm').diff(moment(activity.activityStartTime, 'YYYY-MM-DDTHH:mm'))).asHours()

    return (
        {
          id : activity.id,
          activityProject : activity.activityProject.projectName,
          activityUser : activity.activityUser.username,
          activityType:activity.activityType.activityTypeName,
          activityTypeIdentifier:activity.activityTypeIdentifier.activityTypeIdentifierName,
          activityTypeIdentifierSubCat : activity.activityTypeIdentifier.activityTypeIdentifierSubCat,
          activityDescription:activity.activityDescription,
          activityStartTime:activity.activityStartTime,
          activityEndTime:activity.activityEndTime,
          activityHours: time
        }
      )
      })

    return(
      <div className="activities-container">
        <Header />
        <ActivityFormN handleReturnSubmit={this.handleReturnSubmit} editOption={this.state.editId} />
        <ActivitiesListN activities={activities} weekHandle={weekHandle} handleLP={this.handleLP} />
      </div>
    )
  }
}


export default compose(
    // graphql(getActivitiesQuery, { name: "getActivitiesQuery" }),

    graphql(getActivitiesForWeekQuery, {
      name : "getActivitiesForWeekQuery",
      options : (props) => {
        return {
          variables : {
            search : moment(moment(), "MMDDYYYY").isoWeek().toString()
          }
        }
      }
    }),

)(ActivitiesN);
