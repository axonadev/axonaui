"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _FrameModule = _interopRequireDefault(require("../style/Frame.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Frame = _ref => {
  let {
    label,
    children
  } = _ref;
  const classStyle = ["frame_label", _FrameModule.default.frame_label];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, label && /*#__PURE__*/_react.default.createElement("div", {
    className: classStyle.join(" ")
  }, label), /*#__PURE__*/_react.default.createElement("div", {
    className: _FrameModule.default.framecontent
  }, children));
};
var _default = Frame;
exports.default = _default;