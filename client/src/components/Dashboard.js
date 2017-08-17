import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ReactModal from 'react-modal';
import Spinner from 'react-spinkit';
import * as getDataAction from '../action/getDataAction';
import * as deleteDataAction from '../action/deleteDataAction';
import * as makeGroupAction from '../action/makeGroupAction';
import { getRandomColor } from '../config';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minGroupNumber: '',
      numberOfGroups: '',
      spinner: true,
      checkModal: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumberOfGroups = this.handleNumberOfGroups.bind(this);
    this.handleMinGroupNumber = this.handleMinGroupNumber.bind(this);
    this.handleCloseRandomCheckModal = this.handleCloseRandomCheckModal.bind(this);
    this.handleCheckMember = this.handleCheckMember.bind(this);
  }

  componentDidMount() {
    this.props.getDataFunc();
    setTimeout(() => {
      this.setState({ spinner: false });
    }, 500);
  }

  handleCheckMember() {
    const { data } = this.props;
    if (data.length < 4) {
      this.setState({ checkModal: true });
    }
  }

  handleCloseRandomCheckModal() {
    this.setState({ checkModal: false });
  }

  handleNumberOfGroups(e) {
    this.setState({ numberOfGroups: e.target.value });
  }

  handleMinGroupNumber(e) {
    this.setState({ minGroupNumber: e.target.value });
  }

  handleSubmit(e) {
    const { data } = this.props;
    if (data.length < 4) {
      e.preventDefault();
      return;
    }
    this.props.makeGroupFunc(this.state.numberOfGroups, this.state.minGroupNumber);
    browserHistory.push('/match');
    e.preventDefault();
  }

  render() {
    const { data } = this.props;
    const maxGroupMember = Math.floor(data.length / 2);
    const maxNumberOfGroup = Math.floor(data.length / this.state.minGroupNumber);
    const renderData = () => {
      if (data === undefined || data.length === 0) {
        return (
          <h1>
            Empty Data
          </h1>
        );
      } else {
        return data.map((data, i) => {
          return (
            <div className="person_area" key={i}>
              <input
                type="button"
                value="X"
                className="remove_btn"
                onClick={() => this.props.deleteDataFunc(data.name)}
                />
              <div className="person" style={{backgroundColor: getRandomColor()}}>
                {data.name}
              </div>
            </div>
          );
        });
      }
    };
    const renderPage = () => {
      if (this.state.spinner) {
        return (
          <div className="dashboard">
            <div className="spinner">
              <Spinner name="ball-scale-multiple" color="steelblue" fadeIn="none" />
            </div>
          </div>
        );
      } else {
        return (
          <div className="dashboard">
            <div className="setting">
              <form onSubmit={this.handleSubmit}>
                최소 그룹 인원
                  <input
                    type="number"
                    value={this.state.minGroupNumber}
                    onChange={this.handleMinGroupNumber}
                    min="2"
                    max={maxGroupMember}
                    placeholder="두 그룹 이상"
                    required
                  />

                <br />
                <div>
                  희망 그룹 개수
                  <input
                    type="number"
                    value={this.state.numberOfGroups}
                    onChange={this.handleNumberOfGroups}
                    min="2"
                    max={maxNumberOfGroup}
                    placeholder="두 명 이상"
                    required
                  />
                </div>
                <input style={{width:"100%"}} type="submit" value="생성" onClick={this.handleCheckMember}/>
              </form>
              <ReactModal
                className="random_check_modal"
                isOpen={this.state.checkModal}
                onRequestClose={this.handleCloseRandomCheckModal}
                contentLabel="Modal"
              >
                <h1 className="modal_warning_text">
                  4명 이상이 되어야 합니다.
                </h1>
              </ReactModal>
            </div>
            <div className="personList">
              {renderData()}
            </div>
          </div>
        );
      }
    };
    return (
      renderPage()
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
