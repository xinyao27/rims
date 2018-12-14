(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('immer')) :
  typeof define === 'function' && define.amd ? define(['react', 'immer'], factory) :
  (global.Rims = factory(global.React,global.produce));
}(this, (function (React,produce) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;
  produce = produce && produce.hasOwnProperty('default') ? produce['default'] : produce;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function createSubscribe() {
    var Subscribe =
    /*#__PURE__*/
    function () {
      function Subscribe() {
        _classCallCheck(this, Subscribe);

        _defineProperty(this, "_subscribers", []);
      }

      _createClass(Subscribe, [{
        key: "subscribe",
        value: function subscribe(func) {
          var subs = this._subscribers;

          if (subs.indexOf(func) < 0) {
            subs.push(func);
          }

          return function () {
            var i = subs.indexOf(func);

            if (i > -1) {
              subs.splice(i, 1);
            }
          };
        }
      }, {
        key: "publish",
        value: function publish(action, state) {
          this._subscribers.forEach(function (sub) {
            return sub(action, state);
          });
        }
      }]);

      return Subscribe;
    }();

    return new Subscribe();
  }

  var Subscribe = createSubscribe();

  var isArray = Array.isArray;
  var keyList = Object.keys;
  var hasProp = Object.prototype.hasOwnProperty;

  var fastDeepEqual = function equal(a, b) {
    if (a === b) return true;

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      var arrA = isArray(a)
        , arrB = isArray(b)
        , i
        , length
        , key;

      if (arrA && arrB) {
        length = a.length;
        if (length != b.length) return false;
        for (i = length; i-- !== 0;)
          if (!equal(a[i], b[i])) return false;
        return true;
      }

      if (arrA != arrB) return false;

      var dateA = a instanceof Date
        , dateB = b instanceof Date;
      if (dateA != dateB) return false;
      if (dateA && dateB) return a.getTime() == b.getTime();

      var regexpA = a instanceof RegExp
        , regexpB = b instanceof RegExp;
      if (regexpA != regexpB) return false;
      if (regexpA && regexpB) return a.toString() == b.toString();

      var keys = keyList(a);
      length = keys.length;

      if (length !== keyList(b).length)
        return false;

      for (i = length; i-- !== 0;)
        if (!hasProp.call(b, keys[i])) return false;

      for (i = length; i-- !== 0;) {
        key = keys[i];
        if (!equal(a[key], b[key])) return false;
      }

      return true;
    }

    return a!==a && b!==b;
  };

  function createProvider(_ref) {
    var state = _ref.state,
        dispatch = _ref.dispatch,
        mapStateToProps = _ref.mapStateToProps,
        Components = _ref.Components,
        Frame = _ref.Frame;
    var FrameUsed = Frame || React;
    var Component = Object.prototype.hasOwnProperty.call(FrameUsed, 'PureComponent') ? FrameUsed.PureComponent : FrameUsed.Component;

    var Provider =
    /*#__PURE__*/
    function (_Component) {
      _inherits(Provider, _Component);

      function Provider() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, Provider);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Provider)).call.apply(_getPrototypeOf2, [this].concat(args)));

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
          storeState: state
        });

        _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_isMounted", false);

        return _this;
      }

      _createClass(Provider, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this._isMounted = true;
          this.subscribe();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this._isMounted = false;
          this.unsubscribe();
        }
      }, {
        key: "subscribe",
        value: function subscribe() {
          var _this2 = this;

          var event = Subscribe.subscribe(function (action, storeState) {
            if (!_this2._isMounted) {
              return;
            }

            var newState = produce(_this2.state, function (draft) {
              draft.storeState = storeState; // eslint-disable-line
            });

            if (!fastDeepEqual(newState, _this2.state)) {
              _this2.setState(newState);
            }
          });
          this.unsubscribe = event;
        }
      }, {
        key: "render",
        value: function render() {
          var storeState = this.state.storeState;

          var props = _objectSpread({
            dispatch: dispatch
          }, mapStateToProps(storeState));

          if (Object.prototype.hasOwnProperty.call(FrameUsed, 'createElement')) {
            return FrameUsed.createElement(Components, props);
          }

          throw new Error('Incoming framework error, should pass a framework similar to React!');
        }
      }]);

      return Provider;
    }(Component);

    return Provider;
  }

  var connect = function connect(mapStateToProps, _ref, Frame) {
    var state = _ref.state,
        reducers = _ref.reducers,
        effects = _ref.effects;
    return function (Components) {
      var dispatch = function dispatch(action) {
        var dispatchType = action.type;

        if (dispatchType in reducers) {
          var result = reducers[dispatchType](state, action);
          Subscribe.publish(action, result);
        }

        if (dispatchType in effects) {
          effects[dispatchType]({
            dispatch: dispatch
          }, action);
        }

        return action;
      };

      return createProvider({
        state: state,
        dispatch: dispatch,
        mapStateToProps: mapStateToProps,
        Components: Components,
        Frame: Frame
      });
    };
  };

  var index = {
    connect: connect
  };

  return index;

})));
