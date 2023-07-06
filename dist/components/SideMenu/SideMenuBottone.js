"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _SideMenuBottoneModule = _interopRequireDefault(require("../style/SideMenuBottone.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SideMenuBottone = _ref => {
  let {
    src,
    label,
    onoff,
    className
  } = _ref;
  const stylecontent = [_SideMenuBottoneModule.default.sidemenubottone_content, className];
  return /*#__PURE__*/_react.default.createElement("div", {
    className: stylecontent.join(" ")
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("img", {
    src: src,
    alt: ""
  })), onoff && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", null, label)));
};
var _default = SideMenuBottone;
exports.default = _default;