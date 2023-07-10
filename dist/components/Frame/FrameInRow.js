"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _FrameModule = _interopRequireDefault(require("../style/Frame.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const FrameInRow = _ref => {
  let {
    width,
    children
  } = _ref;
  const isList = Array.isArray(children);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: _FrameModule.default.frameinrow
  }, width && isList && children.map((item, count) => {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: count + "_" + Math.random(),
      className: _FrameModule.default["frameinrow" + width[count]]
    }, item);
  }), width && !isList && /*#__PURE__*/_react.default.createElement("div", {
    key: 0 + "_" + Math.random(),
    className: _FrameModule.default["frameinrow" + width[0]]
  }, children), !width && /*#__PURE__*/_react.default.createElement("div", {
    key: 0 + "_" + Math.random(),
    className: _FrameModule.default["frameinrownowidth"]
  }, children)));
};
var _default = FrameInRow;
exports.default = _default;