import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as getDataAction from '../action/getDataAction';
import * as deleteDataAction from '../action/deleteDataAction';
import * as addDataAction from '../action/addDataAction';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      checkModal: false,
      name: '',
      temp: '',
      checkName: false,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpenRandomCheckModal = this.handleOpenRandomCheckModal.bind(this);
    this.handleCloseRandomCheckModal = this.handleCloseRandomCheckModal.bind(this);
    this.handleRandomCheck = this.handleRandomCheck.bind(this);
  }

  handleSubmit(e) {
    const { data } = this.props;
    if (this.state.name.trim() === ''){
      e.preventDefault();
      return;
    }
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].name === this.state.name) {
        this.setState({
          temp: this.state.name,
        });
        this.setState({
          checkName: true,
          name: '',
        });
        e.preventDefault();
        return;
      }
    }
    this.props.addDataFunc(this.state.name);
    this.setState({
      name: '',
      showModal: false,
      temp: '',
      checkName: false,
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

  handleOpenRandomCheckModal() {
    this.setState({ checkModal: true });
  }

  handleCloseRandomCheckModal() {
    this.setState({ checkModal: false });
  }

  handleRandomCheck() {
    const { data } = this.props;
    console.log('datat', data)
    if (data.length < 4) {
      this.setState({ checkModal: true });
    } else {
      browserHistory.push('/match');
    }
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
            <button
              className="btn"
              onClick={this.handleRandomCheck}
              >
              Random
            </button>
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
                  required
                />
              </label>
              <input type="submit" value="Submit" />
              <h3>
                {this.state.checkName ? `${this.state.temp} 은 이미 있습니다.` : ''}
              </h3>
            </form>
          </ReactModal>
          <ReactModal
            className="random_check_modal"
            overlayClassName="overlay"
            isOpen={this.state.checkModal}
            onRequestClose={this.handleCloseRandomCheckModal}
            contentLabel="Modal"
          >
            <h3>
              4명 이상이 되어야 합니다.
            </h3>
          </ReactModal>
        </div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.getDataReducer.data,
});

const mapDispatchToProps = dispatch => ({
  getDataFunc: () => { dispatch(getDataAction.getDataFunc()); },
  addDataFunc: (name) => { dispatch(addDataAction.addDataFunc(name)); },
  deletePeople: () => { dispatch(deleteDataAction.deletePeopleFunc()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
