import React, { Component } from 'react';
import ReactModal from 'react-modal';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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
          <button className="btn">Random</button>
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
