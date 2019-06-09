import React , {Component} from 'react'
import {getProjectsQuery, getActivityTypesQuery, getUsersQuery} from './queries/queries'
import { graphql, compose } from 'react-apollo';



class Filter extends Component {
  constructor(props){
    super(props)

    this.state = {
      buttons : [
        {id : 1 , name : 'projects', value : 'all', active : false},
        {id : 2 , name : 'types', value : 'all', active : false},
        {id : 3 , name : 'users', value : 'all', active : false}
      ],
      which_filter : '',
      display_filter_details : false,
      projects : [],
      types : [],
      users : []
    }
  }


  handleFilterButtonClick = (id) => {
    this.setState({
      which_filter : id,
      display_filter_details : true,
      buttons : this.state.buttons.map((button) => {
        if(button.name === id){
          if(button.active !== true){
            button.active = !button.active
          }
          return button
        } else {
          button.active = false
          return button
        }
      })
    })
  }


  componentDidMount(){

    if(this.props.getProjectsQuery.allProjects != undefined){
      this.setState({
        projects : this.props.getProjectsQuery.allProjects.map((project) => { return({name : project.projectName, status : true})}),
        types : this.props.getActivityTypesQuery.allActivityTypes.map((activity_type) => { return({name : activity_type.activityTypeName, status : true})}),
        users : this.props.getUsersQuery.users.map((user) => { return({name : user.username, status : true})})
      })
    }
  }

  componentDidUpdate(prevProps){
      if (this.props !== prevProps) {
        console.log("updated props", this.props)
            if(this.props.getProjectsQuery.allProjects != undefined && this.props.getActivityTypesQuery.allActivityTypes !=undefined){
            this.setState({
              projects : this.props.getProjectsQuery.allProjects.map((project) => { return({name : project.projectName, status : true})}),
              types : this.props.getActivityTypesQuery.allActivityTypes.map((activity_type) => { return({name : activity_type.activityTypeName, status : true})}),
              users : this.props.getUsersQuery.users.map((user) => { return({name : user.username, status : true})}),
              buttons : [
                {id : 1 , name : 'projects', value : 'all' , active : false},
                {id : 2 , name : 'types', value : 'all', active : false},
                {id : 3 , name : 'users', value : 'all', active : false}
              ]
            })
      }
      }
  }

  handleCloseFilterDrop = () => {
    this.setState((state) => {
      return({
        display_filter_details : false,
        buttons : state.buttons.map((button) => {
          return {id : button.id , name : button.name, value : button.value, active : false}
        })
      }
      )
    })
  }


  deleteItem = (which, id) => {
    // // console.log(prevState)
    // console.log(which)
    // console.log(id)
    if(which === "projects"){
      this.setState((state, props) => {
      return {

        [which] : state.projects.map((project,index) => {
          if(index === id ){
            return {
              name : project.name, status : !project.status
            }
          } else {
            return project
          }
      })};
    }, () => {
      console.log(this.state)
      let n = 0;
      for(let i=0; i<this.state.projects.length;i++){
        if(this.state.projects[i].status){
          n = n+1
        }
      }
      this.setState((state) => {
        if (n === state.projects.length){
          n = "all"
        }
        return({
          buttons : [
            {id : 1 , name : 'projects', value : n , active : state.buttons[0].active},
            {id : 2 , name : 'types', value : state.buttons[1].value, active : state.buttons[1].active},
            {id : 3 , name : 'users', value : state.buttons[2].value, active : state.buttons[2].active},
          ]
        })
        
      })
    })} else if (which === "types") {
      this.setState((state, props) => {
        return {
          [which] : state.types.map((type,index) => {
            if(index === id ){
              return {
                name : type.name, status : !type.status
              }
            } else {
              return type
            }
        })};
      }, () =>{
        console.log(this.state)
        let n = 0;
        for(let i=0; i<this.state.types.length;i++){
          if(this.state.types[i].status){
            n = n+1
          }
        }
        this.setState((state) => {
          if (n === state.types.length){
            n = "all"
          }
          return({
            buttons : [
              {id : 1 , name : 'projects', value : state.buttons[0].value, active : state.buttons[0].active},
              {id : 2 , name : 'types', value : n , active : state.buttons[1].active},
              {id : 3 , name : 'users', value : state.buttons[2].value, active : state.buttons[2].active},
            ]
          })
          
        })
      });
    } else if (which === "users") {
      
      this.setState((state, props) => {
        return {
          [which] : state.users.map((user,index) => {
            if(index === id ){
              return {
                name : user.name, status : !user.status
              }
            } else {
              return user
            }
        })};
      }, () =>{
        console.log(this.state)
        let n = 0;
        for(let i=0; i<this.state.users.length;i++){
          if(this.state.users[i].status){
            n = n+1
          }
        }
        this.setState((state) => {
          if (n === state.users.length){
            n = "all"
          }
          return({
            buttons : [
              {id : 1 , name : 'projects', value : state.buttons[0].value, active : state.buttons[0].active},
              {id : 2 , name : 'types', value : state.buttons[1].value, active : state.buttons[1].active},
              {id : 3 , name : 'users', value : n , active : state.buttons[2].active},
            ]
          })
        })
      });
    }
  }


