import React , {Component} from 'react'
import {getProjectsQuery, getActivityTypesQuery, getUsersQuery, getActivityTypeIdentifiersQuery} from './queries/queries'
import { graphql, compose } from 'react-apollo';
import ActivitiesListF from './ActivitiesListF'
let moment = require('moment');




class Filter extends Component {
  constructor(props){
    super(props)

    this.state = {
      buttons : [
        {id : 1 , name : 'projects', value : 'all', active : false},
        {id : 2 , name : 'types', value : 'all', active : false},
        {id : 3 , name : 'users', value : 'all', active : false},
        {id : 4 , name : 'typeidens', value : 'all', active : false},
        {id : 5 , name : 'typesubidens', value : 'all', active : false},
        {id : 6 , name : 'SD', value : '', active : false},
        {id : 7 , name : 'ED', value : '', active : false},
      ],
      which_filter : '',
      display_filter_details : false,
      projects : [],
      types : [],
      users : [],
      typeidens : [],
      typesubidens : [],
      SD : '',
      ED : '',
      filter_string : ''
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

  handleFilterSubmit = () => {
    let projects = []
    this.state.projects.map((project) => {
      if(project.status){
        projects.push(project.name)
      }
    })
    let types = []
    this.state.types.map((type) => {
      if(type.status){
        types.push(type.name)
      }
    })

    let users = []
    this.state.users.map((user) => {
      if(user.status){
        users.push(user.name)
      }
    })
    let typeidens = []
    this.state.typeidens.map((typeiden) => {
      if(typeiden.status){
        typeidens.push(typeiden.name)
      }
    })
    let typesubidens = []
    this.state.typesubidens.map((typesubiden) => {
      if(typesubiden.status){
        typesubidens.push(typesubiden.name)
      }
    })
    const filter = {
      projects : projects,
      types : types,
      users : users,
      typeidens : typeidens,
      typesubidens : typesubidens,
      SD : this.state.SD,
      ED : this.state.ED
    }
    console.log(filter)
    const filter_string = JSON.stringify(filter);
    this.setState({
      filter_string : filter_string
    })
  }


  componentDidMount(){

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let todaydate = yyyy + '-' + dd + '-' + mm;

    if(this.props.getProjectsQuery.allProjects != undefined && this.props.getActivityTypesQuery.allActivityTypes !=undefined && this.props.getUsersQuery.users !=undefined && this.props.getActivityTypeIdentifiersQuery.allActivityTypeIdentifiers ){
    this.setState({
      projects : this.props.getProjectsQuery.allProjects.map((project) => { return({name : project.projectName, status : true})}),
      types : this.props.getActivityTypesQuery.allActivityTypes.map((activity_type) => { return({name : activity_type.activityTypeName, status : true})}),
      users : this.props.getUsersQuery.users.map((user) => { return({name : user.username, status : true})}),
      typeidens : this.props.getActivityTypeIdentifiersQuery.allActivityTypeIdentifiers.map((typeiden) => { return({name : typeiden.activityTypeIdentifierName, type : typeiden.activityType.activityTypeName ,status : true})}),
      typesubidens : [{name : "CR", status : true},{name : "FTR", status : true},{name : "Other", status : true}],
      SD : todaydate,
      ED : todaydate,
      buttons : [
        {id : 1 , name : 'projects', value : 'all' , active : false},
        {id : 2 , name : 'types', value : 'all', active : false},
        {id : 3 , name : 'users', value : 'all', active : false},
        {id : 4 , name : 'typeidens', value : 'all', active : false},
        {id : 5 , name : 'typesubidens', value : 'all', active : false},
        {id : 6 , name : 'SD', value : todaydate, active : false},
        {id : 7 , name : 'ED', value : todaydate, active : false},
      ]
    })
  }
  }

  componentDidUpdate(prevProps){

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    let todaydate = yyyy + '-' + dd + '-' + mm;

      if (this.props !== prevProps) {
        console.log("updated props", this.props)
            if(this.props.getProjectsQuery.allProjects != undefined && this.props.getActivityTypesQuery.allActivityTypes !=undefined && this.props.getUsersQuery.users !=undefined && this.props.getActivityTypeIdentifiersQuery.allActivityTypeIdentifiers ){
            this.setState({
              projects : this.props.getProjectsQuery.allProjects.map((project) => { return({name : project.projectName, status : true})}),
              types : this.props.getActivityTypesQuery.allActivityTypes.map((activity_type) => { return({name : activity_type.activityTypeName, status : true})}),
              users : this.props.getUsersQuery.users.map((user) => { return({name : user.username, status : true})}),
              typeidens : this.props.getActivityTypeIdentifiersQuery.allActivityTypeIdentifiers.map((typeiden) => { return({name : typeiden.activityTypeIdentifierName, type : typeiden.activityType.activityTypeName ,status : true})}),
              typesubidens : [{name : "CR", status : true},{name : "FTR", status : true},{name : "Other", status : true}],
              SD : todaydate,
              ED : todaydate,
              buttons : [
                {id : 1 , name : 'projects', value : 'all' , active : false},
                {id : 2 , name : 'types', value : 'all', active : false},
                {id : 3 , name : 'users', value : 'all', active : false},
                {id : 4 , name : 'typeidens', value : 'all', active : false},
                {id : 5 , name : 'typesubidens', value : 'all', active : false},
                {id : 6 , name : 'SD', value : todaydate, active : false},
                {id : 7 , name : 'ED', value : todaydate, active : false},
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
    console.log("which bitchhhhhhhhhhhhh",which)
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
            {id : 4 , name : 'typeidens', value : state.buttons[3].value, active : state.buttons[3].active},
            {id : 5 , name : 'typesubidens', value : state.buttons[4].value, active : state.buttons[4].active},
            {id : 6 , name : 'SD', value : state.buttons[5].value, active : state.buttons[5].active},
            {id : 7 , name : 'ED', value : state.buttons[6].value, active : state.buttons[6].active},
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
              {id : 4 , name : 'typeidens', value : state.buttons[3].value, active : state.buttons[3].active},
              {id : 5 , name : 'typesubidens', value : state.buttons[4].value, active : state.buttons[4].active},
              {id : 6 , name : 'SD', value : state.buttons[5].value, active : state.buttons[5].active},
              {id : 7 , name : 'ED', value : state.buttons[6].value, active : state.buttons[6].active},
            ]
          })

        }, () => this.handleTypeChange())
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
              {id : 4 , name : 'typeidens', value : state.buttons[3].value, active : state.buttons[3].active},
              {id : 5 , name : 'typesubidens', value : state.buttons[4].value, active : state.buttons[4].active},
              {id : 6 , name : 'SD', value : state.buttons[5].value, active : state.buttons[5].active},
              {id : 7 , name : 'ED', value : state.buttons[6].value, active : state.buttons[6].active},
            ]
          })
        })
      });
    } else if(which === "typeidens") {
      console.log("eject eject")
      this.setState((state, props) => {
        return {
          [which] : state.typeidens.map((typeiden,index) => {
            if(index === id ){
              return {
                name : typeiden.name, status : !typeiden.status
              }
            } else {
              return typeiden
            }
        })};
      }, () =>{
        console.log(this.state)
        let n = 0;
        for(let i=0; i<this.state.typeidens.length;i++){
          if(this.state.typeidens[i].status){
            n = n+1
          }
        }
        this.setState((state) => {
          if (n === this.props.getActivityTypeIdentifiersQuery.allActivityTypeIdentifiers.length){
            n = "all"
          }
          return({
            buttons : [
              {id : 1 , name : 'projects', value : state.buttons[0].value, active : state.buttons[0].active},
              {id : 2 , name : 'types', value : state.buttons[1].value, active : state.buttons[1].active},
              {id : 3 , name : 'users', value : state.buttons[2].value , active : state.buttons[2].active},
              {id : 4 , name : 'typeidens', value : n, active : state.buttons[3].active},
              {id : 5 , name : 'typesubidens', value : state.buttons[4].value, active : state.buttons[4].active},
              {id : 6 , name : 'SD', value : state.buttons[5].value, active : state.buttons[5].active},
              {id : 7 , name : 'ED', value : state.buttons[6].value, active : state.buttons[6].active},
            ]
          })
        })
      });
    } else if(which === "typesubidens") {
      console.log("we cme to right place")
      this.setState((state, props) => {
        return {
          [which] : state.typesubidens.map((typesubiden,index) => {
            if(index === id ){
              return {
                name : typesubiden.name, status : !typesubiden.status
              }
            } else {
              return typesubiden
            }
        })};
      }, () =>{
        console.log(this.state)
        let n = 0;
        for(let i=0; i<this.state.typesubidens.length;i++){
          if(this.state.typesubidens[i].status){
            n = n+1
          }
        }
        this.setState((state) => {
          if (n === this.state.typesubidens.length){
            n = "all"
          }
          return({
            buttons : [
              {id : 1 , name : 'projects', value : state.buttons[0].value, active : state.buttons[0].active},
              {id : 2 , name : 'types', value : state.buttons[1].value, active : state.buttons[1].active},
              {id : 3 , name : 'users', value : state.buttons[2].value , active : state.buttons[2].active},
              {id : 4 , name : 'typeidens', value : state.buttons[3].value, active : state.buttons[3].active},
              {id : 5 , name : 'typesubidens', value : n, active : state.buttons[4].active},
              {id : 6 , name : 'SD', value : state.buttons[5].value, active : state.buttons[5].active},
              {id : 7 , name : 'ED', value : state.buttons[6].value, active : state.buttons[6].active},
            ]
          })
        })
      });

    } else {

    }
  }

  handleDate = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    }, () => {

      this.setState((state) => {
        console.log("updateeeee", state.SD)
        return({
          buttons : [
            {id : 1 , name : 'projects', value : state.buttons[0].value, active : state.buttons[0].active},
            {id : 2 , name : 'types', value : state.buttons[1].value, active : state.buttons[1].active},
            {id : 3 , name : 'users', value : state.buttons[2].value , active : state.buttons[2].active},
            {id : 4 , name : 'typeidens', value : state.buttons[3].value, active : state.buttons[3].active},
            {id : 5 , name : 'typesubidens', value : state.buttons[4].value, active : state.buttons[4].active},
            {id : 6 , name : 'SD', value : state.SD, active : state.buttons[5].active},
            {id : 7 , name : 'ED', value : state.ED, active : state.buttons[6].active},
          ]
        })
      })
    })
  }


  handleTypeChange = () => {
    let req = []
    this.state.types.map((type) => {
      if(type.status){
        req.push(type.name)
      }
      return null;
    })
    console.log(req)
    let reqtis = []

    reqtis = this.props.getActivityTypeIdentifiersQuery.allActivityTypeIdentifiers.filter((typeiden) => {
      return (
        req.includes(typeiden.activityType.activityTypeName)
      )
    })
    console.log("reqqqq", reqtis)
    let finmat = []
    reqtis.map((tf, index) => {

        finmat.push({
          name : reqtis[index].activityTypeIdentifierName,
          type : reqtis[index].activityType.activityTypeName ,
          status : true})

      return null;
    })
    console.log("finmattt", finmat)
    this.setState({
      typeidens : finmat
    }, () =>{
      console.log(this.state)
      let n = 0;
      for(let i=0; i<this.state.typeidens.length;i++){
        if(this.state.typeidens[i].status){
          n = n+1
        }
      }
      this.setState((state) => {
        if (n === this.props.getActivityTypeIdentifiersQuery.allActivityTypeIdentifiers.length){
          n = "all"
        }
        return({
          buttons : [
            {id : 1 , name : 'projects', value : state.buttons[0].value, active : state.buttons[0].active},
            {id : 2 , name : 'types', value : state.buttons[1].value, active : state.buttons[1].active},
            {id : 3 , name : 'users', value : state.buttons[2].value , active : state.buttons[2].active},
            {id : 4 , name : 'typeidens', value : n, active : state.buttons[3].active},
            {id : 5 , name : 'typesubidens', value : state.buttons[4].value, active : state.buttons[4].active},
            {id : 6 , name : 'SD', value : state.buttons[5].value, active : state.buttons[5].active},
            {id : 7 , name : 'ED', value : state.buttons[6].value, active : state.buttons[6].active},
          ]
        })
      })
    })
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

      } else if(this.state.which_filter === 'typeidens') {

        display_filter_details_render = this.state.typeidens.map((item, index) => {
          let button_here_class = "filter-sub-item-selected"
            if(item.status){
              button_here_class  = "filter-sub-item-selected"
            } else {
              button_here_class = "filter-sub-item-deselected"
            }
            return(<button key={index} className={button_here_class} onClick={() => this.deleteItem("typeidens", index)}>{item.name}</button>)})

      } else if(this.state.which_filter === 'typesubidens') {
        display_filter_details_render = this.state.typesubidens.map((item, index) => {
          let button_here_class = "filter-sub-item-selected"
            if(item.status){
              button_here_class  = "filter-sub-item-selected"
            } else {
              button_here_class = "filter-sub-item-deselected"
            }
            return(<button key={index} className={button_here_class} onClick={() => this.deleteItem("typesubidens", index)}>{item.name}</button>)})
      } else if(this.state.which_filter === 'SD') {

        display_filter_details_render = <input type="date" name="SD" className="filter-date" onChange={this.handleDate} value={this.state.SD}/>
          // let button_here_class = "filter-sub-item-selected"
          //   if(item.status){
          //     button_here_class  = "filter-sub-item-selected"
          //   } else {
          //     button_here_class = "filter-sub-item-deselected"
          //   }

      } else if(this.state.which_filter === 'ED') {
        display_filter_details_render = <input type="date" name="ED" className="filter-date" onChange={this.handleDate} value={this.state.ED}/>

      } else {
        filter_details_class = "filter-details-none"
      }
    }

    const closebutton  = <button className="close-filter-drop" onClick={this.handleCloseFilterDrop}>❌</button>
    // const closebutton = <img className="pacman" src={require('../images/close.svg')}  />
    return(
      <div className="filter-container">
        <div className="filter-bar">
          <div>
            <div>{buttons_render}</div>
            <button className="filter-things" onClick={this.handleFilterSubmit}>Filter</button>
          </div>
          <div className={filter_details_class}><div>{display_filter_details_render}</div><div>{closebutton}</div></div>
        </div>
        <ActivitiesListF filter_criteria={this.state.filter_string}/>
      </div>
    )
  }
}



export default compose(
    graphql(getProjectsQuery, { name: "getProjectsQuery" }),
    graphql(getActivityTypesQuery, {name : "getActivityTypesQuery"}),
    graphql(getUsersQuery, {name : "getUsersQuery"}),
    graphql(getActivityTypeIdentifiersQuery, {
      name: "getActivityTypeIdentifiersQuery",
      options : (props) => {
        return {
          variables : {
            search : "0"
          }
        }
      }
    }),
  )(Filter)
