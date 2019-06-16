import React , {Component} from 'react'
import moment from 'moment'
var _ = require('lodash');


class ActivitiesListN extends Component {
  constructor(props){
    super(props)


  }

   // handleButtonPress = (activity) => {
   //   this.buttonPressTimer = setTimeout(() => {
   //     console.log("long press activated")
   //     console.log(activity)
   //     this.props.handleLP(activity);
   //   }, 500);
   // }
   //
   // handleButtonRelease = () => {
   //   clearTimeout(this.buttonPressTimer);
   // }

   groupBy = ( array , f ) =>
   {
     var groups = {};
     array.forEach( function( o )
     {
       var group = JSON.stringify( f(o) );
       groups[group] = groups[group] || [];
       groups[group].push( o );
     });
     return Object.keys(groups).map( function( group )
     {
       return groups[group];
     })
   }


  render(){

    console.log(this.props)

    const activities = this.props.activities  &&  this.props.activities != undefined ? this.props.activities : []

    let filter_group_criteria = this.props.filter_group_criteria  &&  this.props.filter_group_criteria != undefined ? this.props.filter_group_criteria : []

    var result = this.groupBy(activities, function(activity)
    {

      let myobjs = []
      filter_group_criteria.map((fgc) => {
        if(fgc.status){
          if(fgc.name === "activityProject.projectName") {
              myobjs.push(activity.activityProject.projectName)
          } else if (fgc.name === "activityUser.username") {
            myobjs.push(activity.activityUser.username)
          } else if (fgc.name === "activityType.activityTypeName") {
            myobjs.push(activity.activityType.activityTypeName)
          } else if (fgc.name === "activityTypeIdentifier.activityTypeIdentifierName") {
            myobjs.push(activity.activityTypeIdentifier.activityTypeIdentifierName)
          }
        }
      })
      // return [activity.activityProject.projectName, activity.activityUser.username, activity.activityType.activityTypeName, activity.activityTypeIdentifier.activityTypeIdentifierName];
      return myobjs;
    });

    let activities_new = []
    let activities_render;
    activities_render = result.map((resi, index) => {

      let sub_activities_render;

      let sub_activities_total = 0;

      sub_activities_render = resi.map((activity, index) => {


        sub_activities_total = sub_activities_total + activity.activityHours
        // <td className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</td>
        // <td className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</td>
        return(
          <tr key={index} className="activity-item-div" key={activity.id} >
              <td className="activity-sub-item-div-2">{activity.activityProject.projectName}</td>
              <td className="activity-sub-item-div-2">{activity.activityUser.username}</td>
              <td className="activity-sub-item-div-3">{activity.activityType.activityTypeName}</td>
              <td className="activity-sub-item-div-4">{activity.activityTypeIdentifier.activityTypeIdentifierName}</td>
              <td className="activity-sub-item-div-7">{activity.activityTypeIdentifier.activityTypeIdentifierSubCat}</td>
              <td className="activity-sub-item-div-5">{activity.activityDescription}</td>

             <td className="activity-sub-item-div-7">{activity.activityHours} Hrs</td>
          </tr>
        )
      })

      

      return(
        <div  key={index} className="activity-block">  <table className="my-table">
          <tbody>{sub_activities_render}</tbody>
        </table><div className="total-td">{sub_activities_total} Hrs</div></div>
      )

      // resi.map((activity) => {
      //
      // })
    })


       // activities_render = activities.slice(0).reverse().map((activity) => {return(
       // <div className="activity-item-div" key={activity.id} onMouseDown={() => this.handleButtonPress(activity)} onMouseUp={this.handleButtonRelease} onMouseLeave={this.handleButtonRelease} >
       //     <div className="activity-sub-item-div-2">{activity.activityProject.projectName}</div>
       //     <div className="activity-sub-item-div-3">{activity.activityType.activityTypeName}</div>
       //     <div className="activity-sub-item-div-4">{activity.activityTypeIdentifier.activityTypeIdentifierName}</div>
       //     <div className="activity-sub-item-div-7">{activity.activityTypeIdentifier.activityTypeIdentifierSubCat}</div>
       //     <div className="activity-sub-item-div-5">{activity.activityDescription}</div>
       //     <div className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</div>
       //     <div className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</div>
       //     <div className="activity-sub-item-div-7">{moment
       //      .duration(moment(activity.activityEndTime, 'YYYY-MM-DDTHH:mm')
       //      .diff(moment(activity.activityStartTime, 'YYYY-MM-DDTHH:mm'))
       //    ).asHours()} Hrs</div>
       // </div>
       //
       //




    // let sumoftime = 0
    // activities.map((activity) => {
    //
    //   sumoftime = sumoftime + moment
    //    .duration(moment(activity.activityEndTime, 'YYYY-MM-DDTHH:mm')
    //    .diff(moment(activity.activityStartTime, 'YYYY-MM-DDTHH:mm'))
    //   ).asHours().toFixed(2)
    //
    // })

    // let activities_render = <div></div>
    //
    // if(activities.length != 0){
    //    activities_render = activities.slice(0).reverse().map((activity) => {return(
    //    // <div className="activity-item-div" key={activity.id} onMouseDown={() => this.handleButtonPress(activity)} onMouseUp={this.handleButtonRelease} onMouseLeave={this.handleButtonRelease} >
    //    //     <div className="activity-sub-item-div-2">{activity.activityProject.projectName}</div>
    //    //     <div className="activity-sub-item-div-3">{activity.activityType.activityTypeName}</div>
    //    //     <div className="activity-sub-item-div-4">{activity.activityTypeIdentifier.activityTypeIdentifierName}</div>
    //    //     <div className="activity-sub-item-div-7">{activity.activityTypeIdentifier.activityTypeIdentifierSubCat}</div>
    //    //     <div className="activity-sub-item-div-5">{activity.activityDescription}</div>
    //    //     <div className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</div>
    //    //     <div className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</div>
    //    //     <div className="activity-sub-item-div-7">{moment
    //    //      .duration(moment(activity.activityEndTime, 'YYYY-MM-DDTHH:mm')
    //    //      .diff(moment(activity.activityStartTime, 'YYYY-MM-DDTHH:mm'))
    //    //    ).asHours()} Hrs</div>
    //    // </div>
    //
    //    // <td className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</td>
    //    // <td className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</td>
    //
    //   //  <td className="activity-sub-item-div-7">{moment
    //   //   .duration(moment(activity.activityEndTime, 'YYYY-MM-DDTHH:mm')
    //   //   .diff(moment(activity.activityStartTime, 'YYYY-MM-DDTHH:mm'))
    //   // ).asHours().toFixed(2)} Hrs</td>
    //
    //    <tr className="activity-item-div" key={activity.id}>
    //        <td className="activity-sub-item-div-2">{activity.activityProject.projectName}</td>
    //        <td className="activity-sub-item-div-3">{activity.activityType.activityTypeName}</td>
    //        <td className="activity-sub-item-div-4">{activity.activityTypeIdentifier.activityTypeIdentifierName}</td>
    //        <td className="activity-sub-item-div-7">{activity.activityTypeIdentifier.activityTypeIdentifierSubCat}</td>
    //        <td className="activity-sub-item-div-5">{activity.activityDescription}</td>
    //        <td className="activity-sub-item-div-7">{activity.activityHours} &nbsp; Hrs</td>
    //    </tr>
    //
    //
    //  )})
    // } else {
    //   activities_render = <tr className="activity-item-div"><td className="activity-sub-item-div-2">No Activities to Display</td></tr>
    // }


    // var output = _.groupBy(activities, 'activityProject.projectName')
    //
    //
    //
    //
    //   console.log("outpoooooooooooot" , output)
      //
      // let fcb = this.props.fc
      // let jcb = "{}"
      // let jcbk = []
      // if(fcb != ""){
      //     jcb = JSON.parse(fcb)
      //     console.log("vvvvv", jcb)
      //     jcbk = jcb['GB'].map((gb) => {return("activity." + gb)})
      // }



      // let jfc = JSON.parse(this.props.fc)
      // console.log("fccccccccc", typeof(fcb), fcb, jcb['GB'], jcbk)

      // let jcbk = jcb['GB'].map((gb) => {return("activity." + gb)})




      console.log("result" , result)


    return(

      <div className="activities-holder">
          {activities_render}
      </div>

    )
  }

}

export default ActivitiesListN
