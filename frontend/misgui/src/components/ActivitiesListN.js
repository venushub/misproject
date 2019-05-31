import React , {Component} from 'react'
import moment from 'moment'


class ActivitiesListN extends Component {
  constructor(props){
    super(props)


  }


   handleButtonPress = (activity) => {
     this.buttonPressTimer = setTimeout(() => {
       console.log("long press activated")
       console.log(activity)
       this.props.handleLP(activity);
     }, 500);
   }

   handleButtonRelease = () => {
     clearTimeout(this.buttonPressTimer);
   }


  render(){

    console.log(this.props)

    const activities = this.props.activities  &&  this.props.activities != undefined ? this.props.activities : []

    let activities_render = <div></div>

    if(activities.length != 0){
       activities_render = activities.slice(0).reverse().map((activity) => {return(
       <div className="activity-item-div" key={activity.id} onMouseDown={() => this.handleButtonPress(activity)} onMouseUp={this.handleButtonRelease} onMouseLeave={this.handleButtonRelease} >
           <div className="activity-sub-item-div-2">{activity.activityProject.projectName}</div>
           <div className="activity-sub-item-div-3">{activity.activityType.activityTypeName}</div>
           <div className="activity-sub-item-div-4">{activity.activityTypeIdentifier.activityTypeIdentifierName}</div>
           <div className="activity-sub-item-div-7">{activity.activityTypeIdentifier.activityTypeIdentifierSubCat}</div>
           <div className="activity-sub-item-div-5">{activity.activityDescription}</div>
           <div className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</div>
           <div className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</div>
           <div className="activity-sub-item-div-7">{moment
            .duration(moment(activity.activityEndTime, 'YYYY-MM-DDTHH:mm')
            .diff(moment(activity.activityStartTime, 'YYYY-MM-DDTHH:mm'))
          ).asHours()} Hrs</div>
       </div>)})
    } else {
      activities_render = <div className="activity-item-div">No Activities to Display</div>
    }

    return(
      <div className="activities-div">
        {activities_render}
      </div>
    )
  }

}

export default ActivitiesListN
