import React , {Component} from 'react'
import { updateProject ,getProjectsQuery, getMe, getActivityTypesQuery, getUsersQuery,createCosting,updateCosting, getCostingsQuery} from '../queries/queries'
import { graphql, compose } from 'react-apollo';


class CostingManagement extends Component {

  constructor(props){
    super(props)
    this.state = {
      filterInput : '',
      displayName : '',
      costingUser : '',
      costingId : '',
      costingDate : 'ZZZZ',
      costingAmount : '',
      displayForm : false,
      button_name : 'Update Costing',
      usersListDisplay : false,


      extradark : "rgb(40,55,71)",
      dark : "rgb(52,73,71)",
      light : "rgb(174,182,191)",
      extralight : "rgb(235,237,239)",
    }

  }



  componentDidMount(){
    let mytheme = localStorage.getItem('theme');
    if(mytheme === "green") {

      // console.log("greeeen")

      this.setState({
        extradark : "rgb(25,111,61)",
        dark : "rgb(34, 153, 84)",
        light : "rgb(169, 223,191)",
        extralight : "rgb(233, 247, 239)",
        // translight : "rgb(34, 153, 84,0.3)"
      })

    } else if (mytheme === "blue") {
      this.setState({
        extradark : "rgb(40,55,71)",
        dark : "rgb(52,73,71)",
        light : "rgb(174,182,191)",
        extralight : "rgb(235,237,239)",
        // translight : "rgb(52,73,71,0.3)"
      })
    } else if (mytheme === "red") {
      this.setState( {
        extradark : "rgb(146, 43, 33)",
        dark : "rgb(192, 57, 43)",
        light : "rgb(230, 176, 170)",
        extralight : "rgb(249, 235, 234)",
        // translight : "rgb(192, 57, 43, 0.3)"
      })
    } else if (mytheme === "yellow") {
      this.setState({
        extradark : "rgb(154, 125, 10)",
        dark : "rgb(212, 172, 13)",
        light : "rgb(249, 231, 159)",
        extralight : "rgb(254, 249, 231)",
        // translight : "rgb(212, 172, 13, 0.3)"
      })
    }

  }

  handleFilterInputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleUserNameInputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
      usersListDisplay : true
    })
  }


  handleButtonPress = (costing) => {
    this.buttonPressTimer = setTimeout(() => {
      // console.log("long press activated")
      // console.log(activity)
      // const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false
      // const allprofiles = this.props.getProfilesQuery.allProfiles  &&  this.props.getProfilesQuery.allProfiles  != undefined ? this.props.getProfilesQuery.allProfiles  : []
      //const allprojects = this.props.getProjectsQuery.allProjects  &&  this.props.getProjectsQuery.allProjects  != undefined ? this.props.getProjectsQuery.allProjects  : []

      //const activity_types  = this.props.getActivityTypesQuery.allActivityTypes  &&  this.props.getActivityTypesQuery.allActivityTypes != undefined ? this.props.getActivityTypesQuery.allActivityTypes : []

      // let involved_activity_types = []
      // let not_involved_activity_types = []
      //
      // if(project.activitiesInvolved.length === 0){
      //     activity_types.map((at) => {
      //       not_involved_activity_types.push(at)
      //     })
      // } else {
      //   activity_types.map((at) => {
      //     let matched = false
      //     project.activitiesInvolved.map((ati) => {
      //       if(at.id === ati.id){
      //         matched = true
      //       }
      //     })
      //     if(matched){
      //       involved_activity_types.push(at)
      //     } else {
      //       not_involved_activity_types.push(at)
      //     }
      //   })
      // }


      this.setState({
        costingId : costing.id,
        costingUser : costing.user.id,
        displayName : costing.user.username,
        costingDate : costing.date,
        costingAmount : costing.amount,
        displayForm : true,
        button_name : 'Update Costing',
      })

      // document.documentElement.scrollTop = 0;
      // console.log("nnnnnnnnn", document.documentElement.scrollTop)
      // window.scrollTo(0, 0)

    }, 500);
  }

  handleButtonRelease = () => {
    clearTimeout(this.buttonPressTimer);
  }


  handleUpdateProject = (e) => {
    e.preventDefault()

    // let buildInvActTypes = []
    //
    // this.state.involved_activity_types.map((iat) => {
    //   buildInvActTypes.push(iat.id)
    // })
    //
    // let invActTypesString = JSON.stringify({invActTypes : buildInvActTypes})


    if(this.state.button_name === 'Update Costing') {

    this.props.updateCosting({
        variables: {
          costingId: this.state.costingId,
          date: this.state.costingDate,
          amount: this.state.costingAmount,
        }
    }).then(res => {
      // console.log(res)
      //window.location.reload()
      //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
      // this.clearForm()
      // this.handleDisplayForm()
      // this.props.handleReturnSubmit()
      this.props.getCostingsQuery.refetch()
      // console.log(res)
      this.setState({
        displayForm : false
      })
    }).catch(err => {
      console.log("error aya")
    });

  } else if(this.state.button_name === 'Create Costing'){

    this.props.createCosting({
        variables: {
          user : this.state.costingUser,
          date : this.state.costingDate,
          amount : this.state.costingAmount
        }
    }).then(res => {
      // console.log(res)
      //window.location.reload()
      //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
      // this.clearForm()
      // this.handleDisplayForm()
      // this.props.handleReturnSubmit()
      this.props.getCostingsQuery.refetch()
      // console.log(res)
      this.setState({
        displayForm : false
      })
    }).catch(err => {
      console.log("error aya")
    });
  }

  }


  // handleInvActivityTypesChange = (at, wf) => {
  //
  //   let new_inv_activity_types = [];
  //   let new_not_inv_activity_types = [];
  //
  //   if(wf === 'add'){
  //
  //     // console.log("addddd")
  //     this.state.not_involved_activity_types.map((sniat) => {
  //       if(sniat.id !== at.id){
  //         new_not_inv_activity_types.push(sniat)
  //       }
  //     })
  //
  //     new_inv_activity_types = this.state.involved_activity_types
  //
  //     new_inv_activity_types.push(at)
  //
  //   } else if(wf === 'del'){
  //     this.state.involved_activity_types.map((siat) => {
  //       if(siat.id !== at.id){
  //         new_inv_activity_types.push(siat)
  //       }
  //     })
  //
  //     new_not_inv_activity_types = this.state.not_involved_activity_types
  //
  //     new_not_inv_activity_types.push(at)
  //
  //   }
  //   this.setState({
  //     involved_activity_types : new_inv_activity_types,
  //     not_involved_activity_types : new_not_inv_activity_types
  //   })
  //
  // }


  handleCloseForm = () => {
    this.setState({
      displayForm : false,
    })
  }


  handleCreateCosting = () => {
     //const activity_types  = this.props.getActivityTypesQuery.allActivityTypes  &&  this.props.getActivityTypesQuery.allActivityTypes != undefined ? this.props.getActivityTypesQuery.allActivityTypes : []
     //let involved_activity_types = []
     //let not_involved_activity_types = []

     // activity_types.map((at) => {
     //   not_involved_activity_types.push(at)
     // })

     this.setState({
       displayForm : true,
       displayName : '',
       costingUser : '',
       costingId : '',
       costingDate : 'ZZZZ',
       costingAmount : '',
       button_name : 'Create Costing',
     })
   }

   handleUserSelect = (user) => {
     this.setState({
       displayName : user.username,
       costingUser : user.id,
       usersListDisplay : false
     })
   }

   handleDate = (e) => {
     this.setState({
       [e.target.name] : e.target.value
     })
   }


  render(){

    console.log(this.props)

    let side_options = [];
    let side_options_render;

    const allusers = this.props.getUsersQuery.users  &&  this.props.getUsersQuery.users != undefined ? this.props.getUsersQuery.users  : []

    side_options_render = allusers.map((user, index) => {

      if(this.state.displayName !== '' && user.username.includes(this.state.displayName)){
        return(
          <div className="drop-item" key={index} onClick={() => this.handleUserSelect(user)}>{user.username}</div>
        )
      } else {
        return null;
      }

    })

    // if()


    const allcostings = this.props.getCostingsQuery.allCostings  &&  this.props.getCostingsQuery.allCostings != undefined ? this.props.getCostingsQuery.allCostings  : []

    //const activity_types  = this.props.getActivityTypesQuery.allActivityTypes  &&  this.props.getActivityTypesQuery.allActivityTypes != undefined ? this.props.getActivityTypesQuery.allActivityTypes : []

    let costings_render;

    costings_render = allcostings.map((costing) => {
      // <td className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</td>
      // <td className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</td>
      if(costing.user.username.includes(this.state.filterInput)){
        return(
          <tr key={costing.id} className="activity-item-div" onMouseDown={() => this.handleButtonPress(costing)} onMouseUp={this.handleButtonRelease} onMouseLeave={this.handleButtonRelease}>
            <td className="ttc">{costing.user.username}</td>
            <td className="ttc">{costing.date}</td>
            <td className="ttc">{costing.amount}</td>
          </tr>
        )
      }
    })

    let updateformclassname = "none"

    if(this.state.displayForm){
      updateformclassname = "update-profile-div"
    }


    let userslistdisplayclassname = "none"

    if(this.state.usersListDisplay){
      userslistdisplayclassname = ""
    }



    // console.log(this.props)
    return(
      <div className="admin-sub-div">
      <div className="filter-details-my">
        <input placeholder="Search Users Here" name="filterInput" className="filter-items-filter-my" type="text" onChange={this.handleFilterInputChange} value={this.state.filterInput} />
        <div className="title-button-div">
        <div className="activities-title">Costings List</div>
        <button className="add-activity-button" onClick={this.handleCreateCosting}>Create New Costing</button>
        </div>
      </div>
      <div className={updateformclassname}>
        <div className="profile-update-form">
          <div className="flex-r-100pc around-dotted">
            <div className="d-f">
            <input  className="display-name-update" placeholder="Select User" onChange={this.handleUserNameInputChange} id="displayName" name="displayName" value={this.state.displayName}/>
              <div className={userslistdisplayclassname}>
                {side_options_render}
              </div>
            </div>
            <button onClick={this.handleCloseForm} className="profile-close-button">Close</button>
          </div>
          <div className="flex-r-100pc">
            <label  className="update-profile-label" htmlFor="costingDate">Choose Date</label>
            <div className="update-profile-input">
              <input  type="date" name="costingDate" id="costingDate" className="date" onChange={this.handleDate} value={this.state.costingDate}/>
            </div>
          </div>
          <div className="flex-r-100pc">
            <label  className="update-profile-label bb0" htmlFor="projectDesc">Enter Amount</label>
            <div className="update-profile-input bb0">
              <input type="text" placeholder="0.00" name="costingAmount" className="date" onChange={this.handleDate} value={this.state.costingAmount}/>
            </div>
          </div>


          <button  onClick={this.handleUpdateProject} className="profile-update-button">{this.state.button_name}</button>
        </div>
      </div>
      <div className="profiles-table-div">
        <table>
          <tbody>
            {costings_render}
          </tbody>
        </table>
      </div>
      </div>
    )
  }
}


export default compose(
    graphql(getUsersQuery, {name : "getUsersQuery"}),
    graphql(getCostingsQuery, {name : "getCostingsQuery"}),
    graphql(createCosting, {name : "createCosting"}),
    graphql(updateCosting, {name : "updateCosting"}),
  )(CostingManagement)
