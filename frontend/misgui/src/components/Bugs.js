import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getBugsQuery} from './queries/queries'

class Bugs extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <h2>Bug List</h2>

      </div>
    );
  }
}

export default graphql(getBugsQuery)(Bugs);
