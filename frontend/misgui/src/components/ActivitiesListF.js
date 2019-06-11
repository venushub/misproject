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

          sumoftime = sumoftime + parseFloat(moment
           .duration(moment(activity.activityEndTime, 'YYYY-MM-DDTHH:mm')
           .diff(moment(activity.activityStartTime, 'YYYY-MM-DDTHH:mm'))
         ).asHours().toFixed(2))

        })


    return(
      <div className="dashboard-condown">
      <ActivitiesListNF activities={activities} />
      <div className="total-div">{sumoftime}</div>
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
