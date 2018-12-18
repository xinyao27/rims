import invariant from 'invariant';
import { NAMESPACE_SEP } from './constants';

function prefix(obj, namespace, type) {
  // invariant(
  //   namespace,
  //   '[rims.createStore] when you use createStore, namespace should be defined',
  // );

  if (type === 'state') {
    return {
      [namespace]: obj,
    };
  }

  return Object.keys(obj).reduce((pre, cur) => {
    const newKey = `${namespace}${NAMESPACE_SEP}${cur}`;
    const val = { ...pre };
    val[newKey] = obj[cur];
    return val;
  }, {});
}

function createStore(...args) {
  const models = args.reduce((pre, cur) => {
    const {
      state, namespace, reducers, effects,
    } = cur;
    const val = { ...pre };
    if (state) {
      val.state = { ...pre.state, ...prefix(state, namespace, 'state') };
    }
    if (reducers) {
      val.reducers = { ...pre.reducers, ...prefix(reducers, namespace, 'reducers') };
    }
    if (effects) {
      val.effects = { ...pre.effects, ...prefix(effects, namespace, 'effects') };
    }
    return Object.assign(pre, val);
  }, {});

  let state = { ...models.state };

  const updateState = (val) => {
    state = { ...state, ...val };
    return state;
  };

  const getState = () => state;

  return () => ({
    models,
    updateState,
    getState,
  });
}

export default createStore;
