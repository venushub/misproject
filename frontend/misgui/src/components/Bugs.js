import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {getBugsQuery} from './queries/queries'
import Header from './Header'

class Bugs extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
      <Header />
        <h2>Bug List</h2>
      </div>
    );
  }
}

export default graphql(getBugsQuery)(Bugs);
