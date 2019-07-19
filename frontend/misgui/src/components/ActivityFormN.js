import React , {Component} from 'react'
import { graphql, compose } from 'react-apollo';
import CustomOptions from './CustomOptions'
import { getActivityTypesQuery,
         getProjectsQuery,
         createActivityMutation,
         createActivityTypeIdentifierMutation,
         getActivityTypeIdentifiersQuery,
         updateActivityMutation, getProfileQuery} from './queries/queries'

let moment = require('moment');

class ActivityFormN extends Component {

  constructor(props){
    super(props)

    this.state = {
      activityProjectArg : '--select-',
      activityTypeArg : '--select--',
      activityTypeName : '',
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
      activityid : '',
      activityHours : 0
    }
  }


  handleChange = (e) => {
    // console.log("qqqqqqqqqqqq", typeof(e.target.name), e.target.name , typeof(e.target.value) , e.target.value)

    // console.log(this.state);
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      this.setState({
        activityHours : moment
         .duration(moment(this.state.activityEndTime, 'HH:mm')
         .diff(moment(this.state.activityStartTime, 'HH:mm'))
       ).asHours().toFixed(2)
      })
    })

  }

  handlePChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      activityTypeArg : '--select--',
      filter_attrib : ''
    })
  }


  handleATChange = (e) => {
    // console.log("qqqqqqqqqqqq", typeof(e.target.name), e.target.name , typeof(e.target.value) , e.target.value)

    // console.log(this.state);

    const projects_list  = this.props.getProjectsQuery.allProjects  &&  this.props.getProjectsQuery.allProjects != undefined ? this.props.getProjectsQuery.allProjects : []

    projects_list.map((pi) => {

      if(pi.id === this.state.activityProjectArg){
        // console.log("piiiiiiiiiiiii", pi)
        pi.activitiesInvolved.map((ai) => {
          if(ai.id === e.target.value) {
              // console.log('huaaaaaaaaa naaaaaaaaaa', ai)
            if(ai.activityTypeRequired === 'N'){
              // console.log('huaaaaaaaaa')
              this.setState({
                activityTypeArg : e.target.value,
                filter_attrib : ai.activityTypeName,
                datid : true
              }, () => {console.log("zzzzzzz", this.state.activityTypeArg)})
            } else {
              this.setState({
                [e.target.name]: e.target.value,
                datid : true,
                filter_attrib : ''
              })
            }
          }
        })
      }
    })
    //
    // this.setState({
    //   [e.target.name]: e.target.value,
    // }, () => {
    //   console.log("cccccccccc", this.state.activityTypeArg)
    //
    // })
    // console.log("cccccccccc", e.target.value.activityTypeName)
    // if(e.target.value.activityTypeRequired === 'N'){
    //   this.setState({
    //     [e.target.name]: e.target.value,
    //     activityTypeIdentifierArg : e.target.value.activityTypeName
    //   })
    // } else if(e.target.value.activityTypeRequired === 'Y'){
    //   this.setState({
    //     [e.target.name]: e.target.value,
    //   })
    // }

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
    this.clearForm()
  } else {
    this.setState({
      display_form : false,
      button_content : 'Add Activity +'
    })
    this.clearForm()
  }
  }

  handleDropDown = (myid, myname) => {
    // console.log(myid)
    this.setState({
      activityTypeIdentifierArg : myid,
      filter_attrib : myname,
      datid : false
    }, () => {
      // console.log("ok")
    })
  }


  clearForm = () => {

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let hh = String(today.getHours()).padStart(2, '0');
    let minmin = String(today.getMinutes()).padStart(2, '0');
    let ss = String(today.getSeconds()).padStart(2, '0');

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
      // console.log("bruh")
      if (this.props.editOption !== prevProps.editOption) {

        let yyyy =  this.props.editOption.activityStartTime.substring(0,4)
        let mm =  this.props.editOption.activityStartTime.substring(5,7)
        let dd =  this.props.editOption.activityStartTime.substring(8,10)

        // console.log(this.props.editOption.activityStartTime)

        let sh = this.props.editOption.activityStartTime.substring(11,13)
        let sm = this.props.editOption.activityStartTime.substring(14,16)

        let st = sh + ':' + sm

        // console.log(st)

        let eh = this.props.editOption.activityEndTime.substring(11,13)
        let em = this.props.editOption.activityEndTime.substring(14,16)



        let et = eh + ':' + em

        // console.log(et)

        // console.log("bhbhbhbbhb",mm )
        // let mm = this.state.activityDate.substring(5,7)
        // let dd = this.state.activityDate.substring(8,10)

        let convDate = yyyy + '-' + mm + '-' + dd
        // console.log(typeof(convDate))

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
          activityHours : moment
           .duration(moment(this.props.editOption.activityEndTime, 'YYYY-MM-DDTHH:mm')
           .diff(moment(this.props.editOption.activityStartTime, 'YYYY-MM-DDTHH:mm'))
         ).asHours().toFixed(2)
        })


        // console.log("date isssssssss", convDate)
        // console.log("eeeeeee", this.props.editOption)
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

    // console.log("mooooooooooo", moment.duration('23:59:59'))

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let hh = String(today.getHours()).padStart(2, '0');
    let minmin = today.getMinutes();
    let ss = today.getSeconds();

    let todaydate = yyyy + '-' + mm + '-' + dd;
    let nowtime = hh+':'+minmin

    // console.log("timeeeeeeeeeeeee", nowtime)

    this.setState({
      activityDate : todaydate,
      activityStartTime : nowtime,
      activityEndTime : nowtime,
    })
  }





  handleActivityFormSubmit = (e) => {

    // console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvv", this.state)

    e.preventDefault()
    // console.log(this.state.activityDate)
    // console.log("selecteddddddddd", moment(this.state.activityDate, "YYYY-MM-DD").week())
    // console.log("deselecteddddd",  moment().week())
    // let diffbtwweeks;
    // diffbtwweeks =  moment(this.state.activityDate, "YYYY-MM-DD").week() -  moment().week()
    // // console.log((moment(this.state.activityDate, "DD-MM-YYYY").week() - moment(moment(), "DD-MM-YYYY").week()) > 1 )
    // console.log("difff", diffbtwweeks)
    if(this.state.activityProjectArg === '--select--' || this.state.activityTypeArg === '--select--' || this.state.activityTypeIdentifierArg === '--select--'){
      alert('please select all necessary fields')
    } else if(this.state.activityHours <= 0){

      alert('Hours cannot be less than or equal to zero')

    } else if((moment(this.state.activityDate, "YYYY-MM-DD").week() - moment(moment(), "DD-MM-YYYY").week()) < -1 || (moment(this.state.activityDate, "DD-MM-YYYY").week() - moment(moment(), "DD-MM-YYYY").week()) > 1){
        alert('date is not permitted')
    }

    else {



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
            activityMutateOrUpdateArg : '1',
            activityHoursArg : this.state.activityHours
        }
    }).then(res => {
      // console.log(res)
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
              activityMutateOrUpdateArg : this.state.activityid,
              activityHoursArg : this.state.activityHours
            }
        }).then(res => {
          // console.log(res)
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

    const myprofile = this.props.data.myProfile  &&  this.props.data.myProfile != undefined ? this.props.data.myProfile : false

    // console.log("ddddddddddddddd", this.props, this.state.activityTypeArg)

    const projects_list  = this.props.getProjectsQuery.allProjects  &&  this.props.getProjectsQuery.allProjects != undefined ? this.props.getProjectsQuery.allProjects : []

    const projects_options  = myprofile.projectsInvolved  &&  myprofile.projectsInvolved != undefined ? myprofile.projectsInvolved : []
    const projects_options_render = projects_options.map((project) => {
      return(
        <option key={project.id} value={project.id}>{project.projectName}</option>
      )
    })


    // const activity_types_options  = this.props.getActivityTypesQuery.allActivityTypes  &&  this.props.getActivityTypesQuery.allActivityTypes != undefined ? this.props.getActivityTypesQuery.allActivityTypes : []
    // const activity_types_options_render = activity_types_options.map((activity_type) => {
    //   return(
    //     <option key={activity_type.id} value={activity_type.id}>{activity_type.activityTypeName}</option>
    //   )
    // })


    let activity_types_options_render;
    projects_list.map((pi) => {

      if(pi.id === this.state.activityProjectArg){
        // console.log("piiiiiiiiiiiii", pi)
        activity_types_options_render = pi.activitiesInvolved.map((ai) => {
            return(
              <option key={ai.id} value={ai.id}>{ai.activityTypeName}</option>
            )
        })
      }
    })


    let myelem = <div></div>
    if(this.state.datid){
      myelem = <CustomOptions handleDropDown={this.handleDropDown} activityTypeId={this.state.activityTypeArg} activityTypeName={this.state.activityTypeName} filter_attrib={this.state.filter_attrib} />
    }


    const my_form =
            <form className ="activity-form"  onSubmit={this.handleActivityFormSubmit}>

              <label className="activity-form-input-label">Project</label>
              <select name="activityProjectArg" value={this.state.activityProjectArg} onChange={this.handlePChange} className="activity-form-input">
                 <option value="select">--select--</option>
                 {projects_options_render}
              </select>


              <label className="activity-form-input-label">Activity Type</label>
              <select name="activityTypeArg" value={this.state.activityTypeArg} onChange={this.handleATChange} className="activity-form-input">
                  <option value="select">--select--</option>
                  {activity_types_options_render}
              </select>

              <label className="activity-form-input-label">Activity type Id</label>
              <input className="activity-form-input"  type="text" onChange={this.handleChange2} name="filter_attrib" value={this.state.filter_attrib}/>
              {myelem}

              <label  className="activity-form-input-label" htmlFor="activityDescriptionArg">Description</label>
              <input className="activity-form-input" size="60" type="text" onChange={this.handleChange} id="activityDescriptionArg" name="activityDescriptionArg" value={this.state.activityDescriptionArg} />

              <label className="activity-form-input-label">Date</label>
              <input className="activity-form-input"  type="date" onChange={this.handleChange} name="activityDate" value={this.state.activityDate} />

              <label className="activity-form-input-label">Start Time</label>
              <input type="time" className="activity-form-input" onChange={this.handleChange} name="activityStartTime" value={this.state.activityStartTime} />

              <label className="activity-form-input-label">End Time</label>
              <input type="time" className="activity-form-input" onChange={this.handleChange} name="activityEndTime" value={this.state.activityEndTime} />

              <label className="activity-form-input-label">Hours</label>
              <input type="text" size="4" className="activity-form-input" disabled value={this.state.activityHours} />


              <button className="activity-form-submit-button">{this.state.submit_button_content}</button>
            </form>


    let button_class = ''
    if(this.state.display_form){
      button_class = "cancel-button"
    } else {
      button_class = "add-activity-button"
    }

    let formWrap = 'my-wrap'

    if(!this.state.display_form){
      formWrap = "form-wrap-none"
    }


    return(
      <React.Fragment>
      <div className="activities-header">
        <div className="activities-title">{this.state.title}</div>
        <button onClick={this.handleDisplayForm} className={button_class}>{this.state.button_content}</button>
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
    graphql(getProfileQuery, {
      options : (props) => {
        return {
          variables : {
            user : props.user
          }
        }
      }
    }),
)(ActivityFormN);
