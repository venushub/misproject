import React, {Component} from 'react'
import {getMe} from './queries/queries'
import { graphql, compose } from 'react-apollo';
import Header from './Header'
import UploadExcel from './UploadExcel'
import UserManagement from './admin/UserManagement'
import ProjectManagement from './admin/ProjectManagement'



class AdminToolKit extends Component {

  constructor(props){

    super(props)

    this.state = {
      showuploadform : false,
      buttons : [{id : 1, name:'User Management', active : true}, {id : 2, name:'Projects Management', active : false}],
      whichComp : 'user'
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

  handleComp = (inc) => {
    console.log(inc)
    let newbuttons = []
    this.state.buttons.map(
      (button) => {
        if(button.name === inc.name){
          newbuttons.push({id : button.id, name:button.name, active : true})
        } else {
          newbuttons.push({id : button.id, name:button.name, active : false})
        }
      }
    )
    this.setState({
      whichComp : inc.name,
      buttons : newbuttons
    })
  }


  render(){
    let upload_excel
    if(this.state.showuploadform){
      upload_excel  = <UploadExcel />
    }

    let rendercomp = <UserManagement />;

    if(this.state.whichComp === 'Projects Management'){
      rendercomp = <ProjectManagement />
    } else if(this.state.whichComp === 'User Management'){
        rendercomp = <UserManagement />
    }


    let buttons_render = this.state.buttons.map(
      (button) => {
        let btnclass = "admin-manage-card"
        if(button.active){
          btnclass = "admin-manage-card-selected"
        }
        return(
          <button className={btnclass} onClick={() => this.handleComp(button)}>{button.name}</button>
        )
      }
    )

    return(
      <div>
      <Header />
        <div className="admin-all-div">
          {buttons_render}
        </div>
        <div className="admin-comp-mat">
        {rendercomp}
        </div>
      </div>
    )
  }
}


export default compose(
    graphql(getMe, {name : "getMe"}),
  )(AdminToolKit)
