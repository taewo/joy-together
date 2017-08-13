import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as getDataAction from '../action/getDataAction';
import * as deleteDataAction from '../action/deleteDataAction';
import * as addDataAction from '../action/addDataAction';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    if (this.state.name === ''){
      e.preventDefault();
      return;
    }
    this.props.addDataFunc(this.state.name);
    this.setState({
      name: '',
    });
    this.setState({
      showModal: false,
    });
  }

  handleChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
    this.setState({ name: '' });
  }

  render() {
    return (
      <div className="header">
        <Link to={'/'}>
          Header
        </Link>
        <div className="button">
          <Link to={'/'}>
            <button
              className="btn"
              onClick={this.handleOpenModal}
              >
              Add
            </button>
          </Link>
          <Link to={'/match'}>
            <button
              className="btn"
              onClick={this.getAllData}
              >
              Random
            </button>
          </Link>
          <Link to={'/'}>
            <button
              className="btn"
              onClick={this.props.deletePeople}
              >
              Reset
            </button>
          </Link>
        </div>
        <div>
          <ReactModal
            className="modal"
            overlayClassName="overlay"
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
            contentLabel="Modal"
          >
            <form
              onSubmit={this.handleSubmit}
            >
              <label>
                Name:
                <input
                  autoFocus
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                  name="name"
                  placeholder="Type Name"
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </ReactModal>
        </div>
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDataFunc: () => { dispatch(getDataAction.getDataFunc()); },
  addDataFunc: (name) => { dispatch(addDataAction.addDataFunc(name)); },
  deletePeople: () => { dispatch(deleteDataAction.deletePeopleFunc()); },
});

export default connect(null, mapDispatchToProps)(Header);
