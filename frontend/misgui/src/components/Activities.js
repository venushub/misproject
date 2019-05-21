import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getActivitiesQuery} from './queries/queries'

class Activities extends Component {

  constructor(props){
    super(props)

    this.state = {
      date : '',
      day : '',
      start_time : '',
      end_time : '',
      module_name: '',
      module_details: ''
    }
  }




  render() {
    console.log(this.props)
    return (
      <div>
        <h2>Activities List</h2>
      </div>
    );
  }
}

export default graphql(getActivitiesQuery)(Activities);
