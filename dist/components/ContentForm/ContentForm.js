"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ContentFormModule = _interopRequireDefault(require("../style/ContentForm.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ContentForm = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _ContentFormModule.default.content_body
  }, children);
};
var _default = ContentForm;
exports.default = _default;