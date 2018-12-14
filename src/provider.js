import equal from 'fast-deep-equal';
import produce from 'immer';
import Subscribe from './subscribe';

function createProvider({
  state, dispatch, mapStateToProps, Components, Frame,
}) {
  const FrameUsed = Frame || require('react');
  const Component = Object.prototype.hasOwnProperty.call(FrameUsed, 'PureComponent')
    ? FrameUsed.PureComponent
    : FrameUsed.Component;
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
      if (Object.prototype.hasOwnProperty.call(FrameUsed, 'createElement')) {
        return FrameUsed.createElement(Components, props);
      }
      throw new Error('Incoming framework error, should pass a framework similar to React!');
    }
  }

  return Provider;
}

export default createProvider;
