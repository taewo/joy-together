import React, { Component } from 'react';
import { connect } from 'react-redux';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfGroups: '',
      minGroupNumber: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumberOfGroups = this.handleNumberOfGroups.bind(this);
    this.handleMinGroupNumber = this.handleMinGroupNumber.bind(this);
  }

  handleNumberOfGroups(e) {
    this.setState({ numberOfGroups: e.target.value });
  }

  handleMinGroupNumber(e) {
    this.setState({ minGroupNumber: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const matchResult = () => {
      const { data } = this.props;
      const dividend = data.length;
      const divisor = Math.floor(Math.random() * (data.length/2));
    }
    return (
      <div className="matchList">
        <h1>
          Match
        </h1>
        <form
          onSubmit={this.handleSubmit}
        >
          <label>
            그룹의 수 :
            <input
              type="number"
              onChange={this.handleNumberOfGroups}
              value={this.state.numberOfGroups}
            />
          </label>
          <br />
          <label>
            그룹최소 인원 :
            <input
              type="number"
              value={this.state.minGroupNumber}
              onChange={this.handleMinGroupNumber}
            />
          </label>
          <input
            type="submit"
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.getDataReducer.data,
});

export default connect(mapStateToProps, null)(Match);
