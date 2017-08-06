import React, { Component } from 'react';
import ReactModal from 'react-modal';
import axios from 'axios';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.axiosCall = this.axiosCall.bind(this);
  }

  axiosCall() {
    axios.get('http://localhost:4000/api/persons')
    .then((res) => {
      console.log(321, res.data);
    })
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false});
  }

  render() {
    return (
      <div className="header">
        Header
        <div className="button">
          <button
            className="btn"
            onClick={this.handleOpenModal}
          >
            Add
          </button>
          <button
            className="btn"
            onClick={this.axiosCall}
          >
            Random
          </button>
        </div>
        <div>
          <ReactModal
            className="modal"
            overlayClassName="overlay"
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
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

export default Header;
