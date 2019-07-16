// handleUpdateProject = (e) => {
//   e.preventDefault()
//
//   let buildInvActTypes = []
//
//   this.state.involved_activity_types.map((iat) => {
//     buildInvActTypes.push(iat.id)
//   })
//
//   let invActTypesString = JSON.stringify({invActTypes : buildInvActTypes})
//
//
//   if(this.state.button_name === 'Update Project') {
//
//   this.props.updateProject({
//       variables: {
//         project: this.state.project,
//         projectDesc: this.state.projectDesc,
//         projectPic: this.state.proPic,
//         invActTypes : invActTypesString
//       }
//   }).then(res => {
//     // console.log(res)
//     //window.location.reload()
//     //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
//     // this.clearForm()
//     // this.handleDisplayForm()
//     // this.props.handleReturnSubmit()
//     this.props.getProjectsQuery.refetch()
//     console.log(res)
//     this.setState({
//       displayForm : false
//     })
//   }).catch(err => {
//     console.log("error aya")
//   });
//
// } else if(this.state.button_name === 'Create Project'){
//
//   this.props.createProject({
//       variables: {
//         projectName: this.state.displayName,
//         projectDesc: this.state.projectDesc,
//         projectPic: this.state.proPic,
//         invActTypes : invActTypesString
//       }
//   }).then(res => {
//     // console.log(res)
//     //window.location.reload()
//     //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
//     // this.clearForm()
//     // this.handleDisplayForm()
//     // this.props.handleReturnSubmit()
//     this.props.getProjectsQuery.refetch()
//     console.log(res)
//     this.setState({
//       displayForm : false
//     })
//   }).catch(err => {
//     console.log("error aya")
//   });
//
//
// }
// }
//
//
// handleCreateProject = () => {
//   const activity_types  = this.props.getActivityTypesQuery.allActivityTypes  &&  this.props.getActivityTypesQuery.allActivityTypes != undefined ? this.props.getActivityTypesQuery.allActivityTypes : []
//   let involved_activity_types = []
//   let not_involved_activity_types = []
//
//   activity_types.map((at) => {
//     not_involved_activity_types.push(at)
//   })
//
//   this.setState({
//     displayName : '',
//     projectDesc : '',
//     displayForm : true,
//     involved_activity_types : involved_activity_types,
//     not_involved_activity_types : not_involved_activity_types,
//     proPic : '',
//     button_name : 'Create Project'
//   })
// }


import React, {Component} from 'react'
import { getActivityTypeIdentifiersQuery, createActivityTypeIdentifierMutation, createActivityType, updateActivityType } from '../queries/queries';
import { graphql, compose } from 'react-apollo';


class ActivityTypesInside extends Component {

  constructor(props){
    super(props)
    this.state = {
      activityType : {},
      displayName : '',
      displayForm : false,
      requiredField : 'Y',
      activityTypeIds : [],
      activityTypeIdentifierSubCat : '',
      activityTypeIdentifierName : '',
      activityTypeName : '',
      activityTypeDesc : '',
      button_name : ''
    }
  }


  componentDidMount(){
    let at =  this.props.activityType  &&  this.props.activityType!= undefined ? this.props.activityType : {}
    let atis =  this.props.data.allActivityTypeIdentifiers  && this.props.data.allActivityTypeIdentifiers != undefined ? this.props.data.allActivityTypeIdentifiers : []


    if(this.props.button_name === 'Create Activity Type'){
      this.setState({
        activityType : at,
        activityTypeIds : atis,
        activityTypeName : '',
        activityTypeDesc : '',
        button_name : 'Create Activity Type',
        displayForm : false
      })
    } else if(this.props.button_name === 'Update Activity Type'){
      this.setState({
        activityType : at,
        activityTypeIds : atis,
        activityTypeName : at.activityTypeName,
        activityTypeDesc : at.activityTypeDesc,
        button_name : 'Update Activity Type',
        displayForm : false
      })
    } else {
      this.setState({
        displayForm : false
      })
    }
  }

  componentDidUpdate(prevProps){
      if (this.props.activityType !== prevProps.activityType || this.props.button_name !== prevProps.button_name) {
        let at =  this.props.activityType  &&  this.props.activityType!= undefined ? this.props.activityType : {}
        let atis =  this.props.data.allActivityTypeIdentifiers  && this.props.data.allActivityTypeIdentifiers != undefined ? this.props.data.allActivityTypeIdentifiers : []

        if(this.props.button_name === 'Create Activity Type'){
          this.setState({
            activityType : at,
            activityTypeIds : atis,
            activityTypeName : '',
            activityTypeDesc : '',
            button_name : 'Create Activity Type',
            displayForm : true
          })
        } else if(this.props.button_name === 'Update Activity Type'){
          this.setState({
            activityType : at,
            activityTypeIds : atis,
            activityTypeName : at.activityTypeName,
            activityTypeDesc : at.activityTypeDesc,
            button_name : 'Update Activity Type',
            displayForm : true
          })
        } else {
          this.setState({
            displayForm : false
          })
        }
      }
  }



