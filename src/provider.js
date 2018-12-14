import React, { Component } from 'react';
import equal from 'fast-deep-equal';
import produce from 'immer';
import Subscribe from './subscribe';

function createProvider({
  state, dispatch, mapStateToProps, Components,
}) {
  class Provider extends Component {
    state = { storeState: state };

    _isMounted = false;

    componentDidMount() {
      this._isMounted = true;
      this.subscribe();
    }

    componentWillUnmount() {
      this._isMounted = false;
      this.unsubscribe();
    }

    subscribe() {
      const event = Subscribe.subscribe((action, storeState) => {
        if (!this._isMounted) {
          return;
        }

        const newState = produce(this.state, (draft) => {
          draft.storeState = storeState; // eslint-disable-line
        });

        if (!equal(newState, this.state)) {
          this.setState(newState);
        }
      });
      this.unsubscribe = event;
    }

    render() {
      const { storeState } = this.state;
      const props = {
        dispatch,
        ...mapStateToProps(storeState),
      };
      return (
        <Components {...props} />
      );
    }
  }

  return Provider;
}

export default createProvider;
