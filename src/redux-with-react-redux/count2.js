import React from 'react';
import PropTypes from 'prop-types';
import connect from './createConnect';
import {increment as count2_increment, increment_async as count2_increment_async} from './actions/count2';

class CountComponent2 extends React.Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
  }

  Increment = () => {
    this.props.count2_increment();
  }

  IncrementAsync = () => {
    this.props.count2_increment_async();
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

const Count2 = connect(
  state => state,
  {
    count2_increment,
    count2_increment_async,
  }
)(CountComponent2);

export default Count2;