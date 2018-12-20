import equal from 'fast-deep-equal';
import hoistNonReactStatics from 'hoist-non-react-statics';

function createProvider({
  store, mapStateToProps, mapDispatchToProps, WrappedComponent, Frame,
}) {
  const FrameUsed = Frame || require('react');
  const Component = Object.prototype.hasOwnProperty.call(FrameUsed, 'PureComponent')
    ? FrameUsed.Component
    : FrameUsed.Component;
  class Provider extends Component {
    state = { storeState: store.getState() };

    _isMounted = false;

    componentDidMount() {
      this._isMounted = true;
      this.subscribe();
    }

    shouldComponentUpdate(prevProps, prevState) {
      if (!equal(mapStateToProps(prevState.storeState), mapStateToProps(this.state.storeState))) {
        return true;
      }
      return false;
    }

    componentWillUnmount() {
      this._isMounted = false;
      this.unsubscribe();
    }

    handleChange = () => {
      if (!this._isMounted) {
        return;
      }
      if (!equal(store.getState(), this.state.storeState)) {
        this.setState({ storeState: store.getState() });
      }
    }

    subscribe() {
      this.unsubscribe = store.subscribe(this.handleChange);
    }

    render() {
      const props = {
        dispatch: store.dispatch,
        ...mapStateToProps(this.state.storeState),
        ...mapDispatchToProps,
      };
      if (Object.prototype.hasOwnProperty.call(FrameUsed, 'createElement')) {
        return FrameUsed.createElement(WrappedComponent, props);
      }
      return null;
    }
  }

  return hoistNonReactStatics(Provider, WrappedComponent);
}

export default createProvider;
