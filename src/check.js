import invariant from 'invariant';
import { isPlainObject, isFunction } from './utils';

function checkMapStateToProps(mapStateToProps) {
  invariant(
    isFunction(mapStateToProps),
    '[rims.mapStateToProps] mapStateToProps should be a function',
  );
}

function checkModel(model) {
  const { reducers, effects } = model;

  invariant(
    Object.prototype.hasOwnProperty.call(model, 'state'),
    '[rims.model] state should be defined',
  );

  if (reducers) {
    invariant(
      isPlainObject(reducers),
      `[rims.model] reducers should be plain object, bug got ${typeof reducers}`,
    );
  }

  if (effects) {
    invariant(
      isPlainObject(effects),
      `[rims.model] effects should be plain object, but got ${typeof effects}`,
    );
  }
}

function checkFrame(frame) {
  invariant(
    Object.prototype.hasOwnProperty.call(frame, 'createElement'),
    '[rims.frame] the react or class react frame must have a createElement method',
  );
}

function checkAction(action) {
  invariant(
    isPlainObject(action),
    `[rims.dispatch] dispatch action should be plain object, bug got ${typeof action}`,
  );

  invariant(
    typeof action.type !== 'undefined',
    '[rims.dispatch] dispatch action should be have an "type" property',
  );
}

export {
  checkMapStateToProps,
  checkModel,
  checkFrame,
  checkAction,
};
