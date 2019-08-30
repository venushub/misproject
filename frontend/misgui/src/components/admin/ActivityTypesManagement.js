import React , {Component} from 'react'
import { updateProject ,getProjectsQuery, getMe, getActivityTypesQuery, createProject} from '../queries/queries'
import { graphql, compose } from 'react-apollo';
import ActivityTypesInside from './ActivityTypesInside'

class ActivityTypesManagement extends Component {

  constructor(props){
    super(props)
    this.state = {
      filterInput : '',
      displayForm : false,
      button_name : '',
      activityType : {},

      extradark : "rgb(40,55,71)",
      dark : "rgb(52,73,71)",
      light : "rgb(174,182,191)",
      extralight : "rgb(235,237,239)",
    }

  }



  componentDidMount(){
    let mytheme = localStorage.getItem('theme');
    if(mytheme === "green") {

      console.log("greeeen")

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

  handleButtonPress = (at) => {
    this.buttonPressTimer = setTimeout(() => {
      // console.log("long press activated")
      // console.log(activity)
      // const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false
      // const allprofiles = this.props.getProfilesQuery.allProfiles  &&  this.props.getProfilesQuery.allProfiles  != undefined ? this.props.getProfilesQuery.allProfiles  : []
      // const allprojects = this.props.getProjectsQuery.allProjects  &&  this.props.getProjectsQuery.allProjects  != undefined ? this.props.getProjectsQuery.allProjects  : []
      //
      // const activity_types  = this.props.getActivityTypesQuery.allActivityTypes  &&  this.props.getActivityTypesQuery.allActivityTypes != undefined ? this.props.getActivityTypesQuery.allActivityTypes : []
      //
      //
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
      //
      // displayName : project.projectName,
      // projectDesc : project.projectDesc,
      // project : project.id,
      // displayForm : true,
      // involved_activity_types : involved_activity_types,
      // not_involved_activity_types : not_involved_activity_types,
      // proPic : project.projectPic,
      // button_name : 'Update Project',

      this.setState({
        activityType : at,
        button_name : 'Update Activity Type',
        displayForm : true,
      })}, 500);
  }

  handleButtonRelease = () => {
    clearTimeout(this.buttonPressTimer);
  }





  handleCloseForm = () => {
    this.setState({
      displayForm : false,
    })
  }

  handleCreateActivityType = () => {
    this.setState({
      displayForm : false,
      button_name : 'Create Activity Type',
      activityType : {activityTypeName: "", activityTypeDesc: "", activityTypeRequired: "Y"}
    })
  }

  refetchData =() => {
    // console.log("gttttyyyyyyyyyyyy")
    this.props.getActivityTypesQuery.refetch()
  }



  render(){

    // console.log("state....",this.state)

    const activity_types  = this.props.getActivityTypesQuery.allActivityTypes  &&  this.props.getActivityTypesQuery.allActivityTypes != undefined ? this.props.getActivityTypesQuery.allActivityTypes : []

    let activity_types_render;

    activity_types_render = activity_types.map((at) => {
      // <td className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</td>
      // <td className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</td>
      if(at.activityTypeName.includes(this.state.filterInput)){
        return(
          <tr key={at.id} className="activity-item-div" onMouseDown={() => this.handleButtonPress(at)} onMouseUp={this.handleButtonRelease} onMouseLeave={this.handleButtonRelease}>
            <td className="ttc">{at.activityTypeName}</td>
            <td className="ttc">{at.activityTypeDesc}</td>
          </tr>
        )
      }
    })



    // let involved_activity_types_render;
    // involved_activity_types_render = this.state.involved_activity_types.map((iat, index) => {
    //   return(
    //     <div className="inv-projs-button" onClick={() => this.handleInvActivityTypesChange(iat, "del")} key={index}>{iat.activityTypeName}</div>
    //   )
    // })
    //
    // let not_involved_activity_types_render;
    // not_involved_activity_types_render = this.state.not_involved_activity_types.map((niat, index) => {
    //   return(
    //     <div className="inv-projs-button" onClick={() => this.handleInvActivityTypesChange(niat, "add")} key={index}>{niat.activityTypeName}</div>
    //   )
    // })



    // console.log(this.props)
    return(
      <div className="admin-sub-div">
      <div className="filter-details-my">
        <input placeholder="Search Activity Types Here" name="filterInput" className="filter-items-filter-my" type="text" onChange={this.handleFilterInputChange} value={this.state.filterInput} />
        <div className="title-button-div">
          <div className="activities-title">Activity Types List</div>
          <button className="add-activity-button" onClick={this.handleCreateActivityType}>Create Activity Type</button>
        </div>
      </div>
      <ActivityTypesInside   activityType={this.state.activityType} button_name={this.state.button_name} handleRefetch={this.refetchData} />
      <div className="profiles-table-div">
        <table>
          <tbody>
            {activity_types_render}
          </tbody>
        </table>
      </div>
      </div>
    )
  }
}


export default compose(
    graphql(getMe, {name : "getMe"}),
    graphql(getActivityTypesQuery, {name : "getActivityTypesQuery"}),
  )(ActivityTypesManagement)