  handleChange =(e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleCreateATI = () => {
    console.log("tis should not happen")
    this.props.createActivityTypeIdentifierMutation({
        variables: {
            activityType: this.state.activityType.id,
            activityTypeIdentifierName: this.state.activityTypeIdentifierName,
            activityTypeIdentifierSubCat : this.state.activityTypeIdentifierSubCat
        }
        // ,
        // refetchQueries: [{
        //         query: getActivityTypeIdentifiersQuery,
        //         variables : {search : this.props.activityTypeId}
        // }]


    }).then(res => {
      // console.log(res)
      //window.location.reload()
      // this.props.handleDropDown(res.data.createActivityTypeIdentifier.id, res.data.createActivityTypeIdentifier.activityTypeIdentifierName)
      //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
      //this.props.history.push('/activities');
      this.props.data.refetch()
      console.log("success")
    }).catch(err => {
      console.log("error aya")
    });
  }

  handleUpdateActivitytype = (e) => {

    if(this.state.button_name === 'Update Activity Type') {

    this.props.updateActivityType({
        variables: {
          activityType: this.state.activityType.id,
          activityTypeDesc: this.state.activityTypeDesc,
          activityTypeRequired : this.state.requiredField
        }
    }).then(res => {
      // console.log(res)
      //window.location.reload()
      //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
      // this.clearForm()
      // this.handleDisplayForm()
      // this.props.handleReturnSubmit()
      // this.props.getProjectsQuery.refetch()
      this.props.handleRefetch()
      console.log(res)
      this.setState({
        displayForm : false
      })
    }).catch(err => {
      console.log("error aya")
    });

  } else if(this.state.button_name === 'Create Activity Type'){

    this.props.createActivityType({
        variables: {
          activityTypeName: this.state.activityTypeName,
          activityTypeDesc: this.state.activityTypeDesc,
          activityTypeRequired : this.state.requiredField
        }
    }).then(res => {
      // console.log(res)
      //window.location.reload()
      //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
      // this.clearForm()
      // this.handleDisplayForm()
      // this.props.handleReturnSubmit()
      this.props.handleRefetch()
      // console.log(res)
      this.setState({
        displayForm : false
      })
    }).catch(err => {
      console.log("error aya")
    });
  }

  }

  handleCloseForm = () => {
    this.setState({
      displayForm : false
    })
  }

  render(){

    console.log("aaaaaaaaa", this.props)

    let updateformclassname = "none"

    if(this.state.displayForm){
      updateformclassname = "update-profile-div"
    } else {
      updateformclassname = "none"
    }


    let atis =  this.props.data.allActivityTypeIdentifiers  && this.props.data.allActivityTypeIdentifiers != undefined ? this.props.data.allActivityTypeIdentifiers : []

    let atis_render;
    atis_render = atis.map((ati, index) => {
      return(
        <div className="inv-projs-button" key={index}>{ati.activityTypeIdentifierName}</div>
      )
    })

    let atids_render_classname ;
    let up_cn;
    let iiaf_cn;

    if(this.props.button_name === 'Create Activity Type'){
      atids_render_classname = "none"
      up_cn = "update-profile-label bb0"
      iiaf_cn = "input-in-admin-form bb0"
    } else if(this.props.button_name === 'Update Activity Type'){
      atids_render_classname = "projects-inv-div"
      up_cn = "update-profile-label"
      iiaf_cn = "input-in-admin-form"
    }



    return(
    <div className={updateformclassname}>
      <div className="profile-update-form">
        <div className="flex-r-100pc around-dotted">
          <div className="d-f">
          <input  className="display-name-update" placeholder="enter activity type name" onChange={this.handleChange} id="displayName" name="activityTypeName" value={this.state.activityTypeName}/>
          </div>
          <button onClick={this.handleCloseForm} className="profile-close-button">Close</button>
        </div>
        <div className="flex-r-100pc">
          <label  className="update-profile-label" htmlFor="projectDesc">Activity Type Desc</label>
          <input className="update-profile-input" placeholder="enter activity type description" type="text" onChange={this.handleChange} id="projectDesc" name="activityTypeDesc" value={this.state.activityTypeDesc} />
        </div>
        <div className="flex-r-100pc">
          <label  className={up_cn} htmlFor="selectRequiredIds"> Activity Type IDs Required?</label>
          <select className={iiaf_cn} id="selectRequiredIds" name="requiredField" onChange={this.handleChange} value={this.state.requiredField}>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>
        <div className={atids_render_classname}>
          <div className="inv-heading br-0 bl-0"><div className="inv-heading-name br-0">Please register Activity Type Identifiers now</div><div  className="inv-heading-conts br-0">
            <div className="register-id-div">
            <div className="d-f w-100p jc-c p-1e">
              <label className="my-up-ip-lb" htmlFor="activitytypeid">Enter Id.</label>
              <input className="my-up-ip" id="activitytypeid" type="text" name ="activityTypeIdentifierName" value={this.props.filter_attrib} onChange={this.handleChange} />
              </div>
                <div className="d-f w-100p jc-c p-1e">
              <label  className="my-up-ip-lb" htmlFor="activityTypeIdentifierSubCat">Sub type</label>
              <select className="my-up-ip" id="activityTypeIdentifierSubCat" name="activityTypeIdentifierSubCat" value={this.state.activityTypeIdentifierSubCat} onChange={this.handleChange}><option value="CR">CR</option><option value="FTR">FTR</option><option value="Other">Other</option></select>
                </div>
              <button className="register-button" onClick={this.handleCreateATI}>Register</button>
            </div>
          </div></div>
          <div className="inv-heading br-0"><div className="inv-heading-name">Involved Activity Types</div><div  className="inv-heading-conts">{atis_render}</div></div>
        </div>

        <button  onClick={this.handleUpdateActivitytype} className="profile-update-button">{this.props.button_name}</button>
      </div>
    </div>

  )
  }

}

export default compose(

graphql(getActivityTypeIdentifiersQuery, {
  options : (props) => {
    return {
      variables : {
        search : props.activityType.id
      }
    }
  }
}),
graphql(createActivityTypeIdentifierMutation, { name: "createActivityTypeIdentifierMutation" }),
graphql(createActivityType, { name: "createActivityType" }),
graphql(updateActivityType, { name: "updateActivityType" }),
)(ActivityTypesInside)
