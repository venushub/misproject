import React , {Component} from 'react'
import {getProjectsQuery} from './queries/queries'
import { graphql, compose } from 'react-apollo';



class Filter extends Component {
  constructor(props){
    super(props)

    this.state = {
      buttons : [
        {id : 1 , name : 'projects', value : 'all'},
        {id : 2 , name : 'types', value : 'all'}
      ],
      which_filter : '',
      display_filter_details : true,
      projects : []
    }
  }


  handleFilterButtonClick = (id) => {
    this.setState({
      which_filter : id
    })
  }



  componentDidMount(){

    if(this.props.getProjectsQuery.allProjects != undefined){
      this.setState({
        projects : this.props.getProjectsQuery.allProjects.map((project) => project.projectName)
      })
    }
  }

  componentDidUpdate(prevProps){
      if (this.props !== prevProps) {
            if(this.props.getProjectsQuery.allProjects != undefined){

        this.setState({
          projects : this.props.getProjectsQuery.allProjects.map((project) => project.projectName)
        })
      }
      }
  }





  deleteItem = (which, id) => {
    // // console.log(prevState)
    // console.log(which)
    // console.log(id)
    this.setState((state, props) => {
      return {
        projects : state.projects.filter((value, index, arr) => {
        return index !== id;
      })};
    }, () => console.log(this.state));
  }


  render(){

    console.log(this.props)
    console.log(this.state)

    const buttons_render = this.state.buttons.map((button) => {
      return(
        <button key={button.id} onClick={() => this.handleFilterButtonClick(button.name)} className="filter-button">{button.name} - {button.value}</button>
      )
    })

    let display_filter_details_render = <div></div>

    if(this.state.display_filter_details) {
      if(this.state.which_filter === 'projects'){
          display_filter_details_render = <div className="filter-details">{this.state.projects.map((item, index) => {return(<div key={index}><div>{item}</div><button onClick={() => this.deleteItem("projects", index)}>Delete</button></div>)})}</div>
      }
      else if(this.state.which_filter === 'types') {
        display_filter_details_render = <div className="filter-details">{this.state.filter.types}</div>
      } else {

      }
    }

    return(
      <div className="filter-container">
        <div className="filter-bar">
          {buttons_render}
        </div>
        {display_filter_details_render}
      </div>
    )
  }

}

export default compose(
    graphql(getProjectsQuery, { name: "getProjectsQuery" }),
  )(Filter)
