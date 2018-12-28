import React from 'react';
import PropTypes from 'prop-types';
import connect from './createConnect';
import {increment as count_increment, increment_async as count_increment_async} from './actions/count';
import {increment as count2_increment, increment_async as count2_increment_async} from './actions/count2';

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
    const { count } = this.props;
    return (
      <div>
        Count {count}
        <button type="button" onClick={this.Increment}>increment</button>
        <button type="button" onClick={this.IncrementAsync}>incrementAsync</button>
      </div>
    );
  }
}

const Count = connect(
  ({count}) => ({count}),
  {
    count_increment,
    count_increment_async,
  }
)(CountComponent)

class Count2Component extends React.Component {
  Increment = () => {
    this.props.count2_increment();
  }

  IncrementAsync = () => {
    this.props.count2_increment_async();
  }

  render() {
    const { count } = this.props;
    return (
      <div>
        Count2 {count}
        <button type="button" onClick={this.Increment}>increment</button>
        <button type="button" onClick={this.IncrementAsync}>incrementAsync</button>
      </div>
    );
  }
}

const Count2 = connect(
  ({count2}) => ({count: count2}),
  {
    count2_increment,
    count2_increment_async,
  }
)(Count2Component)

class App extends React.Component {
  state = {
    count: 0
  };
  
  componentDidMount() {
    setTimeout(() => {
      this.setState(({count}) => ({
        count: count + 1
      }))
    }, 1000);
  }
  
  render() {
    return (
      <div>
        <Count />
        <Count2 />
      </div>
    )
  }
}

export default App;