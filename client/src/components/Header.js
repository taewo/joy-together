import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import * as getDataAction from '../action/getDataAction';
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
    console.log(321321, this.state.name);
    this.props.addDataFunc(this.state.name);
    alert(this.state.name);
    this.setState({
      name: '',
    });
    e.preventDefault();
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
            <form
              onSubmit={this.handleSubmit}
            >
              <label>
                Name:
                <input
                  type="text"
                  value={this.state.name}
                  onChange={this.handleChange}
                  name="name"
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </ReactModal>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDataFunc: () => { dispatch(getDataAction.getDataFunc()); },
  addDataFunc: (name) => { dispatch(addDataAction.addDataFunc(name)); },
});

export default connect(null, mapDispatchToProps)(Header);
