import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import {getActivitiesQuery, createActivityMutation, getProjectsQuery, getBugsQuery} from './queries/queries'
import Header from './Header'

class Activities extends Component {

  constructor(props){
    super(props)

    this.state = {
      display_form : false,
      button_content : 'Add Activity +'
    }
  }

  handleDisplayForm = () => {
    if(!this.state.display_form){
    this.setState({
      display_form : true,
      button_content : 'Cancel'
    })
  } else {
    this.setState({
      display_form : false,
      button_content : 'Add Activity +'
    })
  }
  }


  // datetimeformat = () => {
  //   let today = new Date();
  //   let dd = String(today.getDate()).padStart(2, '0');
  //   let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  //   let yyyy = today.getFullYear();
  //
  //   today = yyyy + '-' + mm + '-' + dd;
  //
  //
  //   return today
  // }


  render() {
//     const activities_list = this.props.data.allActivities
//     console.log(activities_list);
//
//     const activities_list_render = activities_list.map((activity,index) =>
//       <div key={activity.index}>
//         {activity.index}
//       </div>
//     )
//
//
//     {({ data: { todos, visibilityFilter } }) => (
//   <ul>
//     {getVisibleTodos(todos, visibilityFilter).map(todo => (
//       <Todo key={todo.id} {...todo} />
//     ))}
//   </ul>
// )}
    //const activities = this.props.data.allActivities.map(() => <div>bro</div>)

    let my_form = null
    if(this.state.display_form){
      my_form = <form className ="registration-form"  onSubmit={this.handleSubmit}>

          <label className="activity-form-input-label">Project</label>
          <select className="activity-form-input">
              <option>Vidyakaushal</option>
              <option>Vidyasaarathi</option>
              <option>GST</option>
             <option>CRA</option>
              <option>Vidyalakshmi</option>
          </select>

          <label className="activity-form-input-label">Type</label>
          <select className="activity-form-input">
              <option>Bug</option>
              <option>Lunch</option>
              <option>Help</option>
             <option>CRA</option>
          </select>

          <label className="activity-form-input-label">Type-ID</label>
          <select className="activity-form-input">
              <option>1234</option>
              <option>4321</option>
              <option>3395</option>
             <option>5676</option>
          </select>


          <label  className="activity-form-input-label">Description</label>
          <input className="activity-form-input" required  name="module_details" type="text" id='details'onChange={this.handleChange} name ="details" value={this.state.details} />



          <label className="activity-form-input-label">Date</label>
          <input className="activity-form-input" required  type="date"/>

          <label className="activity-form-input-label" for="start">Start Time</label>
          <input type="time"  required name="start_time"className="activity-form-input" name="appt" min="9:00" max="22:00" required></input>

          <label className="activity-form-input-label" for="stop">End Time</label>
          <input type="time"   className="activity-form-input"  name="stop_time" min="9:00" max="22:00" required></input>

          <button className="login-button">Submit</button>
        </form>
    }

    let button_class = ''
    if(this.state.display_form){
      button_class = "cancel-button"
    } else {
      button_class = "login-button"
    }



    console.log(this.props);
    //console.log("all activities", this.props.data.allActivities)

    const activities = this.props.getActivitiesQuery.allActivities  &&  this.props.getActivitiesQuery.allActivities != undefined ? this.props.getActivitiesQuery.allActivities : []
    const activities_render = activities.reverse().map((activity, index) => {return(
      <div className="activity-item-div" key={index}>
          <div className="activity-sub-item-div-2">{activity.activityProject.projectName}</div>
          <div className="activity-sub-item-div-3">{activity.activityType.activityTypeName}</div>
          <div className="activity-sub-item-div-4">{activity.activityTypeIdentifier}</div>
          <div className="activity-sub-item-div-5">{activity.activityDescription}</div>
          <div className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</div>
          <div className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</div>
      </div>)})


    return (
      <div className="activities-container">
        <Header />
        <div className="activities-header">
          <div>Activities</div>
          <div className="add-activity"><button onClick={this.handleDisplayForm} className={button_class}>{this.state.button_content}</button></div>
        </div>
        {my_form}
        <div className="activities-div">{activities_render}</div>
      </div>
    );
  }
}


// export default compose(
//     //graphql(createActivityMutation, { name: "createActivityMutation" }),
//     graphql(getActivitiesQuery, { name: "getActivitiesQuery" })
//     // graphql(getBugsQuery, { name: "getBugsQuery" }),
//     // graphql(getProjectsQuery, { name: "getProjectsQuery" })
// )(Activities);



//export default graphql(getActivitiesQuery)(Activities);


export default compose(
    graphql(getActivitiesQuery, { name: "getActivitiesQuery" }),
    graphql(createActivityMutation, { name: "createActivityMutation" }),
    graphql(getBugsQuery, { name: "getBugsQuery" }),
    graphql(getProjectsQuery, { name: "getProjectsQuery" })

)(Activities);
