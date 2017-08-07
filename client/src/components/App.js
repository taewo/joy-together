import React, { Component } from 'react';
import Header from './Header';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    if (this.props.data) {
      console.log(1, this.props.data)
      return (
        <div>
          <Header />
          <h1>
            data
          </h1>
        </div>
      )
    }
    return (
      <div>
        <Header />
        <h1>
          App
        </h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.data,
});

export default connect(mapStateToProps, null)(App);
