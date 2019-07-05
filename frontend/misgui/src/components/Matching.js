import React, {Component} from 'react'
import {getAttendanceQuery} from './queries/queries'
import { graphql, compose } from 'react-apollo';

class Matching extends Component {

  constructor(props){

    super(props)

    this.state = {

    }

  }

  componentDidMount(){

    //const me = this.props.getMe.me  &&  this.props.getMe.me != undefined ? this.props.getMe.me : false


  }

  componentDidUpdate(prevProps){
      if (this.props.getAttendanceQuery !== prevProps.getAttendanceQuery) {

      }
  }


  render(){
    console.log("ggggggg",this.props)
    let upload_excel
    if(this.state.showuploadform){
      upload_excel  = <UploadExcel />
    }

    return(
      <div>
      Hey
      </div>
    )
  }
}


export default compose(
  graphql(getAttendanceQuery, {
    options : (props) => {
      return {
        variables : {
          month : props.month,
          year : props.year
        }
      }
    }
  }),
)(Matching)
