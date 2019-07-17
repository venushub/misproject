import React, {Component} from 'react'
import { getActivityTypeIdentifiersQuery, createActivityTypeIdentifierMutation } from './queries/queries';
import { graphql, compose } from 'react-apollo';


class CustomOptions extends Component {


  constructor(props){
    super(props)

    this.state = {
      activityTypeIdentifierSubCat : 'CR'
    }
  }

  handleChange = (e) => {
    // console.log("broooooo")
    this.setState({
      [e.target.name]: e.target.value
    }
  )
  }


  handleActivityFormSubmit = (e) => {

    e.preventDefault()

    // console.log("ati is", this.props.activityTypeId)
    // console.log("activityTypeIdentifierName is", this.props.filter_attrib)


    // console.log(this.state)

    this.props.createActivityTypeIdentifierMutation({
        variables: {
            activityType: this.props.activityTypeId,
            activityTypeIdentifierName: this.props.filter_attrib,
            activityTypeIdentifierSubCat : this.state.activityTypeIdentifierSubCat
        },

        refetchQueries: [{
                query: getActivityTypeIdentifiersQuery,
                variables : {search : this.props.activityTypeId}
        }]

    }).then(res => {
      // console.log(res)
      //window.location.reload()
      this.props.handleDropDown(res.data.createActivityTypeIdentifier.id, res.data.createActivityTypeIdentifier.activityTypeIdentifierName)
      //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
      //this.props.history.push('/activities');
      console.log("success")
    }).catch(err => {
      console.log("error aya")
    });

    }

    componentDidUpdate(prevProps){
        if (this.props.activityTypeId !== prevProps.activityTypeId) {
          // let activityTypeIdentifiers = this.props.data.allActivityTypeIdentifiers  &&  this.props.data.allActivityTypeIdentifiers != undefined ? this.props.data.allActivityTypeIdentifiers : []
          // activityTypeIdentifiers.map(
          //   (ati) => {
          //     if(ati.activityTypeIdentifierName === this.props.activityTypeName){
          //
          //     }
          //   }
          // )
            this.props.data.refetch()
          console.log("catchhhhhhh")
        }
    }

    componentDidMount(){
      this.props.data.refetch()
    }

  render(){

    console.log('nahi horeeeeeeeee')

    let activityTypeIdentifiers = this.props.data.allActivityTypeIdentifiers  &&  this.props.data.allActivityTypeIdentifiers != undefined ? this.props.data.allActivityTypeIdentifiers : []

    let filter_attrib = this.props.filter_attrib

    let droptions = []


    if(this.props.filter_attrib != ''){
      droptions = activityTypeIdentifiers.filter((activityTypeIdentifier, index) => {
        return activityTypeIdentifier.activityTypeIdentifierName.includes(filter_attrib)
      })
    } else {
      droptions = []
    }

    let exactmatch = false;

    activityTypeIdentifiers.map((ati) => {
      if(ati.activityTypeIdentifierName === filter_attrib){
        exactmatch = true
      }
    })

    let myclassname = ""
    let droptions_render = <div>Loading..</div>

    // console.log("lllllllllllpppppppppppp", droptions.length )

    if(droptions.length != 0 && exactmatch === true){
      myclassname = "activiy-type-iden-options"
      droptions_render = droptions.map((droption, index) => {
        let refn = "di" + droption.id.toString()
        return <div className="drop-item" ref={refn} onClick={() => this.props.handleDropDown(droption.id, droption.activityTypeIdentifierName)} key={index}>{droption.activityTypeIdentifierName}</div>
      })
    } else if(this.props.filter_attrib === '') {
      droptions_render = <div></div>
      myclassname = "border-none"
    } else if(droptions.length != 0 && exactmatch === false){

      let droptions_render_1 = droptions.map((droption, index) => {
        let refn = "di" + droption.id.toString()
        return <div className="drop-item"  ref={refn} onClick={() => this.props.handleDropDown(droption.id, droption.activityTypeIdentifierName)} key={index}>{droption.activityTypeIdentifierName}</div>
      })
      let droptions_render_2 = <div>
                              <label  className="activity-form-input-label">Bug id not registered, Please register now</label>
                              <input className="activity-form-input" disabled type="text" name ="activityTypeIdentifierName" value={this.props.filter_attrib} />
                              <label  className="activity-form-input-label">Sub type</label>
                              <select className="activity-form-input" name="activityTypeIdentifierSubCat" value={this.state.activityTypeIdentifierSubCat} onChange={this.handleChange}><option value="CR">CR</option><option value="FTR">FTR</option><option value="Other">Other</option></select>
                              <button className="register-button" onClick={this.handleActivityFormSubmit}>Register</button>
                            </div>
      droptions_render = <div className="dono-com">{droptions_render_1}{droptions_render_2}</div>
    } else {
      droptions_render = <div>
                            <label  className="activity-form-input-label">Bug id not registered, Please register now</label>
                            <input className="activity-form-input" disabled type="text" name ="activityTypeIdentifierName" value={this.props.filter_attrib} />
                            <label  className="activity-form-input-label">Sub type</label>
                            <select className="activity-form-input" name="activityTypeIdentifierSubCat" value={this.state.activityTypeIdentifierSubCat} onChange={this.handleChange}><option value="CR">CR</option><option value="FTR">FTR</option><option value="Other">Other</option></select>
                            <button className="register-button" onClick={this.handleActivityFormSubmit}>Register</button>
                          </div>
      myclassname = "activiy-type-iden-options"
    }


    return(
      <div className={myclassname}>
      {droptions_render}
      </div>
    )
  }
}


export default compose(

graphql(getActivityTypeIdentifiersQuery, {
  options : (props) => {
    return {
      variables : {
        search : props.activityTypeId
      }
    }
  }
}),
graphql(createActivityTypeIdentifierMutation, { name: "createActivityTypeIdentifierMutation" }),

)(CustomOptions)
