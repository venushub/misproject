import React, {Component} from 'react'
import { getActivityTypeIdentifiersQuery, createActivityTypeIdentifierMutation } from './queries/queries';
import { graphql, compose } from 'react-apollo';


class CustomOptions extends Component {


  constructor(props){
    super(props)

    this.state = {

    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () =>   console.log("ware", this.state.activityTypeArg)
  )
  }

  handleActivityFormSubmit = (e) => {

    e.preventDefault()

    console.log("ati is", this.props.activityTypeId)
    console.log("activityTypeIdentifierName is", this.props.filter_attrib)

    console.log(this.state)



    this.props.createActivityTypeIdentifierMutation({
        variables: {
            activityType: this.props.activityTypeId,
            activityTypeIdentifierName: this.props.filter_attrib
        },

        refetchQueries: [{
                query: getActivityTypeIdentifiersQuery,
                variables : {search : this.props.activityTypeId}
        }]


    }).then(res => {
      console.log(res)
      //window.location.reload()
      this.props.handleDropDown(res.data.createActivityTypeIdentifier.id, res.data.createActivityTypeIdentifier.activityTypeIdentifierName)
      //localStorage.setItem('cool-jwt', res.data.tokenAuth.token)
      //this.props.history.push('/activities');
      console.log("success")
    }).catch(err => {
      console.log("error aya")
    });

    }

  render(){

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

    let myclassname = ""
    let droptions_render = <div>Loading..</div>

    if(droptions.length != 0){
      myclassname = "activiy-type-iden-options"
      droptions_render = droptions.map((droption, index) => {
        return <div className="drop-item" onClick={() => this.props.handleDropDown(droption.id, droption.activityTypeIdentifierName)} key={index}>{droption.activityTypeIdentifierName}</div>
      })
    } else if(this.props.filter_attrib === '') {
      droptions_render = <div></div>
      myclassname = "border-none"
    } else {
      droptions_render = <div>

        <label  className="activity-form-input-label">Bug id not registered, Please register now</label>
        <input className="activity-form-input" disabled type="text" onChange={this.handleChange} name ="activityTypeIdentifierName" value={this.props.filter_attrib} />
        <button onClick={this.handleActivityFormSubmit}>submit</button>
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