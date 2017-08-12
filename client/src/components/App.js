import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Dashboard />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.getDataReducer.data,
});

export default connect(mapStateToProps, null)(App);
