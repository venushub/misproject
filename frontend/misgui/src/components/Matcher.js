import React, {Component} from 'react'
import {getMe, getAttendanceQuery, getUsersQuery} from './queries/queries'
import { graphql, compose } from 'react-apollo';
import Header from './Header'
import Matching from './Matching'
import UploadExcel from './UploadExcel'
import moment from 'moment'


class Matcher extends Component {

  constructor(props){

    super(props)

    this.state = {
      showuploadform : false,
      months : [
        {id : 1, name : 'January', active : false},
        {id : 2, name : 'February', active : false},
        {id : 3, name : 'March', active : false},
        {id : 4, name : 'April', active : false},
        {id : 5, name : 'May', active : false},
        {id : 6, name : 'June', active : false},
        {id : 7, name : 'July', active : false},
        {id : 8, name : 'August', active : false},
        {id : 9, name : 'September', active : false},
        {id : 10, name : 'October', active : false},
        {id : 11, name : 'November', active : false},
        {id : 12, name : 'December', active : false}
      ],
        selected_month : moment().format('M'),
      years : [
        {id : 1, name : '2019', active : false},
        {id : 1, name : '2020', active : false}
      ],
      selected_year : moment().format('YYYY'),
      usersView : false,
      filterInput : '',
      selected_user : 'select user'
    }
  }

  componentDidMount(){

    const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false

    if(me.isSuperuser){
      this.setState({
        showuploadform : true
      })
    }
  }

  componentDidUpdate(prevProps){
      if (this.props.getMe !== prevProps.getMe) {
        const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false
          if(me.isSuperuser){
            this.setState({
              showuploadform : true
            })
          }
      }
  }


  handleMonthChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleYearChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleFilterInputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleUsersView = () => {
    this.setState({
      usersView : true
    })
  }

  handleCloseFilterDrop = () => {
    this.setState({
      usersView : false
    })
  }

  selectUser = (user) => {
    this.setState({
      selected_user : user.username
    })
  }


  // componentDidMount(){
  //   const users = this.props.getUsersQuery.users  &&  this.props.getUsersQuery.users != undefined ? this.props.getUsersQuery.users : []
  //
  //   this.setState({
  //
  //   })
  // }


  render(){
    console.log("month isssss",moment().format('YYYY'))
    console.log("uuuuuuuu",this.state.selected_month, this.props)
    let upload_excel;
    if(this.state.showuploadform){
      upload_excel  = <UploadExcel />
    }

    let month_options_render = [];
    this.state.months.map((month, index) => {
      month_options_render.push(<option key={index} value={month.id}>{month.name}</option>)
    })

    let year_options_render = [];
    this.state.years.map((year, index) => {
      year_options_render.push(<option key={index} value={year.name}>{year.name}</option>)
    })


    let filter_details_class = "filter-details-none"
    if(this.state.usersView){
      filter_details_class = "filter-details"
    }


    let display_users = <div>users...</div>;

    const closebutton  = <button className="close-filter-drop" onClick={this.handleCloseFilterDrop}>❌</button>

    const users = this.props.getUsersQuery.users  &&  this.props.getUsersQuery.users != undefined ? this.props.getUsersQuery.users : []

    display_users = users.map((user, index) => {
      let button_here_class = "filter-sub-item-selected"
        if(user.username === this.state.selected_user){
          button_here_class  = "filter-sub-item-selected"
        } else {
          button_here_class = "filter-sub-item-deselected"
        }
        if(user.username.includes(this.state.filterInput)){
       return(<button key={index} className={button_here_class} onClick={() => this.selectUser(user)}>{user.username}</button>)
        }else {
          return null
        }
      }
    )


    return(
      <div>
        <Header />
        <div className="con-div">
        {upload_excel}
        <div className="selects-div">
          <div>
            <select className="select-drop" name="selected_month" onChange={this.handleMonthChange} value={this.state.selected_month}>{month_options_render}</select>
          </div>
          <div>
            <select className="select-drop" name="selected_year" onChange={this.handleYearChange} value={this.state.selected_year}>{year_options_render}</select>
          </div>
          <button  className="select-drop" onClick={this.handleUsersView} >{this.state.selected_user}</button>
        </div>
        <div className={filter_details_class}>  <input placeholder="Search Items Here" name="filterInput" className="filter-items-filter" type="text" onChange={this.handleFilterInputChange} value={this.state.filterInput} /><div className = "filter-ud"><div>{display_users}</div><div>{closebutton}</div></div></div>
        <Matching criteria={JSON.stringify({month : this.state.selected_month , year : this.state.selected_year, user : this.state.selected_user})} />
        </div>
      </div>
    )
  }
}


export default compose(
    graphql(getMe, {name : "getMe"}),
    graphql(getUsersQuery, {name : "getUsersQuery"}),
  )(Matcher)
