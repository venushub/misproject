import React , {Component} from 'react'
import {getAttendanceFilesQuery} from './queries/queries'
import { graphql, compose } from 'react-apollo';
import moment from 'moment'
const csv=require('csvtojson')
const axios = require('axios');


class UploadExcel extends Component {
  constructor(props){
    super(props)

    this.state = {
      file : '',
      filebase64 : '',
      fileMonth : '',
      fileYear : '',
      viewFiles : false,
      filepresent : true,
      loading : true
    }
  }

  componentDidMount(){

  }



  render(){

    const allAttendanceFiles = this.props.getAttendanceFilesQuery.allAttendanceFiles  &&  this.props.getAttendanceFilesQuery.allAttendanceFiles != undefined ? this.props.getAttendanceFilesQuery.allAttendanceFiles : []

    if(!this.props.getAttendanceFilesQuery.loading){
      this.setState({
        loading : false
      })
    }

    console.log(moment().subtract(1, 'years').format('YYYY'))
    let filepresent = false;
    if(moment().format('MMMM') === 'January'){
      console.log("haaa jan hei")
      allAttendanceFiles.map((af) => {
        if(af.year === moment().subtract(1, 'years').format('YYYY')){
          console.log('haaa year sahi hei hei')
          if(af.month === moment().subtract(1, 'months').format('MMMM')){
            console.log("haa ecember hei")
            filepresent = true;
          }
        }
        return null;
      })
    } else {
      allAttendanceFiles.map((af) => {
        if(af.year === moment().format('YYYY')){
          console.log('haaa year sahi hei hei')
          if(af.month === moment().subtract(1, 'months').format('MMMM')){
            console.log("haa ecember hei")
            filepresent = true;
          }
        }
        return null;
      })
    }
    this.setState({
      filepresent : filepresent
    })






    return(

    )
  }

}



export default compose(
    graphql(getAttendanceFilesQuery, {name : "getAttendanceFilesQuery"}),
  )(UploadExcel)
