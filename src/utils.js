const isObject = val => val != null
  && typeof val === 'object'
  && Array.isArray(val) === false
  && Object.prototype.toString.call(val) === '[object Object]';

const isPlainObject = (val) => {
  if (isObject(val) === false) return false;

  if (typeof val.constructor !== 'function') return false;

  if (isObject(val.constructor.prototype) === false) return false;

  if (Object.prototype.hasOwnProperty.call(val.constructor.prototype, 'isPrototypeOf') === false) return false;

  return true;
};

const isFunction = func => typeof func === 'function';

const isArray = Array.isArray.bind(Array);

export {
  isObject,
  isPlainObject,
  isFunction,
  isArray,
};
