import React , {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import { getActivitiesForFilterQuery} from './queries/queries';
import ActivitiesListNF from './ActivitiesListNF'
import moment from 'moment'


class ActivitiesListF extends Component {

  render(){


    let activities = this.props.getActivitiesForFilterQuery.allActivitiesForFilter  &&  this.props.getActivitiesForFilterQuery.allActivitiesForFilter  != undefined ? this.props.getActivitiesForFilterQuery.allActivitiesForFilter  : []


        let sumoftime = 0
        activities.map((activity) => {

        //   sumoftime = sumoftime + parseFloat(moment
        //    .duration(moment(activity.activityEndTime, 'YYYY-MM-DDTHH:mm')
        //    .diff(moment(activity.activityStartTime, 'YYYY-MM-DDTHH:mm'))
        //  ).asHours().toFixed(2))
        // }

        sumoftime = sumoftime + parseFloat(activity.activityHours)
      }

      )


        let crtime = 0
        let ftrtime = 0
        activities.map((activity) => {

          if(activity.activityTypeIdentifier.activityTypeIdentifierSubCat === "CR"){
            crtime = crtime +
            parseFloat(
           //    moment
           //   .duration(moment(activity.activityEndTime, 'YYYY-MM-DDTHH:mm')
           //   .diff(moment(activity.activityStartTime, 'YYYY-MM-DDTHH:mm'))
           // ).asHours().toFixed(2)
           activity.activityHours
         )
         } else if (activity.activityTypeIdentifier.activityTypeIdentifierSubCat === "FTR") {
           ftrtime = ftrtime +
           parseFloat(
          //    moment
          //   .duration(moment(activity.activityEndTime, 'YYYY-MM-DDTHH:mm')
          //   .diff(moment(activity.activityStartTime, 'YYYY-MM-DDTHH:mm'))
          // ).asHours().toFixed(2)
          activity.activityHours



        )
         }
        }
      )



    return(
      <div className="dashboard-condown">
      <ActivitiesListNF activities={activities} filter_group_criteria={this.props.filter_group_criteria} />

      <div className="total-div"><i>CR Time:</i>&nbsp;&nbsp;{crtime} Hrs   &nbsp;&nbsp;&nbsp;&nbsp;   <i>FTR Time:</i>&nbsp;&nbsp;{ftrtime} Hrs   &nbsp;&nbsp;&nbsp;&nbsp;       <i>Total Time:</i>&nbsp;&nbsp;{sumoftime.toFixed(2)} Hrs</div>
      </div>

    )
  }
}


export default compose(

graphql(getActivitiesForFilterQuery, {
  name : "getActivitiesForFilterQuery",
  options : (props) => {
    return {
      variables : {
        search : props.filter_criteria
      }
    }
  }
}),

)(ActivitiesListF)
