import React, {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import { getCostingsQuery} from './queries/queries'

let moment = require('moment');

class CostCalc extends Component {

  constructor(props){
    super(props)

    this.state = {
      value : 'Show Costing'
    }

  }


  componentDidUpdate(prevProps){
      if (this.props.detectChange !== prevProps.detectChange) {

        this.setState({
            value : 'Show Costing'
        })
      }
  }


  getCost = (activity) => {

    let activityDate = activity.activityStartTime.substring(0,10)

    const allcostings = this.props.getCostingsQuery.allCostings  &&  this.props.getCostingsQuery.allCostings != undefined ? this.props.getCostingsQuery.allCostings  : []

    let ca = []

    allcostings.map((costing) => {
      if(costing.user.username === activity.activityUser.username){
        ca.push(costing)
      }
    })

    //console.log(ca)

    //console.log("activityDate", activityDate)

    let sca = [];

    sca = ca.sort(function(a, b) {
      return  moment(a.date).diff(moment(b.date), 'days')
    })

    console.log("sorted caaaaa", sca)

    let fincost = 0;

    //console.log(activity)

    let gotit = false

    // sortedca.map((sca, index) => {
    //   if(!gotit){
    //     console.log("index:",index);
    //     console.log("difff", moment(activityDate).diff(moment(sca.date), 'days'))
    //     // if(moment(activityDate).diff(moment(sca.date), 'days') <= 0){
    //     //   fincost = sca.amount
    //     //   gotit = true
    //     // }
    //
    //     if(moment(activityDate).diff(moment(sca.date), 'days') >= 0){
    //       if(sca[index+1] && (moment(activityDate).diff(moment(sca[index+1].date), 'days') < 0)){
    //         fincost = sca.amount
    //         gotit = true
    //       }
    //
    //     }
    //   }
    // })

    console.log(activityDate)



    for(var i=0; i<sca.length; i++){
      //console.log("index:",i);
      //console.log("difff", moment(activityDate).diff(moment(sca[i].date), 'days'))
      // if(moment(activityDate).diff(moment(sca.date), 'days') <= 0){
      //   fincost = sca.amount
      //   gotit = true
      // }

      if(moment(activityDate).diff(moment(sca[i].date), 'days') >= 0){
        if(i === sca.length-1){
          fincost = sca[i].amount
          //gotit = true
        }else if(i < sca.length-1 && (moment(activityDate).diff(moment(sca[i+1].date), 'days') < 0)){
          fincost = sca[i].amount
          //gotit = true
        }else{
          //console.log("NO FINCOST FOUND");
        }

      }

    }

    //console.log("fincost1", fincost)

    // if(sortedca.length > 0 && fincost === 0){
    //   fincost = sortedca[sortedca.length - 1].amount
    // }




    //console.log("fincost2", fincost)




    //console.log(fincost)

    // let a = moment(ca[0].date);
    // let b = moment(ca[1].date);
    //
    // console.log("diffdate", a.diff(b, 'days'))

    return (parseFloat(fincost))

  }



  handleShowCosting = (resi) => {

    const allcostings = this.props.getCostingsQuery.allCostings  &&  this.props.getCostingsQuery.allCostings != undefined ? this.props.getCostingsQuery.allCostings  : []

    let totalAmount = 0;

    this.props.activities.map((activity) => {
      let cost = this.getCost(activity)
      //console.log("cost isssssssssss", cost)
      totalAmount = totalAmount + cost*(parseFloat(activity.activityHours))
    })

    this.setState({
      value : totalAmount.toString() + " Rs."
    })

  }


  render(){
    //console.log(this.props)
    return <div className="d-f">
      <button className="filter-things" onClick={() => this.handleShowCosting("resi")}>{this.state.value}</button>
    </div>
    }
  }


export default compose(
    graphql(getCostingsQuery, {name : "getCostingsQuery"}),
)(CostCalc)
