import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {getActivitiesQuery, createActivityMutation, getProjectsQuery, getActivityTypesQuery} from './queries/queries'
import ActivityTypeIdentifierOptions from './ActivityTypeIdentifierOptions'
import {withRouter} from 'react-router'
import CustomOptions from './CustomOptions'


class ActivityForm extends Component {

  constructor(props){
    super(props)

    this.state = {
      display_form : false,
      button_content : 'Add Activity +',
      activityProjectArg : '--select--',
      activityTypeArg : '--select--',
      activityTypeIdentifierArg : '--select--',
      activityDescriptionArg : '',
      activityDate : '',
      activityStartTime : '',
      activityEndTime : '',
      datid : true
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () =>   {
      console.log("ware", this.state.activityTypeArg)
    }
  )
  }

  handleChange2 = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      datid : true
    }, () =>   {
      console.log("ware", this.state.activityTypeArg)
    }
  )
  }

  componentDidMount(){

    let today = new Date();
    let dd = String(today.getDate())
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let minmin = today.getMinutes();
    let ss = today.getSeconds();

    let todaydate = yyyy + '-' + mm + '-' + dd;
    let nowtime = hh+':'+minmin




    this.setState({
      activityDate : todaydate,
      activityStartTime : nowtime,
      activityEndTime : nowtime,
      activityProjectArg : '--select--',
      activityTypeArg : '--select--',
      activityTypeIdentifierArg : '--select--',
      filter_attrib : ''
    })
  }

  handleDropDown = (myid, myname) => {
    console.log(myid)
    this.setState({
      activityTypeIdentifierArg : myid,
      filter_attrib : myname,
      datid : false
    }, () => {
      console.log("ok")
    })
  }



  handleActivityFormSubmit = (e) => {

    console.log(this.state)

    e.preventDefault()


    if(this.state.activityProjectArg === '--select--' || this.state.activityTypeArg === '--select--' || this.state.activityTypeIdentifierArg === '--select--'){
      alert('please select all necessary fields')
    } else {



    let yyyy = this.state.activityDate.substring(0,4)
    let mm = this.state.activityDate.substring(5,7)
    let dd = this.state.activityDate.substring(8,10)

    let starttimestring = this.state.activityStartTime.substring(0,2) +':'+ this.state.activityStartTime.substring(3,5)+':'+'00'
    let endtimestring = this.state.activityEndTime.substring(0,2) +':'+ this.state.activityEndTime.substring(3,5)+':'+'00'


    let activityStartTimeArg = yyyy+'-'+mm+'-'+dd+'T'+starttimestring
    let activityEndTimeArg = yyyy+'-'+mm+'-'+dd+'T'+endtimestring

    //console.log(activityStartTimeArg, activityStartTimeArg)

    this.props.createActivityMutation({
        variables: {
            activityProjectArg: this.state.activityProjectArg,
            activityTypeArg: this.state.activityTypeArg,
            activityTypeIdentifierArg: this.state.activityTypeIdentifierArg,
            activityDescriptionArg: this.state.activityDescriptionArg,
            activityStartTimeArg: activityStartTimeArg,
            activityEndTimeArg: activityEndTimeArg,
            activityMutateOrUpdateArg : '1'
        }
    }).then(res => {
      console.log(res)
      //window.location.reload()
      //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
      this.props.handleReturnSubmit()
    }).catch(err => {
      console.log("error aya")
    });

    }
  }





  render(){

    console.log("propssssssssss", this.props)



    console.log("wow", this.state)


    let projects_options  = this.props.getProjectsQuery.allProjects  &&  this.props.getProjectsQuery.allProjects != undefined ? this.props.getProjectsQuery.allProjects : []


    let projects_options_render = projects_options.map((project, index) => {

      return(
        <option key={index} value={project.id}>{project.projectName}</option>
      )

    })

    //////////////////////////////////////////


    let activity_types_options  = this.props.getActivityTypesQuery.allActivityTypes  &&  this.props.getActivityTypesQuery.allActivityTypes != undefined ? this.props.getActivityTypesQuery.allActivityTypes : []

    let activity_types_options_render = activity_types_options.map((activity_type, index) => {

      return(
        <option key={index} value={activity_type.id}>{activity_type.activityTypeName}</option>
      )

    })


    console.log(this.state.activityTypeArg)

    let myelem = <div></div>
    if(this.state.datid){
      myelem = <CustomOptions handleDropDown={this.handleDropDown} activityTypeId={this.state.activityTypeArg} filter_attrib={this.state.filter_attrib} />
    }


    ////////////////////////////////////////


    return(

      <form className ="registration-form"  onSubmit={this.handleActivityFormSubmit}>

          <label className="activity-form-input-label">Project</label>
          <select name="activityProjectArg" value={this.state.activityProjectArg} onChange={this.handleChange} className="activity-form-input">
             <option value="select">--select--</option>
             {projects_options_render}
          </select>



          <label className="activity-form-input-label">Activity Type</label>
          <select name="activityTypeArg" value={this.state.activityTypeArg} onChange={this.handleChange} className="activity-form-input">
              <option value="select">--select--</option>
              {activity_types_options_render}
          </select>

          <label className="activity-form-input-label">Activity type Id</label>
          <input className="activity-form-input" type="text" onChange={this.handleChange2} name ="filter_attrib" value={this.state.filter_attrib}/>
          {myelem}


          <label  className="activity-form-input-label">Description</label>
          <input className="activity-form-input" type="text" onChange={this.handleChange} name ="activityDescriptionArg" value={this.state.activityDescriptionArg} />


          <label className="activity-form-input-label">Date</label>
          <input className="activity-form-input"  type="date" onChange={this.handleChange} name ="activityDate" value={this.state.activityDate} />

          <label className="activity-form-input-label">Start Time</label>
          <input type="time" className="activity-form-input" onChange={this.handleChange} name ="activityStartTime" value={this.state.activityStartTime} />

          <label className="activity-form-input-label">End Time</label>
          <input type="time" className="activity-form-input" onChange={this.handleChange} name ="activityEndTime" value={this.state.activityEndTime} />

          <button className="login-button">Submit</button>
        </form>



    )
  }


}


export default compose(
    graphql(createActivityMutation, { name: "createActivityMutation" }),
    graphql(getProjectsQuery, { name: "getProjectsQuery" }),
    graphql(getActivityTypesQuery, {name : "getActivityTypesQuery"}),
    graphql(getActivitiesQuery, {name : "getActivitiesQuery"})
)(ActivityForm);
