"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _LoadingSpinnerModule = _interopRequireDefault(require("./style/LoadingSpinner.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const LoadingSpinner = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: _LoadingSpinnerModule.default.spinner
  });
};
var _default = LoadingSpinner;
exports.default = _default;