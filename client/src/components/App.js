import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Form from './Form';

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
          <Form />
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
