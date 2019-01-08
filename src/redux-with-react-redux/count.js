import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {increment as count_increment, increment_async as count_increment_async} from './actions/count';

class CountComponent extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
  }
  
  Increment = () => {
    this.props.count_increment();
  }

  IncrementAsync = () => {
    this.props.count_increment_async();
  }

  render() {
    const { count, count2 } = this.props;
    return (
      <div>
        Count {count}
        Count2 {count2}
        <button type="button" onClick={this.Increment}>increment</button>
        <button type="button" onClick={this.IncrementAsync}>incrementAsync</button>
      </div>
    );
  }
}

const Count = connect(
  state => state,
  {
    count_increment,
    count_increment_async,
  }
)(CountComponent);

export default Count;