import React, {Component} from 'react'
import {getMe} from './queries/queries'
import { graphql, compose } from 'react-apollo';
import Header from './Header'
import UploadExcel from './UploadExcel'


class Matcher extends Component {

  constructor(props){

    super(props)

    this.state = {
      showuploadform : false
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
          if(this.props.getMe.me.isSuperuser){
            this.setState({
              showuploadform : true
            })
          }
      }
  }


  render(){
    let upload_excel
    if(this.state.showuploadform){
      upload_excel  = <UploadExcel />
    }

    return(
      <div>
      <Header />
      {upload_excel}
      </div>
    )
  }

}


export default compose(
    graphql(getMe, {name : "getMe"}),
  )(Matcher)
