import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as getDataAction from '../action/getDataAction';
import * as deleteDataAction from '../action/deleteDataAction';
import * as makeGroupAction from '../action/makeGroupAction';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minGroupNumber: '',
      numberOfGroups: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumberOfGroups = this.handleNumberOfGroups.bind(this);
    this.handleMinGroupNumber = this.handleMinGroupNumber.bind(this);
  }
  componentDidMount() {
    console.log('componentDidMount');
    this.props.getDataFunc();
  }

  handleNumberOfGroups(e) {
    this.setState({ numberOfGroups: e.target.value });
  }

  handleMinGroupNumber(e) {
    this.setState({ minGroupNumber: e.target.value });
  }

  handleSubmit(e) {
    console.log('state', this.state.numberOfGroups, this.state.minGroupNumber)
    this.props.makeGroupFunc(this.state.numberOfGroups, this.state.minGroupNumber);
    browserHistory.push('/match');
    e.preventDefault();
  }

  render() {
    const { data } = this.props;
    const maxGroupMember = Math.floor(data.length/2);
    const maxNumberOfGroup = Math.floor(data.length / this.state.minGroupNumber);
    const renderData = () => {
      if (data === undefined || data.length === 0) {
        console.log(3333333);
        return (
          <h3>
            Empty Data
          </h3>
        );
      } else {
        return data.map((data, i) => {
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
      <div className="dashboard">
        <div className="setting">
          <form onSubmit={this.handleSubmit}>
            <label>
              그룹최소 인원 :
              <input
                type="number"
                value={this.state.minGroupNumber}
                onChange={this.handleMinGroupNumber}
                min="2"
                max={maxGroupMember}
                required
                placeholder="최소 두명부터"
                />
            </label>
            <br />
            <label>
              그룹의 수 :
              <input
                type="number"
                onChange={this.handleNumberOfGroups}
                value={this.state.numberOfGroups}
                min="2"
                max={maxNumberOfGroup}
                required
                placeholder="최소 두 그룹부터"
              />
            </label>
            <input type="submit" value="생성"/>
          </form>
        </div>
        <div className="personList">
          {renderData()}
        </div>
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
  makeGroupFunc: (groupNum, minMember) => { dispatch(makeGroupAction.makeGroup(groupNum, minMember)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
