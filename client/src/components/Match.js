import React, { Component } from 'react';
import { connect } from 'react-redux';
import shuffle from 'lodash.shuffle';
import { browserHistory } from 'react-router';

class Match extends Component {
  constructor(props) {
    super(props);
    this.renderMatch = this.renderMatch.bind(this);
  }

  componentDidMount() {
    const { data, groupData } = this.props;
    if (data.length === 0 || groupData.groupNum === 0 || groupData.minMember === 0) {
      console.log('before browserHistory push');
      browserHistory.push('/');
    }
  }

  renderMatch() {
    const { data, groupData } = this.props;
    if (data.length !== 0 && groupData.groupNum !== 0 && groupData.minMember !== 0) {
      const shuffledData = shuffle(data)
      const result = [];

      for (let i = 0; i < groupData.groupNum; i += 1) {
        const arr = [];
        for (let j = 0; j < groupData.minMember; j += 1) {
          arr.push(shuffledData.pop());
        }
        result.push(arr);
      }

      while (shuffledData.length !== 0) {
        const random = Math.floor(Math.random() * groupData.groupNum);
        result[random].push(shuffledData.pop());
      }

      return result.map((data, i) => {
        return (
          <div key={i} className="match">
            {data.map((data, i) => {
              return (
                <div key={i}>
                  {data.name}
                </div>
              );
            })}
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="matchList">
        <h1>
          Match
        </h1>
          {this.renderMatch()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.getDataReducer.data,
  groupData: state.makeGroupReducer.groupData,
});

export default connect(mapStateToProps, null)(Match);
