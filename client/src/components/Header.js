import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import * as getDataAction from '../action/getDataAction';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleSubmit(e) {
    // console.log('target', e.target.value);
    e.preventDefault();
  }


  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
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
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>First Name</label>
              <div>
                <Field
                  name="firstName"
                  component="input"
                  type="text"
                  placeholder="First Name"
                />
              </div>
            </div>
            <div>
              <button type="submit" disabled={pristine || submitting} onClick={this.handleCloseModal}>
                Submit
              </button>
              <button type="button" disabled={pristine || submitting} onClick={reset}>
                Clear Values
              </button>
            </div>
          </form>
          </ReactModal>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDataFunc: () => { dispatch(getDataAction.getDataFunc()); },
});

Header = connect(
  null,
  mapDispatchToProps,
)(Header);

export default reduxForm({
  form: 'simple',
})(Header);
