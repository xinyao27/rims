/* eslint-disable react/prop-types */

import React from 'react';
import { render } from 'enzyme';
import { createStore } from 'redux';
import { createConnect } from '../src';

describe('createConnect', () => {
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
});
