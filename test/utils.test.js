import { isObject, isPlainObject, isFunction } from '../src/utils/utils';

describe('isObject', () => {
  it('returns true only if object', () => {
    const Test = {};

    expect(isObject(Test)).toBe(true);
    expect(isObject(new Date())).toBe(false);
    expect(isObject([1, 2, 3])).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject()).toBe(false);
    expect(isObject({ x: 1, y: 2 })).toBe(true);
  });
});

describe('isPlainObject', () => {
  it('returns true only if plain object', () => {
    function Test() {
      this.prop = 1;
    }

    expect(isPlainObject(new Test())).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
    expect(isPlainObject([1, 2, 3])).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject()).toBe(false);
    expect(isPlainObject({ x: 1, y: 2 })).toBe(true);
  });
});

describe('isFunction', () => {
  it('returns true only if function', () => {
    function Test() {}
    const arrowFunc = () => {};

    expect(isFunction(Test)).toBe(true);
    expect(isFunction(arrowFunc)).toBe(true);
    expect(isFunction({})).toBe(false);
    expect(isFunction([1, 2, 3])).toBe(false);
    expect(isFunction(null)).toBe(false);
  });
});
