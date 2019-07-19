import React, {Component} from 'react'
import {getAttendanceQuery, getActivitiesForMonthQuery} from './queries/queries'
import { graphql, compose } from 'react-apollo';
import FinMatch from './FinMatch'

class Matching extends Component {

  constructor(props){

    super(props)

    this.state = {

    }

  }

  // componentDidMount(){
  //
  //   //const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false
  //
  //
  // }
  //
  // componentDidUpdate(prevProps){
  //     if (this.props.getAttendanceQuery !== prevProps.getAttendanceQuery) {
  //
  //     }
  // }


  render(){

    // console.log("ggggggg",this.props)
    const activities = this.props.data.allActivitiesForMonth  &&  this.props.data.allActivitiesForMonth != undefined ? this.props.data.allActivitiesForMonth : []
    let mapi_acts_total = 0;
    activities.map((activity) => {
      mapi_acts_total = mapi_acts_total + parseFloat(activity.activityHours)
    })

    mapi_acts_total= mapi_acts_total.toFixed(2)

    return(
      <div className="matcher-res-div">
        <FinMatch mapi_acts_total={mapi_acts_total} criteria={this.props.criteria}/>
      </div>
    )
  }
}


export default compose(

  graphql(getActivitiesForMonthQuery, {
    options : (props) => {
      return {
        variables : {
          criteria : props.criteria
        }
      }
    }
  }),
)(Matching)