  render(){

    console.log("propsssssss", this.props)
    console.log(this.state)

    const buttons_render = this.state.buttons.map((button) => {
      let button_class_name = "filter-button"
      if(button.active) {
      button_class_name = "filter-button-active"
      }
      return(
        <button key={button.id} onClick={() => this.handleFilterButtonClick(button.name)} className={button_class_name}>{button.name} - {button.value}</button>
      )
    })

    let display_filter_details_render = <div></div>
    let filter_details_class = "filter-details-none"
    if(this.state.display_filter_details) {

      filter_details_class = "filter-details"
      
      if(this.state.which_filter === 'projects'){
        
        display_filter_details_render = this.state.projects.map((item, index) => {
          let button_here_class = "filter-sub-item-selected"
            if(item.status){
              button_here_class  = "filter-sub-item-selected"
            } else {
              button_here_class = "filter-sub-item-deselected"
            }
            return(<button key={index} className={button_here_class} onClick={() => this.deleteItem("projects", index)}>{item.name}</button>)})}
      else if(this.state.which_filter === 'types') {
        
        display_filter_details_render = this.state.types.map((item, index) => {
          let button_here_class = "filter-sub-item-selected"
            if(item.status){
              button_here_class  = "filter-sub-item-selected"
            } else {
              button_here_class = "filter-sub-item-deselected"
            }
            return(<button key={index} className={button_here_class} onClick={() => this.deleteItem("types", index)}>{item.name}</button>)})
      } else if(this.state.which_filter === 'users') {
        
        display_filter_details_render = this.state.users.map((item, index) => {
          let button_here_class = "filter-sub-item-selected"
            if(item.status){
              button_here_class  = "filter-sub-item-selected"
            } else {
              button_here_class = "filter-sub-item-deselected"
            }
            return(<button key={index} className={button_here_class} onClick={() => this.deleteItem("users", index)}>{item.name}</button>)})
     
      } else {
        filter_details_class = "filter-details-none"
      }
    }

    const closebutton  = <button className="close-filter-drop" onClick={this.handleCloseFilterDrop}>❌</button>
    // const closebutton = <img className="pacman" src={require('../images/close.svg')}  />
    return(
      <div className="filter-container">
        <div className="filter-bar">
          {buttons_render}
        </div>
        <div className={filter_details_class}><div>{display_filter_details_render}</div><div>{closebutton}</div></div>
        
      </div>
    )
  }

}

export default compose(
    graphql(getProjectsQuery, { name: "getProjectsQuery" }),
    graphql(getActivityTypesQuery, {name : "getActivityTypesQuery"}),
    graphql(getUsersQuery, {name : "getUsersQuery"}),
  )(Filter)
