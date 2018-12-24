import invariant from 'invariant';
import { isPlainObject, isFunction } from './utils';

function checkMapStateToProps(mapStateToProps) {
  if (mapStateToProps) {
    invariant(
      isFunction(mapStateToProps),
      `[rims.mapStateToProps] mapStateToProps should be a function or undefined/null, got ${typeof mapStateToProps}`,
    );
  }
}

function checkMapDispatchToProps(mapDispatchToProps) {
  if (mapDispatchToProps) {
    invariant(
      isPlainObject(mapDispatchToProps),
      `[rims.mapDispatchToProps] mapDispatchToProps should be a plain object, got ${typeof mapDispatchToProps}`,
    );
  }
}

function checkFrame(frame) {
  if (frame) {
    invariant(
      Object.prototype.hasOwnProperty.call(frame, 'createElement'),
      '[rims.frame] the react or class react frame must have a createElement method',
    );
  }
}

export {
  checkMapStateToProps,
  checkMapDispatchToProps,
  checkFrame,
};
