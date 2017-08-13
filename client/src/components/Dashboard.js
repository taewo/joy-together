import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as getDataAction from '../action/getDataAction';
import * as deleteDataAction from '../action/deleteDataAction';

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
            <div
              key={i}
              className="person"
            >
              {data.name}
              <input
                type="button"
                value="X"
                className="remove_btn"
                onClick={() => this.props.deleteDataFunc(data.name)}
              />
            </div>
          );
        });
      }
    };
    return (
      <div
        className="personList"
      >
        {renderData()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.getDataReducer.data,
});

const mapDispatchToProps = dispatch => ({
  getDataFunc: () => { dispatch(getDataAction.getDataFunc()); },
  deleteDataFunc: (name) => { dispatch(deleteDataAction.deletePersonFunc(name)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
