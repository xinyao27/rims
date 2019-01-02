/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render, mount } from 'enzyme';
import { createStore } from 'redux';
import { createConnect } from '../src';

const createExampleTextReducer = () => (state = 'example text') => ({ text: state });

function stringBuilder(prev = '', action) {
  return action.type === 'APPEND' ? prev + action.body : prev;
}

const propMapper = (prop) => {
  switch (typeof prop) {
    case 'object':
    case 'boolean':
      return JSON.stringify(prop);
    case 'function':
      return `[function ${prop.name}]`;
    default:
      return prop;
  }
};
const Passthrough = props => (
  <ul>
    {Object.keys(props).map(prop => (
      <li title="prop" id={prop} key={prop}>
        {propMapper(props[prop])}
      </li>
    ))}
  </ul>
);

describe('createConnect', () => {
  it('connect and children should have props dispatch', () => {
    const initialState = {
      foo: 'bar',
    };
    const store = createStore(() => initialState);
    const connect = createConnect(store);

    const AppComponent = (props) => {
      expect(Object.hasOwnProperty.call(props, 'dispatch')).toBe(true);
      return (
        <div>{props.foo}</div>
      );
    };
    const App = connect(state => state)(AppComponent);

    render(<App />);
  });

  it('should map state and render once on mount', () => {
    let mapCount = 0;
    let renderCount = 0;

    const initialState = {
      foo: 'bar',
    };
    const store = createStore(() => {
      mapCount++;
      return initialState;
    });
    const connect = createConnect(store);

    const AppComponent = (props) => {
      renderCount++;
      return (
        <div>{props.foo}</div>
      );
    };
    const App = connect(state => state)(AppComponent);

    const app = render(<App />);
    expect(app.text()).toBe(initialState.foo);
    expect(renderCount).toBe(1);
    expect(mapCount).toBe(1);
  });

  it('should map state on own props change but props invariant render unchanged', () => {
    let mapCount = 0;
    let renderCount = 0;

    const initialState = {
      foo: 'bar',
    };
    const store = createStore(() => {
      mapCount++;
      return initialState;
    });
    const connect = createConnect(store);

    const AppComponent = (props) => {
      renderCount++;
      return (
        <div>{props.foo}</div>
      );
    };
    const App = connect(state => state)(AppComponent);

    const app = render(<App />);

    store.dispatch({ type: 'NEW_REFERENCE' });

    expect(app.text()).toBe(initialState.foo);
    expect(renderCount).toBe(1);
    expect(mapCount).toBe(2);
  });

  it('should add the store state to props', () => {
    const store = createStore(createExampleTextReducer());
    const connect = createConnect(store);

    const AppComponent = props => <div>{props.text}</div>;
    const App = connect(state => state)(AppComponent);

    const app = render(<App />);

    expect(app.text()).toBe('example text');
  });

  it('should unsubscribe before unmounting', () => {
    const store = createStore(createExampleTextReducer());
    const { subscribe } = store;

    const spy = jest.fn(() => ({}));
    store.subscribe = (listener) => {
      const unsubscribe = subscribe(listener);
      return () => {
        spy();
        return unsubscribe();
      };
    };

    const connect = createConnect(store);

    const AppComponent = props => <div>{props.text}</div>;
    const App = connect(state => state)(AppComponent);

    const div = document.createElement('div');
    ReactDOM.render(
      <App />,
      div,
    );

    expect(spy).toHaveBeenCalledTimes(0);
    ReactDOM.unmountComponentAtNode(div);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should subscribe class components to the store changes', () => {
    const store = createStore(stringBuilder);

    const connect = createConnect(store);

    class ContainerComponent extends Component {
      render() {
        return <Passthrough {...this.props} />;
      }
    }
    const Container = connect(state => ({ string: state }))(ContainerComponent);

    const tester = mount(<Container />);

    expect(tester.find('#string').text()).toBe('');
    store.dispatch({ type: 'APPEND', body: 'a' });
    expect(tester.find('#string').text()).toBe('a');
    store.dispatch({ type: 'APPEND', body: 'b' });
    expect(tester.find('#string').text()).toBe('ab');
  });

  it('should subscribe pure function components to the store changes', () => {
    const store = createStore(stringBuilder);

    const connect = createConnect(store);

    const ContainerComponent = props => <Passthrough {...props} />;
    const Container = connect(state => ({ string: state }))(ContainerComponent);

    const tester = mount(<Container />);

    expect(tester.find('#string').text()).toBe('');
    store.dispatch({ type: 'APPEND', body: 'a' });
    expect(tester.find('#string').text()).toBe('a');
    store.dispatch({ type: 'APPEND', body: 'b' });
    expect(tester.find('#string').text()).toBe('ab');
  });
});
