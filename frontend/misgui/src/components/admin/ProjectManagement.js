import React , {Component} from 'react'
import { updateProject ,getProjectsQuery, getMe, getActivityTypesQuery, createProject} from '../queries/queries'
import { graphql, compose } from 'react-apollo';


class ProjectManagement extends Component {

  constructor(props){
    super(props)
    this.state = {
      filterInput : '',
      displayName : '',
      projectDesc : 'ZZZZ',
      project : '',
      displayForm : false,
      involved_activity_types : [],
      not_involved_activity_types : [],
      button_name : 'Update Project',
      proPic : '',

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

  handleButtonPress = (project) => {
    this.buttonPressTimer = setTimeout(() => {
      // console.log("long press activated")
      // console.log(activity)
      // const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false
      // const allprofiles = this.props.getProfilesQuery.allProfiles  &&  this.props.getProfilesQuery.allProfiles  != undefined ? this.props.getProfilesQuery.allProfiles  : []
      const allprojects = this.props.getProjectsQuery.allProjects  &&  this.props.getProjectsQuery.allProjects  != undefined ? this.props.getProjectsQuery.allProjects  : []

      const activity_types  = this.props.getActivityTypesQuery.allActivityTypes  &&  this.props.getActivityTypesQuery.allActivityTypes != undefined ? this.props.getActivityTypesQuery.allActivityTypes : []


      let involved_activity_types = []
      let not_involved_activity_types = []

      if(project.activitiesInvolved.length === 0){
          activity_types.map((at) => {
            not_involved_activity_types.push(at)
          })
      } else {
        activity_types.map((at) => {
          let matched = false
          project.activitiesInvolved.map((ati) => {
            if(at.id === ati.id){
              matched = true
            }
          })
          if(matched){
            involved_activity_types.push(at)
          } else {
            not_involved_activity_types.push(at)
          }
        })
      }



      this.setState({
        displayName : project.projectName,
        projectDesc : project.projectDesc,
        project : project.id,
        displayForm : true,
        involved_activity_types : involved_activity_types,
        not_involved_activity_types : not_involved_activity_types,
        proPic : project.projectPic,
        button_name : 'Update Project',
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

    let buildInvActTypes = []

    this.state.involved_activity_types.map((iat) => {
      buildInvActTypes.push(iat.id)
    })

    let invActTypesString = JSON.stringify({invActTypes : buildInvActTypes})


    if(this.state.button_name === 'Update Project') {

    this.props.updateProject({
        variables: {
          project: this.state.project,
          projectDesc: this.state.projectDesc,
          projectPic: this.state.proPic,
          invActTypes : invActTypesString
        }
    }).then(res => {
      // console.log(res)
      //window.location.reload()
      //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
      // this.clearForm()
      // this.handleDisplayForm()
      // this.props.handleReturnSubmit()
      this.props.getProjectsQuery.refetch()
      // console.log(res)
      this.setState({
        displayForm : false
      })
    }).catch(err => {
      console.log("error aya")
    });

  } else if(this.state.button_name === 'Create Project'){

    this.props.createProject({
        variables: {
          projectName: this.state.displayName,
          projectDesc: this.state.projectDesc,
          projectPic: this.state.proPic,
          invActTypes : invActTypesString
        }
    }).then(res => {
      // console.log(res)
      //window.location.reload()
      //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
      // this.clearForm()
      // this.handleDisplayForm()
      // this.props.handleReturnSubmit()
      this.props.getProjectsQuery.refetch()
      // console.log(res)
      this.setState({
        displayForm : false
      })
    }).catch(err => {
      console.log("error aya")
    });
  }

  }


  handleInvActivityTypesChange = (at, wf) => {

    let new_inv_activity_types = [];
    let new_not_inv_activity_types = [];

    if(wf === 'add'){

      // console.log("addddd")
      this.state.not_involved_activity_types.map((sniat) => {
        if(sniat.id !== at.id){
          new_not_inv_activity_types.push(sniat)
        }
      })

      new_inv_activity_types = this.state.involved_activity_types

      new_inv_activity_types.push(at)

    } else if(wf === 'del'){
      this.state.involved_activity_types.map((siat) => {
        if(siat.id !== at.id){
          new_inv_activity_types.push(siat)
        }
      })

      new_not_inv_activity_types = this.state.not_involved_activity_types

      new_not_inv_activity_types.push(at)

    }
    this.setState({
      involved_activity_types : new_inv_activity_types,
      not_involved_activity_types : new_not_inv_activity_types
    })

  }


  handleCloseForm = () => {
    this.setState({
      displayForm : false,
    })
  }


  handlePicUpload = () => {
    this.refs.myfile.click()
  }


  getBase64 = (file) => {
   var reader = new FileReader();
     reader.readAsDataURL(file);

     // console.log("file type is blobbb")

   reader.onload =  () => {
     // console.log(reader.result);
     this.setState({
       proPic : reader.result
     })
   };
   reader.onerror =  (error) => {
     console.log('Error: ', error);
   };
 }


 changedFile = (e) => {
   // console.log(this.files)
   this.setState({
     file : e.target.value
   })
   const selectedFile = this.refs.myfile.files[0];
   // console.log(selectedFile)

   if(e.target.value !== '' && e.target.value !== null){
     if(selectedFile.size > 3000000){

       alert('your file size is overwhelming 🙏')
     } else if(e.target.value.split('.').pop() !== 'jpg' && e.target.value.split('.').pop() !== 'png'  && e.target.value.split('.').pop() !== 'jpeg'){
         alert('file type is not allowed')
     } else {
       this.getBase64(selectedFile)



     }
   }
   else {
     alert('You havent selected any file 🙏')
   }
   };


   handleCreateProject = () => {
     const activity_types  = this.props.getActivityTypesQuery.allActivityTypes  &&  this.props.getActivityTypesQuery.allActivityTypes != undefined ? this.props.getActivityTypesQuery.allActivityTypes : []
     let involved_activity_types = []
     let not_involved_activity_types = []

     activity_types.map((at) => {
       not_involved_activity_types.push(at)
     })

     this.setState({
       displayName : '',
       projectDesc : '',
       displayForm : true,
       involved_activity_types : involved_activity_types,
       not_involved_activity_types : not_involved_activity_types,
       proPic : '',
       button_name : 'Create Project'
     })
   }


  render(){

    // console.log("state....",this.state)

    // const profiles = this.props.getProfilesQuery.allProfiles  &&  this.props.getProfilesQuery.allProfiles != undefined ? this.props.getProfilesQuery.allProfiles : []

    const allprojects = this.props.getProjectsQuery.allProjects  &&  this.props.getProjectsQuery.allProjects  != undefined ? this.props.getProjectsQuery.allProjects  : []

    const activity_types  = this.props.getActivityTypesQuery.allActivityTypes  &&  this.props.getActivityTypesQuery.allActivityTypes != undefined ? this.props.getActivityTypesQuery.allActivityTypes : []

    let projects_render;

    projects_render = allprojects.map((project) => {
      // <td className="activity-sub-item-div-6">{activity.activityStartTime.toString().substring(0,19)}</td>
      // <td className="activity-sub-item-div-7">{activity.activityEndTime.toString().substring(0,19)}</td>
      if(project.projectName.includes(this.state.filterInput)){
        return(
          <tr key={project.id} className="activity-item-div" onMouseDown={() => this.handleButtonPress(project)} onMouseUp={this.handleButtonRelease} onMouseLeave={this.handleButtonRelease}>
            <td className="ttc">{project.projectName}</td>

            <td className="ttc">{project.activitiesInvolved.length} Activities</td>
          </tr>
        )
      }
    })

    let updateformclassname = "none"

    if(this.state.displayForm){
      updateformclassname = "update-profile-div"
    }


    let involved_activity_types_render;
    involved_activity_types_render = this.state.involved_activity_types.map((iat, index) => {
      return(
        <div className="inv-projs-button" onClick={() => this.handleInvActivityTypesChange(iat, "del")} key={index}>{iat.activityTypeName}</div>
      )
    })

    let not_involved_activity_types_render;
    not_involved_activity_types_render = this.state.not_involved_activity_types.map((niat, index) => {
      return(
        <div className="inv-projs-button" onClick={() => this.handleInvActivityTypesChange(niat, "add")} key={index}>{niat.activityTypeName}</div>
      )
    })



    // console.log(this.props)
    return(
      <div className="admin-sub-div">
      <div className="filter-details-my">
        <input placeholder="Search Users Here" name="filterInput" className="filter-items-filter-my" type="text" onChange={this.handleFilterInputChange} value={this.state.filterInput} />
        <div className="title-button-div">
        <div className="activities-title">Projects List</div>
        <button className="add-activity-button" onClick={this.handleCreateProject}>Create Project</button>
        </div>
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
                <g>
                  <rect className="myrectforpic" onClick={this.handlePicUpload} x="82" y="150" width="40" height="30" />
                  <text className="mytextsvg" onClick={this.handlePicUpload} x="92" y="173" fill="red">+</text>
                </g>
            </svg>
            <input  className="none" type="file" id="file" ref="myfile" onChange={this.changedFile} />
            <input  className="display-name-update" placeholder="enter project name" onChange={this.handleFilterInputChange} id="displayName" name="displayName" value={this.state.displayName}/>
            </div>
            <button onClick={this.handleCloseForm} className="profile-close-button">Close</button>
          </div>
          <div className="flex-r-100pc">
            <label  className="update-profile-label" htmlFor="projectDesc">Project Desc</label>
            <input className="update-profile-input" placeholder="enter project description" type="text" onChange={this.handleFilterInputChange} id="projectDesc" name="projectDesc" value={this.state.projectDesc} />
          </div>
          <div className="projects-inv-div">
            <div className="inv-heading br-0 bl-0"><div className="inv-heading-name br-0">Not Involved Activity Types</div><div  className="inv-heading-conts br-0">{not_involved_activity_types_render}</div></div>
            <div className="inv-heading br-0"><div className="inv-heading-name">Involved Activity Types</div><div  className="inv-heading-conts">{involved_activity_types_render}</div></div>
          </div>

          <button  onClick={this.handleUpdateProject} className="profile-update-button">{this.state.button_name}</button>
        </div>
      </div>
      <div className="profiles-table-div">
        <table>
          <tbody>
            {projects_render}
          </tbody>
        </table>
      </div>
      </div>
    )
  }
}


export default compose(
    graphql(createProject, {name : "createProject"}),
    graphql(updateProject, {name : "updateProject"}),
    graphql(getProjectsQuery, { name: "getProjectsQuery" }),
    graphql(getMe, {name : "getMe"}),
    graphql(getActivityTypesQuery, {name : "getActivityTypesQuery"}),
  )(ProjectManagement)
