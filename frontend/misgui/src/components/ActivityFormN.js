import React , {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import CustomOptions from './CustomOptions'
import { getActivityTypesQuery,
         getProjectsQuery,
         createActivityMutation,
         createActivityTypeIdentifierMutation,
         getActivityTypeIdentifiersQuery,
         updateActivityMutation} from './queries/queries'

let moment = require('moment');

class ActivityFormN extends Component {

  constructor(props){
    super(props)

    this.state = {
      activityProjectArg : '--select-',
      activityTypeArg : '--select--',
      activityTypeIdentifierArg : '--select--',
      activityDescriptionArg : '',
      activityDate : '',
      activityStartTime : '',
      activityEndTime : '',
      display_form : false,
      button_content : 'Add Activity +',
      filter_attrib : '',
      datid : true,
      title : 'Activities',
      submit_button_content : "Add Activity +",
      activityMutateOrUpdateArg : '',
      activityid : ''
    }
  }


  handleChange = (e) => {
    // console.log("qqqqqqqqqqqq", typeof(e.target.name), e.target.name , typeof(e.target.value) , e.target.value)

    console.log(this.state);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChange2 = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      datid : true
    }
  )
  }




  handleDisplayForm = () => {
    if(!this.state.display_form){
    this.setState({
      display_form : true,
      button_content : 'Cancel',
      submit_button_content : "Add Activity +"
    })
  } else {
    this.setState({
      display_form : false,
      button_content : 'Add Activity +'
    })
  }
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


  clearForm = () => {
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
      activityProjectArg : '--select--',
      activityTypeArg : '--select--',
      filter_attrib : '',
      activityDescriptionArg : '',
      activityDate : todaydate,
      activityStartTime : nowtime,
      activityEndTime : nowtime,
    })
  }

  componentDidUpdate(prevProps){
    if(this.props.editOption !== 0) {
      console.log("bruh")
      if (this.props.editOption !== prevProps.editOption) {


        let yyyy =  this.props.editOption.activityStartTime.substring(0,4)
        let mm =  this.props.editOption.activityStartTime.substring(5,7)
        let dd =  this.props.editOption.activityStartTime.substring(8,10)

        console.log(this.props.editOption.activityStartTime)

        let sh = this.props.editOption.activityStartTime.substring(11,13)
        let sm = this.props.editOption.activityStartTime.substring(14,16)

        let st = sh + ':' + sm

        console.log(st)

        let eh = this.props.editOption.activityEndTime.substring(11,13)
        let em = this.props.editOption.activityEndTime.substring(14,16)



        let et = eh + ':' + em

          console.log(et)

        console.log("bhbhbhbbhb",mm )
        // let mm = this.state.activityDate.substring(5,7)
        // let dd = this.state.activityDate.substring(8,10)

        let convDate = yyyy + '-' + mm + '-' + dd
        console.log(typeof(convDate))

        this.setState({
          activityid :  this.props.editOption.id,
          activityProjectArg :  this.props.editOption.activityProject.id.toString(),
          activityTypeArg : this.props.editOption.activityType.id.toString(),
          filter_attrib : this.props.editOption.activityTypeIdentifier.activityTypeIdentifierName.toString(),
          activityTypeIdentifierArg : this.props.editOption.activityTypeIdentifier.id.toString(),
          activityDescriptionArg : this.props.editOption.activityDescription,
          datid : false,
          activityDate :  convDate,
          activityStartTime : st,
          activityEndTime : et,
        })


        console.log("date isssssssss", convDate)
        console.log("eeeeeee", this.props.editOption)
        if(!this.state.display_form){
        this.setState({
          display_form : true,
          button_content : 'Cancel',
          submit_button_content : "Update Activity ⇧",
          // activityStartTime : '',
          // activityEndTime : '',

          })
      }

      if(this.state.display_form){
      this.setState({
        submit_button_content : "Update Activity ⇧",
      })
      }

      }


    }
  }


  componentDidMount(){

    console.log("mooooooooooo", moment.duration('23:59:59'))

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
    })
  }


  handleActivityFormSubmit = (e) => {

    console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvv", this.state)

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

    if(this.state.submit_button_content === 'Add Activity +'){


    ////////////////////////////////////////

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
      this.clearForm()
      this.handleDisplayForm()

      this.props.handleReturnSubmit()
    }).catch(err => {
      console.log("error aya")
    });

    //////////////////////////////////////////////

      }


      if(this.state.submit_button_content === "Update Activity ⇧"){


        this.props.updateActivityMutation({
            variables: {
              activityProjectArg: this.state.activityProjectArg,
              activityTypeArg: this.state.activityTypeArg,
              activityTypeIdentifierArg: this.state.activityTypeIdentifierArg,
              activityDescriptionArg: this.state.activityDescriptionArg,
              activityStartTimeArg: activityStartTimeArg,
              activityEndTimeArg: activityEndTimeArg,
              activityMutateOrUpdateArg : this.state.activityid
            }
        }).then(res => {
          console.log(res)
          //window.location.reload()
          //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
          this.clearForm()
          this.handleDisplayForm()

          this.props.handleReturnSubmit()
        }).catch(err => {
          console.log("error aya")
        });

      }

    }
  }

  render(){

    console.log("ddddddddddddddd", this.props)

    const projects_options  = this.props.getProjectsQuery.allProjects  &&  this.props.getProjectsQuery.allProjects != undefined ? this.props.getProjectsQuery.allProjects : []
    const projects_options_render = projects_options.map((project) => {
      return(
        <option key={project.id} value={project.id}>{project.projectName}</option>
      )
    })


    const activity_types_options  = this.props.getActivityTypesQuery.allActivityTypes  &&  this.props.getActivityTypesQuery.allActivityTypes != undefined ? this.props.getActivityTypesQuery.allActivityTypes : []
    const activity_types_options_render = activity_types_options.map((activity_type) => {
      return(
        <option key={activity_type.id} value={activity_type.id}>{activity_type.activityTypeName}</option>
      )
    })


    let myelem = <div></div>
    if(this.state.datid){
      myelem = <CustomOptions handleDropDown={this.handleDropDown} activityTypeId={this.state.activityTypeArg} filter_attrib={this.state.filter_attrib} />
    }



    const my_form =
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
              <input className="activity-form-input" type="text" onChange={this.handleChange2} name="filter_attrib" value={this.state.filter_attrib}/>
              {myelem}

              <label  className="activity-form-input-label">Description</label>
              <input className="activity-form-input" type="text" onChange={this.handleChange} name="activityDescriptionArg" value={this.state.activityDescriptionArg} />

              <label className="activity-form-input-label">Date</label>
              <input className="activity-form-input"  type="date" onChange={this.handleChange} name="activityDate" value={this.state.activityDate} />

              <label className="activity-form-input-label">Start Time</label>
              <input type="time" className="activity-form-input" onChange={this.handleChange} name="activityStartTime" value={this.state.activityStartTime} />

              <label className="activity-form-input-label">End Time</label>
              <input type="time" className="activity-form-input" onChange={this.handleChange} name="activityEndTime" value={this.state.activityEndTime} />

              <button className="login-button">{this.state.submit_button_content}</button>
            </form>


    let button_class = ''
    if(this.state.display_form){
      button_class = "cancel-button"
    } else {
      button_class = "login-button"
    }

    let formWrap = 'my-wrap'

    if(!this.state.display_form){
      formWrap = "form-wrap-none"
    }


    return(
      <React.Fragment>
      <div className="activities-header">
        <div>{this.state.title}</div>
        <div className="add-activity"><button onClick={this.handleDisplayForm} className={button_class}>{this.state.button_content}</button></div>
      </div>
      <div className={formWrap}>{my_form}</div>
      </React.Fragment>
    )
  }

}


export default compose(
    graphql(getProjectsQuery, { name: "getProjectsQuery" }),
    graphql(createActivityMutation, { name: "createActivityMutation" }),
    graphql(updateActivityMutation, { name: "updateActivityMutation" }),
    graphql(getActivityTypesQuery, {name : "getActivityTypesQuery"}),
    graphql(createActivityTypeIdentifierMutation, { name: "createActivityTypeIdentifierMutation" }),
)(ActivityFormN);