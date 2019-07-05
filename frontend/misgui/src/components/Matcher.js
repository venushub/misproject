import React, {Component} from 'react'
import {getMe, getAttendanceQuery} from './queries/queries'
import { graphql, compose } from 'react-apollo';
import Header from './Header'
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
        selected_month : moment().format('m'),
      years : [
        {id : 1, name : '2019', active : false},
        {id : 1, name : '2020', active : false}
      ],
      selected_year : moment().format('YYYY'),
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


  render(){

    console.log("month isssss",moment().format('YYYY'))
    console.log("ggggggg",this.state.selected_month)
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
      year_options_render.push(<option key={index} value={year.id}>{year.name}</option>)
    })

    return(
      <div>
      <Header />
      {upload_excel}
      <div>
        <select name="selected_month" onChange={this.handleMonthChange} value={this.state.selected_month}>{month_options_render}</select>
      </div>
      <div>
        <select>{year_options_render}</select>
      </div>
      </div>
    )
  }
}


export default compose(
    graphql(getMe, {name : "getMe"}),
    graphql(getAttendanceQuery, {name : "getAttendanceQuery"}),
  )(Matcher)
