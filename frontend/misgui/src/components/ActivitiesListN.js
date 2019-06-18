import React , {Component} from 'react'
import moment from 'moment'
import ActivitiesGUI from './ActivitiesGUI'


class ActivitiesListN extends Component {
  constructor(props){
    super(props)

    this.state = {
      aid : 0
    }

  }

   handleButtonPress = (activity) => {
     this.buttonPressTimer = setTimeout(() => {
       // console.log("long press activated")
       // console.log(activity)
       this.props.handleLP(activity);
     }, 500);
   }

   handleButtonRelease = () => {
     clearTimeout(this.buttonPressTimer);
   }


  render(){

    // console.log(this.props)

    const activities = this.props.activities  &&  this.props.activities != undefined ? this.props.activities : []

    let mondayActivities = []
    let monac = []
    let monactotal = 0;
    let tuesdayActivities = []
    let tueac = []
    let tueactotal = 0;
    let wednesdayActivities = []
    let wedac = []
    let wedactotal = 0;
    let thursdayActivities = []
    let thuac = []
    let thuactotal = 0;
    let fridayActivities = []
    let friac = []
    let friactotal = 0;
    let saturdayActivities = []
    let satac = []
    let satactotal = 0;
    let sundayActivities = []
    let sunac = []
    let sunactotal = 0;



    let activities_render = <div></div>

    if(activities.length != 0){
        activities.slice(0).reverse().map((activity) => {


          // <td className="activity-sub-item-div-5">{moment(activity.activityStartTime.toString().substring(0,19), "YYYY-MM-DDTHH:mm:ss").format('dddd')}</td>


       let myitem = <tr className="activity-item-div" key={activity.id} onMouseDown={() => this.handleButtonPress(activity)} onMouseOver ={() => { this.setState({aid : activity.id} );    }} onMouseUp={this.handleButtonRelease} onMouseLeave={this.handleButtonRelease} >
           <td className="activity-sub-item-div-2">{activity.activityProject.projectName}</td>
           <td className="activity-sub-item-div-3">{activity.activityType.activityTypeName}</td>
           <td className="activity-sub-item-div-4">{activity.activityTypeIdentifier.activityTypeIdentifierName}</td>
           <td className="activity-sub-item-div-7">{activity.activityTypeIdentifier.activityTypeIdentifierSubCat}</td>
           <td className="activity-sub-item-div-5">{activity.activityDescription}</td>
           <td className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(11,16)}</td>
           <td className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(11,16)}</td>
          <td className="activity-sub-item-div-7">{activity.activityHours} Hrs</td>
       </tr>

       if(moment(activity.activityStartTime.toString().substring(0,19), "YYYY-MM-DDTHH:mm:ss").format('dddd') === "Monday"){
        mondayActivities.push(myitem)
        monac.push(activity)
        monactotal = monactotal + activity.activityHours
        console.log(monactotal)
       } else if(moment(activity.activityStartTime.toString().substring(0,19), "YYYY-MM-DDTHH:mm:ss").format('dddd') === "Tuesday"){
        tuesdayActivities.push(myitem)
        tueac.push(activity)
        tueactotal = tueactotal + activity.activityHours
       } else if(moment(activity.activityStartTime.toString().substring(0,19), "YYYY-MM-DDTHH:mm:ss").format('dddd') === "Wednesday"){
        wednesdayActivities.push(myitem)
        wedac.push(activity)
       } else if(moment(activity.activityStartTime.toString().substring(0,19), "YYYY-MM-DDTHH:mm:ss").format('dddd') === "Thursday"){
        thursdayActivities.push(myitem)
        thuac.push(activity)
       } else if(moment(activity.activityStartTime.toString().substring(0,19), "YYYY-MM-DDTHH:mm:ss").format('dddd') === "Friday"){
        fridayActivities.push(myitem)
        friac.push(activity)
       } else if(moment(activity.activityStartTime.toString().substring(0,19), "YYYY-MM-DDTHH:mm:ss").format('dddd') === "Saturday"){
        saturdayActivities.push(myitem)
        satac.push(activity)
       } else if(moment(activity.activityStartTime.toString().substring(0,19), "YYYY-MM-DDTHH:mm:ss").format('dddd') === "Sunday"){
        sundayActivities.push(myitem)
        sunac.push(activity)
       }

          return null;

    }

    )



    } else {
      activities_render = <tr className="activity-item-div"><td className="activity-sub-item-div-2">No Activities to Display</td></tr>
    }


    let monday_activities_render = <div></div>
    if(mondayActivities.length !== 0){

      monday_activities_render = <div className="day-activities">
      <div className="activities-sub-div"><div className="day-title">Monday</div><ActivitiesGUI activities_gui={monac} aid={this.state.aid}/></div><table>
                                  <tbody>
                                  {mondayActivities}
                                  </tbody>
                                 </table>

                                 </div>
    }


    let tuesday_activities_render = <div></div>
    if(tuesdayActivities.length !== 0){

    tuesday_activities_render = <div className="day-activities">
      <div className="activities-sub-div"><div className="day-title">Tuesday</div><ActivitiesGUI activities_gui={tueac} aid={this.state.aid}/></div><table>
                                  <tbody>
                                  {tuesdayActivities}
                                  </tbody>
                                 </table></div>
    }


    let wednesday_activities_render = <div></div>
    if(wednesdayActivities.length !== 0){

      wednesday_activities_render = <div className="day-activities">
      <div className="activities-sub-div"><div className="day-title">Wednesday</div><ActivitiesGUI activities_gui={wedac} aid={this.state.aid}/></div><table>
                                  <tbody>
                                  {wednesdayActivities}
                                  </tbody>
                                 </table></div>
    }


    let thursday_activities_render = <div></div>
    if(thursdayActivities.length !== 0){

      thursday_activities_render = <div className="day-activities">
      <div className="activities-sub-div"><div className="day-title">Thursday</div><ActivitiesGUI activities_gui={thuac} aid={this.state.aid}/></div><table>
                                  <tbody>
                                  {thursdayActivities}
                                  </tbody>
                                 </table></div>
    }


    let friday_activities_render = <div></div>
    if(fridayActivities.length !== 0){

      friday_activities_render = <div className="day-activities">
      <div className="activities-sub-div"><div className="day-title">Friday</div><ActivitiesGUI activities_gui={friac} aid={this.state.aid}/></div><table>
                                  <tbody>
                                  {fridayActivities}
                                  </tbody>
                                 </table></div>
    }


    let saturday_activities_render = <div></div>
    if(saturdayActivities.length !== 0){

      saturday_activities_render = <div className="day-activities">
      <div className="activities-sub-div"><div className="day-title">Saturday</div><ActivitiesGUI activities_gui={satac} aid={this.state.aid}/></div><table>
                                  <tbody>
                                  {saturdayActivities}
                                  </tbody>
                                 </table></div>
    }


    let sunday_activities_render;
    if(sundayActivities.length !== 0){

      sunday_activities_render = <div className="day-activities">
      <div className="activities-sub-div"><div className="day-title">Sunday</div><ActivitiesGUI activities_gui={sunac} aid={this.state.aid}/></div><table>
                                  <tbody>
                                  {sundayActivities}
                                  </tbody>
                                 </table></div>
    }


    if(moment().day("Monday")){
      // console.log("sundayyyyyyyyyyyyyyyyyyyyyy")
        // {monday_activities_render}
    }





    return(

      <div className="activities-div">
        {monday_activities_render}
        {tuesday_activities_render}
        {wednesday_activities_render}
        {thursday_activities_render}
        {friday_activities_render}
        {saturday_activities_render}
        {sunday_activities_render}
      </div>

    )
  }

}

export default ActivitiesListN
