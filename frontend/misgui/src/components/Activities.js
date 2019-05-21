import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getActivitiesQuery} from './queries/queries'

class Bugs extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h2>Activities List</h2>
      </div>
    );
  }
}

export default graphql(getActivitiesQuery)(Bugs);
