import Subscribe from './subscribe';
import Provider from './provider';

const connect = (mapStateToProps, { state, reducers, effects }) => (Components) => {
  const dispatch = (action) => {
    const { type: dispatchType } = action;

    if (dispatchType in reducers) {
      const result = reducers[dispatchType](state, action);
      Subscribe.publish(action, result);
    }

    if (dispatchType in effects) {
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
  });
};

export default connect;
