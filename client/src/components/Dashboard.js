import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../action/getDataAction';
import getDataReducer from '../reducer/getDataReducer';

class Dashboard extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    this.props.getDataFunc();
  }

  render() {
    const renderData = () => {
      const { data } = this.props;
      console.log('value', this.props.data);
      if (data === undefined || data.length === 0) {
        console.log(3333333);
        return (
          <h3>
            Empty Data
          </h3>
        )
      } else {
        return this.props.data.map((data, i) => {
          return (
            <div key={i}>
              {data.name}
            </div>
          );
        });
      }
    };
    return (
      <div>
        <h1>
          Dashboard
        </h1>
        {renderData()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.getDataReducer.data,
});

const mapDispatchToProps = dispatch => ({
  getDataFunc: () => { dispatch(action.getDataFunc()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
