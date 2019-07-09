import React, {Component} from 'react'
import {getAttendanceQuery, getActivitiesForMonthQuery, getProfileQuery, updateProfile} from './queries/queries'
import { graphql, compose } from 'react-apollo';
import FinMatch from './FinMatch'
import { getUserName } from './helpers/getUserName';
import { getPersonPlaceHolder } from './helpers/personPlaceholder';

const myname = getUserName().toString

const personph = getPersonPlaceHolder()

class ProfilePic extends Component {

  constructor(props){

    super(props)

    this.state = {
      file : '',
      filebase64 : personph
    }

  }

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


  render(){
    console.log("hhhhh",this.props)
    return(
      <div className="profile-pic-div">
      <svg width='200' height='200' xmlns='http://www.w3.org/2000/svg'>
          <defs>
              <clipPath id='cut-off-bottom'>
              <circle cx="100" cy="100" r="100" />
              </clipPath>
          </defs>
          <image clipPath='url(#cut-off-bottom)' xlinkHref={this.state.filebase64} height='200' width='200' />
          <circle cx="100" cy="100" r="100" fill="red" fillOpacity="0.3"/>
      </svg>
      <button>edit</button>

      <input  type="file" id="file" ref="myfile" onChange={this.changedFile} />
      </div>
    )
  }
}


export default compose(
  graphql(getProfileQuery, {
    options : (props) => {
      return {
        variables : {
          user : myname
        }
      }
    }
  }),
  graphql(updateProfile, {name : "updateProfile"})
  )(ProfilePic)
