import React, {Component} from 'react'
import {getAttendanceQuery, getActivitiesForMonthQuery, getProfileQuery, updateProfile, getMe} from './queries/queries'
import { graphql, compose } from 'react-apollo';
import FinMatch from './FinMatch'
import { getUserName } from './helpers/getUserName';
import { getPersonPlaceHolder } from './helpers/personPlaceholder';

// const myname = getUserName().toString

const personph = getPersonPlaceHolder()

class ProfilePic extends Component {

  constructor(props){

    super(props)

    this.state = {

      extradark : "rgb(40,55,71)",
      dark : "rgb(52,73,71)",
      light : "rgb(174,182,191)",
      extralight : "rgb(235,237,239)",


      file : '',
      filebase64 : personph
    }

  }

  getBase64 = (file) => {
   var reader = new FileReader();
     reader.readAsDataURL(file);

     // console.log("file type is blobbb")

   reader.onload =  () => {
     // console.log(reader.result);
     this.setState({
       filebase64 : reader.result
     },

     () => {
       this.props.updateProfile({
           variables: {
             user : 'default',
             empCode: 'default',
             location: 'default',
             profilePic: this.state.filebase64,
             invProjects : 'default'
           }
       }).then(res => {
         // console.log(res)
         //window.location.reload()
         //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
         // this.clearForm()
         // this.handleDisplayForm()
         // this.props.handleReturnSubmit()
         this.props.data.refetch()
         // console.log(res)
         // this.setState({
         //   filebase64 :
         // })
       }).catch(err => {
         // console.log("error aya")
       });
     }

   )
   };
   reader.onerror =  (error) => {
     // console.log('Error: ', error);
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


  render(){

    const myprofile = this.props.data.myProfile  &&  this.props.data.myProfile != undefined ? this.props.data.myProfile : ''

    const mypic = myprofile.profilePic  &&  myprofile.profilePic != undefined ? myprofile.profilePic : ''

    let myimg = this.state.filebase64
    if(mypic === ''){
     myimg=this.state.filebase64
   } else {
     myimg = mypic
   }
    // console.log("hhhhh",this.props)
    return(
      <div className="profile-pic-div">
      <svg width='210' height='210' xmlns='http://www.w3.org/2000/svg'>
          <defs>
              <clipPath id='cut-off-bottom'>
              <circle cx="105" cy="105" r="100" />
              </clipPath>
          </defs>
          <image clipPath='url(#cut-off-bottom)' xlinkHref={myimg} height='200' width='200' />
          <circle cx="105" cy="105" r="100" fill={this.state.dark} fillOpacity="0.3"/>
          <circle cx="105" cy="105" r="100" fill="none" stroke={this.state.extradark} strokeWidth="3"/>
      </svg>
      <button onClick={() => {this.refs.myfile.click()}} className="edit-button">Edit</button>

      <input  className="none" type="file" id="file" ref="myfile" onChange={this.changedFile} />
      </div>
    )
  }
}


export default compose(
  graphql(getProfileQuery, {
    options : (props) => {
      return {
        variables : {
          user : props.user
        }
      }
    }
  }),
  graphql(updateProfile, {name : "updateProfile"}),
  )(ProfilePic)
