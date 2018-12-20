import Provider from './provider';
import { checkMapStateToProps, checkMapDispatchToProps, checkFrame } from './check';

function createConnect(store, Frame) {
  checkFrame(Frame);
  return (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    checkMapStateToProps(mapStateToProps);
    checkMapDispatchToProps(mapDispatchToProps);
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
