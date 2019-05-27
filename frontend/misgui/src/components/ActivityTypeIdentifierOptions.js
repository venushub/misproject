import React, {Component} from 'react'
import { getActivityTypeIdentifiersQuery } from './queries/queries';
import { graphql, compose } from 'react-apollo';



class ActivityTypeIdentifierOptions extends Component {



  // constructor(props){
  //   super(props)
  //   this.state = {
  //     air : []
  //   }
  // }
  //
  //
  // componentDidMount(){
  //   this.setState({
  //     air : this.props.allActivityTypeIdentifiers
  //   })
  // }

  render(){

    console.log("finale", this.props)

    let activityTypeIdentifiers = this.props.data.allActivityTypeIdentifiers  &&  this.props.data.allActivityTypeIdentifiers != undefined ? this.props.data.allActivityTypeIdentifiers : []

    console.log("yy", activityTypeIdentifiers)

    let activityTypeIdentifiersOptions = activityTypeIdentifiers.map((activityTypeIdentifier, index) => {
      return (
        <option key={index} value={activityTypeIdentifier.id}>{activityTypeIdentifier.activityTypeIdentifierName}</option>
      )
    })

    console.log("this is printing?", activityTypeIdentifiersOptions)

    console.log(this.props)
    return(
      <React.Fragment>
        {activityTypeIdentifiersOptions}
      </React.Fragment>
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
})

)(ActivityTypeIdentifierOptions)
