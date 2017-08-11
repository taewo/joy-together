import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    if (this.props.data) {
      console.log(1, this.props.data)
      return (
        <div>
          <Header />
          <Dashboard />
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
  data: state.getDataReducer.data,
});

export default connect(mapStateToProps, null)(App);
