import equal from 'fast-deep-equal';
import hoistNonReactStatics from 'hoist-non-react-statics';

function createProvider({
  store,
  mapStateToProps,
  mapDispatchToProps,
  WrappedComponent,
  Frame,
}) {
  const FrameUsed = Frame || require('react');
  const Component = Object.prototype.hasOwnProperty.call(FrameUsed, 'PureComponent')
    ? FrameUsed.Component
    : FrameUsed.Component;

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const FinalWrappedComponent = WrappedComponent;

  function makeChildElementSelector() {
    let lastChildProps;
    let lastChildElement;

    return function selectChildElement(childProps) {
      if (childProps !== lastChildProps) {
        lastChildProps = childProps;
        lastChildElement = FrameUsed.createElement(
          FinalWrappedComponent,
          childProps,
        );
      }

      return lastChildElement;
    };
  }

  class Provider extends Component {
    constructor(props) {
      super(props);

      this.state = { storeState: store.getState() };

      this._isMounted = false;

      this.handleStoreStateChange = this.handleStoreStateChange.bind(this);

      this.selectChildElement = makeChildElementSelector();
    }

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

    handleStoreStateChange() {
      if (!this._isMounted) {
        return;
      }
      if (!equal(store.getState(), this.state.storeState)) {
        this.setState({ storeState: store.getState() });
      }
    }

    subscribe() {
      this.unsubscribe = store.subscribe(this.handleStoreStateChange);
    }

    render() {
      const props = {
        dispatch: store.dispatch,
        ...mapStateToProps(this.state.storeState),
        ...mapDispatchToProps,
        ...this.props,
      };
      if (Object.prototype.hasOwnProperty.call(FrameUsed, 'createElement')) {
        return this.selectChildElement(props);
      }
      return null;
    }
  }

  Provider.WrappedComponent = WrappedComponent;
  Provider.displayName = wrappedComponentName;

  return hoistNonReactStatics(Provider, WrappedComponent);
}

export default createProvider;
