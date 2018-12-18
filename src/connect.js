import Dispatch from './dispatch';
import Provider from './provider';
import { checkMapStateToProps, checkModel, checkFrame } from './check';

const connect = (mapStateToProps, model, Frame) => (Components) => {
  checkMapStateToProps(mapStateToProps);
  checkModel(model);
  if (Frame) checkFrame(Frame);

  const store = typeof model === 'function' ? model() : model;
  const dispatch = Dispatch(model);

  return Provider({
    state: typeof model === 'function' ? store.getState() : model.state,
    dispatch,
    mapStateToProps,
    Components,
    Frame,
  });
};

export default connect;
