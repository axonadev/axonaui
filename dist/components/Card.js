"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _CardModule = _interopRequireDefault(require("./style/Card.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Card = _ref => {
  let {
    children,
    className,
    id
  } = _ref;
  const cls = [_CardModule.default.card, className];
  return /*#__PURE__*/_react.default.createElement("div", {
    id: id,
    className: cls.join(" ")
  }, children);
};
var _default = Card;
exports.default = _default;