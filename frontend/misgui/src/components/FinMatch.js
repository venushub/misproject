import React, {Component} from 'react'
import {getAttendanceQuery} from './queries/queries'
import { graphql, compose } from 'react-apollo';

class FinMatch extends Component {

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
    var str = "8H:26M"
    console.log("waaaaaaaah", str.split(":"))
    console.log("burrrrrrrrr", str.split(":")[0].split("H")[0])
    console.log("burrrrrrrrr", str.split(":")[1].split("M")[0])



    console.log("iiiiii",this.props)

    const attendances = this.props.data.allAttendance  &&  this.props.data.allAttendance != undefined ? this.props.data.allAttendance : []
    let mapi_attn_total = 0
    attendances.map((attn) => {
      mapi_attn_total =mapi_attn_total + parseFloat(attn.totalHours.split(":")[0].split("H")[0]) +  (parseFloat(attn.totalHours.split(":")[1].split("H")[0])/60)
    })

    mapi_attn_total = mapi_attn_total.toFixed(2)

    return(
      <div className="matcher-res-div">
          <div className="total-card"><div className="total-card-head">ATTN</div><div  className="total-card-body">{mapi_attn_total}</div></div>
          <div className="pm-div">-</div>
          <div className="total-card"><div className="total-card-head">MAPI</div><div  className="total-card-body">{this.props.mapi_acts_total}</div></div>
          <div className="pm-div">=</div>
          <div className="total-card"><div className="total-card-head">DIFF</div><div  className="total-card-body">{(mapi_attn_total - this.props.mapi_acts_total).toFixed(2)}</div></div>
      </div>
    )
  }
}


export default compose(
  graphql(getAttendanceQuery, {
    options : (props) => {
      return {
        variables : {
          criteria : props.criteria
        }
      }
    }
  }),

)(FinMatch)
