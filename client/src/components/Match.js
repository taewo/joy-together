import React, { Component } from 'react';
import { connect } from 'react-redux';
import shuffle from 'lodash.shuffle';
import Spinner from 'react-spinkit';
import { browserHistory } from 'react-router';
import { getRandomColor } from '../config';
import { makeGroup } from '../action/makeGroupAction';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
    }
    this.renderMatch = this.renderMatch.bind(this);
  }

  componentDidMount() {
    const { data, groupData } = this.props;
    if (data.length === 0 || groupData.groupNum === 0 || groupData.minMember === 0) {
      browserHistory.push('/');
    }
    setTimeout(() => {
      this.setState({ spinner: false });
    }, 500);
  }

  componentWillUnmount() {
    this.props.initMakeGroupData(0, 0);
  }

  renderMatch() {
    if (this.state.spinner) {
      return (
        <div className="spinner">
          <Spinner name="ball-scale-multiple" color="steelblue" fadeIn="none" />
        </div>
      )
    } else {
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
            <div className="group" key={i}>
              <h2 style={{textAlign:"center"}}>
                {i+1} 번째 그룹
              </h2>
              <div key={i} className="personList">
                {data.map((data, i) => {
                  return (
                    <div key={i} className="person" style={{backgroundColor: getRandomColor()}}>
                      {data.name}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        });
      }
    }
  }

  render() {
    return (
      <div className="matchList">
        {this.renderMatch()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.getDataReducer.data,
  groupData: state.makeGroupReducer.groupData,
});

const mapDispatchToProps = dispatch => ({
  initMakeGroupData: (groupNum, minMember) => { dispatch(makeGroup(groupNum, minMember)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Match);
