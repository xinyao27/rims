import { checkAction } from './check';
import Subscribe from './subscribe';
import { NAMESPACE_SEP } from './constants';

function createDispatch(model) {
  const state = typeof model === 'function' ? model().getState() : model.state;
  const { reducers, effects } = typeof model === 'function' ? model().models : model;

  const dispatch = (action) => {
    checkAction(action);
    const { type: dispatchType } = action;
    const namespace = dispatchType.indexOf('/') > 0 && dispatchType.split(NAMESPACE_SEP)[0];

    if (reducers && Object.prototype.hasOwnProperty.call(reducers, dispatchType)) {
      if (namespace) {
        const result = model().updateState({
          [namespace]: reducers[dispatchType](state[namespace], action),
        });
        Subscribe.publish(action, result);
      } else {
        const result = reducers[dispatchType](state, action);
        Subscribe.publish(action, result);
      }
    }

    if (effects && Object.prototype.hasOwnProperty.call(effects, dispatchType)) {
      const effectsDispatch = (effectsAction) => {
        const { type } = effectsAction;
        const splits = dispatchType.indexOf('/') > 0 && type.split(NAMESPACE_SEP);
        if (splits && splits.length === 1) {
          // If the dispatch in effects has no namespace, add
          dispatch({
            ...effectsAction,
            type: `${namespace}${NAMESPACE_SEP}${splits[0]}`,
          });
        } else {
          dispatch(effectsAction);
        }
      };
      effects[dispatchType]({
        state,
        dispatch: effectsDispatch,
      }, action);
    }

    return action;
  };
  return dispatch;
}

export default createDispatch;
