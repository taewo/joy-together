import React, { Component } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';
import { connect } from 'react-redux';
import * as addAction from '../action/addAction';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.getAllData = this.getAllData.bind(this);
    this.resetAllData = this.resetAllData.bind(this);
  }

  resetAllData() {
    axios.delete('http://localhost:4000/api/people/')
    .then((res) => {
      console.log(123, res);
    });
  }

  getAllData() {
    axios.get('http://localhost:4000/api/persons')
    .then((res) => {
      console.log(321, res.data);
    });
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div className="header">
        Header
        <div className="button">
          <button
            className="btn"
            onClick={this.props.getDataFunc}
          >
            Add
          </button>
          <button
            className="btn"
            onClick={this.getAllData}
          >
            Random
          </button>
          <button
            className="btn"
            onClick={this.resetAllData}
          >
            Reset
          </button>
        </div>
        <div>
          <ReactModal
            className="modal"
            overlayClassName="overlay"
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
            contentLabel="Modal"
          >
          <button
            onClick={this.handleCloseModal}
          >
            ok
          </button>
          </ReactModal>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   data: state.data,
// });

const mapDispatchToProps = dispatch => ({
  getDataFunc: () => { dispatch(addAction.getDataFunc()); },
});

export default connect(null, mapDispatchToProps)(Header);
