import React , {Component} from 'react'
import {getAttendanceFilesQuery} from './queries/queries'
import { graphql, compose } from 'react-apollo';
import moment from 'moment'
const csv=require('csvtojson')


class UploadExcel extends Component {
  constructor(props){
    super(props)

    this.state = {
      file : '',
      filebase64 : ''
    }
  }

  //
  // setInState = (fb64) => {
  //   this.setState({
  //     filebase64 : fb64
  //   })
  // }



  getBase64 = (file) => {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload =  () => {
     console.log(reader.result);
     this.setState({
       filebase64 : reader.result
     })
   };
   reader.onerror =  (error) => {
     console.log('Error: ', error);
   };
 }



  changedFile = (e) => {
    console.log(this.files)
    this.setState({
      file : e.target.value
    })
    const selectedFile = this.refs.myfile.files[0];
    console.log(selectedFile)

    this.getBase64(selectedFile)
    };



  render(){
    console.log(this.state.file, this.state.filebase64)
    console.log(this.props)

    const allAttendanceFiles = this.props.getAttendanceFilesQuery.allAttendanceFiles  &&  this.props.getAttendanceFilesQuery.allAttendanceFiles != undefined ? this.props.getAttendanceFilesQuery.allAttendanceFiles : []

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
          } else {
            filepresent = false;
          }
        }
        return null;
      })
    } else {
      allAttendanceFiles.map((af) => {
        if(af.year === moment().format('YYYY')){
          console.log('haaa year sahi hei hei')
          if(af.month === moment().format('MMMM')){
            console.log("haa ecember hei")
            filepresent = true;
          } else {
            filepresent = false;
          }
        }
        return null;
      })
    }

    console.log(moment().subtract(1, 'years').format('YYYY'))

    let fileuploadmessage = '';
    let displayfileuploadform = false

    if(moment().format('MMMM') === 'January'){
      if(!filepresent){
        fileuploadmessage = `⛔ Attendance file upload is pending for month ${moment().subtract(1, 'months').format('MMMM')} of year ${moment().subtract(1, 'years').format('YYYY')}`
        displayfileuploadform = true
      } else {
        fileuploadmessage = `⛳ Attendance file upload done for month ${moment().subtract(1, 'months').format('MMMM')} of year ${moment().subtract(1, 'years').format('YYYY')}`
        displayfileuploadform = false
      }
    } else {
      if(!filepresent){
        fileuploadmessage = `⛔ Attendance file upload is pending for month ${moment().subtract(1, 'months').format('MMMM')} of year ${moment().format('YYYY')}`
        displayfileuploadform = true
      } else {
        fileuploadmessage = `⛳ Attendance file upload done for month ${moment().subtract(1, 'months').format('MMMM')} of year ${moment().format('YYYY')}`
        displayfileuploadform = false
      }
    }

    let fileuploadrender = <div></div>;
    if(displayfileuploadform){
      fileuploadrender = <div><label className="attendance-file-label" htmlFor="file">Please choose File</label>
      <input className="attendance-file-input" type="file" id="file" ref="myfile" onChange={this.changedFile} /></div>
    }


    return(
      <div className="attendance-form-div">
        <div className="file-upload-message">{fileuploadmessage}</div>
        {fileuploadrender}
      </div>
    )
  }
}



export default compose(
    graphql(getAttendanceFilesQuery, {name : "getAttendanceFilesQuery"}),
  )(UploadExcel)
