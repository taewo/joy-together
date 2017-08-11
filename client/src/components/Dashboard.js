import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { API_URL } from '../config';
import * as action from '../action/addDataAction';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  // fetchData() {
  //   axios.get(`${API_URL}`)
  // }

  render() {
    return (
      <div>
        <h1>
          Dashboard
        </h1>
        <form>
          name:
          <input type="text" />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onAddPerson: () => { dispatch(action.addDataFunc()); },
});

export default connect(null, mapDispatchToProps)(Dashboard);
