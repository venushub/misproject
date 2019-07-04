import React , {Component} from 'react'
import {getProfilesQuery} from '../queries/queries'
import { graphql, compose } from 'react-apollo';


class UserManagement extends Component {

  constructor(props){
    super(props)
    this.state = {
      filterInput : '',
      displayName : '',
      empCode : 'ZZZZ'
    }

  }

  handleFilterInputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleButtonPress = (profile) => {
    this.buttonPressTimer = setTimeout(() => {
      // console.log("long press activated")
      // console.log(activity)
      this.setState({
        displayName : profile.user.username,
        empCode : profile.empCode
      })
    }, 500);
  }

  handleButtonRelease = () => {
    clearTimeout(this.buttonPressTimer);
  }


  handleUpdateProfile = (e) => {
    e.preventDefault()
    alert("bro")
  }



  render(){

    const profiles = this.props.getProfilesQuery.allProfiles  &&  this.props.getProfilesQuery.allProfiles != undefined ? this.props.getProfilesQuery.allProfiles : []

    // let filtered_profiles = []
    // if(this.state.filterInput !== ''){
    //   profiles.map(
    //     (profile) => {
    //
    //     }
    //   )
    // }
    // item.name.includes(this.state.filterInput)

    let profiles_render;

    profiles_render = profiles.map((profile) => {
      // <td className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</td>
      // <td className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</td>
      if(profile.user.username.includes(this.state.filterInput)){
        return(
          <tr key={profile.id} className="activity-item-div" onMouseDown={() => this.handleButtonPress(profile)} onMouseUp={this.handleButtonRelease} onMouseLeave={this.handleButtonRelease}>
          <td className="activity-sub-item-div-2">{profile.user.username}</td>
              <td className="activity-sub-item-div-2">{profile.empCode}</td>
          </tr>
        )
      }

    })




    console.log(this.props)
    return(
      <div className="admin-sub-div">
      <div className="filter-details">
        <input placeholder="Search Items Here" name="filterInput" className="filter-items-filter" type="text" onChange={this.handleFilterInputChange} value={this.state.filterInput} />
      </div>
      <div className="update-profile-div">
        <form className="profile-update-form" onSubmit={this.handleUpdateProfile}>
          <label  className="display-name-update">{this.state.displayName}</label>
          <label  className="update-profile-label" htmlFor="empCode">Emp Code</label>
          <input className="update-profile-input" size="10" type="text" onChange={this.handleFilterInputChange} id="empCode" name="empCode" value={this.state.empCode} />
          <button className="profile-update-button">Update</button>
        </form>
      </div>
      <div className="profiles-table-div">
        <table>
          <tbody>
            {profiles_render}
          </tbody>
        </table>
      </div>
      </div>
    )
  }

}



export default compose(
    graphql(getProfilesQuery, { name: "getProfilesQuery" }),
  )(UserManagement)
