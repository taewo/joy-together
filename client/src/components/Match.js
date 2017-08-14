import React, { Component } from 'react';
import { connect } from 'react-redux';
import shuffle from 'lodash.shuffle';
import { browserHistory } from 'react-router';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      groupNum: 0,
      minMember: 0,
    };
    this.renderMatch = this.renderMatch.bind(this);
  }

  componentWillMount() {
    console.log('componentWillMount');
    const { data, groupData } = this.props;
    if (data.length === 0 || groupData.groupNum === 0 || groupData.minMember === 0) {
      console.log('before browserHistory push');
      browserHistory.push('/');
    } else {
      this.setState({
        data: data,
        groupNum: groupData.groupNum,
        minMember: groupData.minMember,
      })
      console.log('this.state1 ', this.state);
    }
  }

  renderMatch() {
    const { data, groupData } = this.props;
    console.log('this.state2 ', this.state);
    // let realResult = null;
    if (data.length !== 0 && groupData.groupNum !== 0 && groupData.minMember !== 0) {
      const shuffledData = shuffle(data)
      const result = [];
      console.log(123, shuffledData);

      for (let i = 0; i < groupData.groupNum; i += 1) {
        const arr = [];
        for (let j = 0; j < groupData.minMember; j += 1) {
          arr.push(shuffledData.pop());
        }
        result.push(arr);
      }

      while (shuffledData.length !== 0) {
        const random = Math.floor(Math.random() * groupData.groupNum);
        console.log('random', random)
        console.log('result', result);
        result[random].push(shuffledData.pop());
      }
      console.log(123123, result);


      console.log(9999)
      return result.map((data, i) => {
        return (
          <div key={i} className="match">
            {data.map((data, i) => {
              return (
                <div key={i}>
                  {data.name}
                </div>
              )
            })}
          </div>
        )
      })
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
