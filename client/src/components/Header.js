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
      groupSetting: true,
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOpenRandomCheckModal = this.handleOpenRandomCheckModal.bind(this);
    this.handleCloseRandomCheckModal = this.handleCloseRandomCheckModal.bind(this);
    this.handleRandomCheck = this.handleRandomCheck.bind(this);
  }

  componentWillUnmount() {
    // this.setState({ groupSetting: true });
  }

  handleSubmit(e) {
    const { data } = this.props;
    if (this.state.name.trim() === '') {
      e.preventDefault();
      return;
    }
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].name === this.state.name) {
        this.setState({
          temp: this.state.name,
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
    this.setState({
      showModal: false,
      name: '',
      temp: '',
      checkName: false,
    });
  }

  handleOpenRandomCheckModal() {
    this.setState({ checkModal: true });
  }

  handleCloseRandomCheckModal() {
    this.setState({ checkModal: false });
  }

  handleRandomCheck() {
    const { data, groupData } = this.props;
    if (data.length < 4) {
      this.setState({
        groupSetting: true,
        checkModal: true,
      })
      // this.setState({ checkModal: true });
    } else if (groupData.groupNum === 0 || groupData.minMember === 0) {
      this.setState({
        groupSetting: false,
        checkModal: true,
      });
    } else {
      this.setState({ groupSetting: true });
      browserHistory.push('/match');
    }
  }

  render() {
    return (
      <div className="header">
        <Link to={'/'}>
          <h1 className="header_title">
            Joy Together
          </h1>
        </Link>
        <div className="button">
          <Link to={'/'}>
            <button
              className="btn add"
              onClick={this.handleOpenModal}
            >
              Add Name
            </button>
          </Link>
            <button
              className="btn random"
              onClick={this.handleRandomCheck}
              >
              Make Group
            </button>
            <button
              className="btn reset"
              onClick={
                () => {
                  this.props.deletePeople();
                  this.setState({ groupSetting: true });
                  browserHistory.push('/');
                }
              }
            >
              Reset
            </button>
        </div>
        <div>
          <ReactModal
            className="modal"
            isOpen={this.state.showModal}
            onRequestClose={this.handleCloseModal}
            contentLabel="Modal"
          >
            <div className="modal_content">
              <form
                onSubmit={this.handleSubmit}
              >
                <label>
                  <h2>
                    함께 <span style={{fontSize:"22px"}}>Joy</span> 할 분의 이름을 적어주세요!
                  </h2>
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
                  {this.state.checkName ? `${this.state.temp} 은(는) 이미 있습니다.` : ''}
                </h3>
              </form>
            </div>
          </ReactModal>
          <ReactModal
            className="random_check_modal"
            isOpen={this.state.checkModal}
            onRequestClose={this.handleCloseRandomCheckModal}
            contentLabel="Modal"
          >
            <h1 className="modal_warning_text">
              {this.state.groupSetting ? '4명 이상이 되어야 합니다.' : '그룹 생성 조건을 채워주세요'}
            </h1>
          </ReactModal>
        </div>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.getDataReducer.data,
  groupData: state.makeGroupReducer.groupData,
});

const mapDispatchToProps = dispatch => ({
  getDataFunc: () => { dispatch(getDataAction.getDataFunc()); },
  addDataFunc: (name) => { dispatch(addDataAction.addDataFunc(name)); },
  deletePeople: () => { dispatch(deleteDataAction.deletePeopleFunc()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
