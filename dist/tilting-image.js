(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'react'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.React);
    global.index = mod.exports;
  }
})(this, function (exports, module, _react) {
  'use strict';

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var MAX_ROTATE = 5;

  var TiltingImage = (function (_Component) {
    function TiltingImage(props) {
      _classCallCheck(this, TiltingImage);

      _get(Object.getPrototypeOf(TiltingImage.prototype), 'constructor', this).call(this, props);
      this.state = { rotateX: 0, rotateY: 0 };
    }

    _inherits(TiltingImage, _Component);

    _createClass(TiltingImage, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var src = _props.src;
        var width = _props.width;
        var height = _props.height;

        var attrs = _objectWithoutProperties(_props, ['src', 'width', 'height']);

        var containerStyle = {
          width: width,
          height: height,
          overflow: 'hidden',
          perspective: '1000px'
        };

        var imageStyle = {
          width: '100%',
          height: '100%',
          backgroundSize: 'cover',
          backgroundImage: 'url("' + src + '")',
          transition: 'transform 0.1s',
          transform: 'scale(1.1) rotateX(' + this.state.rotateX + 'deg) rotateY(' + this.state.rotateY + 'deg)'
        };

        return _React['default'].createElement(
          'div',
          _extends({}, attrs, { style: containerStyle, onMouseMove: this.tilt.bind(this), onMouseLeave: this.reset.bind(this) }),
          _React['default'].createElement('div', { style: imageStyle })
        );
      }
    }, {
      key: 'tilt',
      value: function tilt(evt) {
        var targetEl = evt.currentTarget;
        var rotateX = map(evt.clientY, 0, targetEl.clientHeight, MAX_ROTATE, -MAX_ROTATE);
        var rotateY = map(evt.clientX, 0, targetEl.clientWidth, -MAX_ROTATE, MAX_ROTATE);

        this.setState({ rotateX: rotateX, rotateY: rotateY });
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.setState({ rotateX: 0, rotateY: 0 });
      }
    }]);

    return TiltingImage;
  })(_react.Component);

  module.exports = TiltingImage;
  ;

  TiltingImage.propTypes = {
    src: _React['default'].PropTypes.string.isRequired,
    width: _React['default'].PropTypes.string.isRequired,
    height: _React['default'].PropTypes.string.isRequired
  };

  function map(value, sourceMin, sourceMax, destMin, destMax) {
    return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
  }

  function lerp(norm, min, max) {
    return (max - min) * norm + min;
  }

  function norm(value, min, max) {
    return (value - min) / (max - min);
  }
});
