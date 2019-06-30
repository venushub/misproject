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

     console.log("file type is blobbb")

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

    if(e.target.value !== '' && e.target.value !== null){
      if(selectedFile.size < 3000000){
        this.getBase64(selectedFile)
      } else {
          alert('your file size is overwhelming 🙏')
      }
    }
    else {
      alert('You havent selected any file 🙏')
    }
    };



    handleFileUpload = () => {
      if(this.state.file === '' || this.state.filebase64 === ''){
        alert('MAPI : "I can see No Files here to upload 💁"')
      } else if(this.state.file === null || this.state.filebase64 === null){
        alert('MAPI : "I can see No Files here to upload 💁"')
      } else if(this.state.file.split('.').pop() !== 'csv'){
        alert('MAPI : "My owner said to upload only csv files, sorry I sound rude 🙏"')
      } else if(this.refs.myfile.files[0].size > 3000000) {
        alert('your file size is overwhelming 🙏')
      } else {
        axios.post('http://localhost:8000/matcher/', {
          fileName: this.state.file,
          filebase64: this.state.filebase64
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }


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

    let fileNameClassName="file-name-none"
    if(this.state.file !== '' && this.state.file !== null){
      fileNameClassName = "file-name"
    }

    let fileuploadrender;
    if(displayfileuploadform){
      fileuploadrender = <div className="file-input-con">
        <div className="attendance-file-input-label-div">
          <label className="attendance-file-label" htmlFor="file">Please choose File</label>
          <input className="attendance-file-input" type="file" id="file" ref="myfile" onChange={this.changedFile} />
        </div>
        <div className={fileNameClassName}>{this.state.file.split(/.*[\/|\\]/)[1]}</div>
        <button className="file-upload-button" onClick={this.handleFileUpload}>Upload</button>
      </div>
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
