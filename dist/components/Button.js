"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ButtonModule = _interopRequireDefault(require("./style/Button.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Button = _ref => {
  let {
    children,
    onClick,
    className
  } = _ref;
  const clsStyle = [_ButtonModule.default.button, className];
  const onClickHandler = evt => {
    try {
      onClick(evt);
    } catch (error) {}
  };
  return /*#__PURE__*/_react.default.createElement("button", {
    className: clsStyle.join(" "),
    onClick: onClickHandler
  }, children);
};
var _default = Button;
exports.default = _default;