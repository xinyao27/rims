import Provider from './provider';
import { checkFrame } from './check';
import initMapStateToProps from './mapStateToProps';
import initDispatchToProps from './mapDispatchToProps';

function createConnect(store, Frame) {
  checkFrame(Frame);
  return (mapState, mapDispatch) => (WrappedComponent) => {
    const mapStateToProps = initMapStateToProps(mapState);
    const mapDispatchToProps = initDispatchToProps(mapDispatch);

    return Provider({
      store,
      mapStateToProps,
      mapDispatchToProps,
      WrappedComponent,
      Frame,
    });
  };
}

export default createConnect;
