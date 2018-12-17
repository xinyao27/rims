import Subscribe from './subscribe';
import Provider from './provider';
import {
  checkMapStateToProps, checkModel, checkFrame, checkAction,
} from './check';

const connect = (mapStateToProps, model, Frame) => (Components) => {
  checkMapStateToProps(mapStateToProps);
  checkModel(model);
  checkFrame(Frame);

  const { state, reducers, effects } = model;

  const dispatch = (action) => {
    checkAction(action);

    const { type: dispatchType } = action;

    if (reducers && Object.prototype.hasOwnProperty.call(reducers, dispatchType)) {
      const result = reducers[dispatchType](state, action);
      Subscribe.publish(action, result);
    }

    if (effects && Object.prototype.hasOwnProperty.call(effects, dispatchType)) {
      effects[dispatchType]({
        dispatch,
      }, action);
    }

    return action;
  };

  return Provider({
    state,
    dispatch,
    mapStateToProps,
    Components,
    Frame,
  });
};

export default connect;
