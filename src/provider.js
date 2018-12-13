import React, { Component } from 'react';
import Subscribe from './subscribe';

function createProvider({
  state, dispatch, mapStateToProps, Components,
}) {
  class Provider extends Component {
    state = { ...state }

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
        console.log(action, storeState);
        if (!this._isMounted) {
          return;
        }

        this.setState((providerState) => {
          if (providerState === storeState) {
            return null;
          }
          return { ...storeState };
        });
      });
      this.unsubscribe = event;
    }

    render() {
      const props = {
        dispatch,
        ...mapStateToProps(this.state),
      };
      return (
        <Components {...props} />
      );
    }
  }

  return Provider;
}

export default createProvider;
