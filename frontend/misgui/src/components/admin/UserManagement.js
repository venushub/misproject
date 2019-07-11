import React , {Component} from 'react'
import {getProfilesQuery, updateProfile, getProjectsQuery, getMe} from '../queries/queries'
import { graphql, compose } from 'react-apollo';


class UserManagement extends Component {

  constructor(props){
    super(props)
    this.state = {
      filterInput : '',
      displayName : '',
      empCode : 'ZZZZ',
      user : '',
      displayForm : false,
      involved_projects : [],
      not_involved_projects : [],




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

  handleButtonPress = (profile) => {
    this.buttonPressTimer = setTimeout(() => {
      // console.log("long press activated")
      // console.log(activity)
      // const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false
      // const allprofiles = this.props.getProfilesQuery.allProfiles  &&  this.props.getProfilesQuery.allProfiles  != undefined ? this.props.getProfilesQuery.allProfiles  : []
      const allprojects = this.props.getProjectsQuery.allProjects  &&  this.props.getProjectsQuery.allProjects  != undefined ? this.props.getProjectsQuery.allProjects  : []

      let involved_projects = []
      let not_involved_projects = []
      // allprofiles.map((prof) => {
      //   if(me.id === prof.user.id){
      //
      //     allprojects.map((proj) => {
      //
      //
      //
      //
      //     })
      //
      //
      //   }
      // })
      allprojects.map((proj) => {
        profile.projectsInvolved.map((pi) => {
          if(proj.id === pi.id){
            involved_projects.push(proj)
          } else {
            not_involved_projects.push(proj)
          }
        })
      })


      this.setState({
        displayName : profile.user.username,
        empCode : profile.empCode,
        user : profile.user.id,
        displayForm : true,
        involved_projects : involved_projects,
        not_involved_projects : not_involved_projects,
        proPic : profile.profilePic

      })}, 500);
  }

  handleButtonRelease = () => {
    clearTimeout(this.buttonPressTimer);
  }


  handleUpdateProfile = (e) => {
    e.preventDefault()

    this.props.updateProfile({
        variables: {
          user: this.state.user,
          empCode: this.state.empCode,
          location: 'default',
          profilePic: 'default',
        }
    }).then(res => {
      // console.log(res)
      //window.location.reload()
      //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
      // this.clearForm()
      // this.handleDisplayForm()
      // this.props.handleReturnSubmit()
      this.props.getProfilesQuery.refetch()
      console.log(res)
      this.setState({
        displayForm : false
      })
    }).catch(err => {
      console.log("error aya")
    });
  }


  handleInvProjChange = (proj, wf) => {

    let new_inv_projs = [];
    let new_not_inv_projs = [];

    if(wf === 'add'){

      console.log("addddd")
      this.state.not_involved_projects.map((snip) => {
        if(snip.id !== proj.id){
          new_not_inv_projs.push(snip)
        }
      })

      new_inv_projs = this.state.involved_projects

      new_inv_projs.push(proj)

    } else if(wf === 'del'){


      this.state.involved_projects.map((sip) => {
        if(sip.id !== proj.id){
          new_inv_projs.push(sip)
        }
      })

      new_not_inv_projs = this.state.not_involved_projects

      new_not_inv_projs.push(proj)

    }
    this.setState({
      involved_projects : new_inv_projs,
      not_involved_projects : new_not_inv_projs
    })

  }


  handleCloseForm = () => {
    this.setState({
      displayForm : false,
    })
  }


  render(){

    console.log("state....",this.state)

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
            <td className="activity-sub-item-div-2">{profile.projectsInvolved.length} Projects</td>
          </tr>
        )
      }
    })

    let updateformclassname = "none"

    if(this.state.displayForm){
      updateformclassname = "update-profile-div"
    }




    // let projects_involved_display
    // display_filter_details_render = this.state.GB.map((item, index) => {
    //   let button_here_class = "filter-sub-item-selected"
    //     if(item.status){
    //       button_here_class  = "filter-sub-item-selected"
    //     } else {
    //       button_here_class = "filter-sub-item-deselected"
    //     }
    //     return(<button key={index} className={button_here_class} onClick={() => this.deleteItem("GB", index)}>{item.name}</button>)})
    //
    let involved_projects_render;
    involved_projects_render = this.state.involved_projects.map((ip, index) => {
      return(
        <div className="inv-projs-button" onClick={() => this.handleInvProjChange(ip, "del")} key={index}>{ip.projectName}</div>
      )
    })

    let not_involved_projects_render;
    not_involved_projects_render = this.state.not_involved_projects.map((nip, index) => {
      return(
        <div className="inv-projs-button" onClick={() => this.handleInvProjChange(nip, "add")} key={index}>{nip.projectName}</div>
      )
    })

    console.log(this.props)
    return(
      <div className="admin-sub-div">
      <div className="filter-details-my">
        <input placeholder="Search Users Here" name="filterInput" className="filter-items-filter-my" type="text" onChange={this.handleFilterInputChange} value={this.state.filterInput} />
      </div>
      <div className={updateformclassname}>
        <div className="profile-update-form">
          <div className="flex-r-100pc around-dotted">
            <div className="d-f">
            <svg viewBox="-20 -20 250 250" width='160' height='160' xmlns='http://www.w3.org/2000/svg'>
                <defs>
                    <clipPath id='cut-off-bottom'>
                    <circle cx="105" cy="105" r="100" />
                    </clipPath>
                </defs>
                <image clipPath='url(#cut-off-bottom)' xlinkHref={this.state.proPic} height='200' width='200' />
                <circle className="mycircleforfill" cx="105" cy="105" r="100" fillOpacity="0.7"/>
                <circle className="mycircleforstroke" cx="105" cy="105" r="100" fill="none"  strokeWidth="3"/>
            </svg>
            <label  className="display-name-update">{this.state.displayName}</label>
            </div>
            <button onClick={this.handleCloseForm} className="profile-close-button">Close</button>
          </div>
          <div className="flex-r-100pc">
            <label  className="update-profile-label" htmlFor="empCode">Emp Code</label>
            <input className="update-profile-input" type="text" onChange={this.handleFilterInputChange} id="empCode" name="empCode" value={this.state.empCode} />
          </div>
          <div className="projects-inv-div">
            <div className="inv-heading br-0 bl-0"><div className="inv-heading-name br-0">Not Involved Projects</div><div  className="inv-heading-conts br-0">{not_involved_projects_render}</div></div>
            <div className="inv-heading br-0"><div className="inv-heading-name">Involved Projects</div><div  className="inv-heading-conts">{involved_projects_render}</div></div>
          </div>

          <button  onClick={this.handleUpdateProfile} className="profile-update-button">Update</button>
        </div>
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
    graphql(updateProfile, {name : "updateProfile"}),
    graphql(getProjectsQuery, { name: "getProjectsQuery" }),
    graphql(getMe, {name : "getMe"}),
  )(UserManagement)
