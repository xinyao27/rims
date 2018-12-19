import Provider from './provider';
import { checkMapStateToProps, checkMapDispatchToProps, checkFrame } from './check';

function createConnect(store, Frame) {
  checkFrame(Frame);
  return (mapStateToProps, mapDispatchToProps) => (Components) => {
    checkMapStateToProps(mapStateToProps);
    checkMapDispatchToProps(mapDispatchToProps);
    return Provider({
      store,
      mapStateToProps,
      mapDispatchToProps,
      Components,
      Frame,
    });
  };
}

export default createConnect;
