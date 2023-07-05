"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
const CssStruct = _ref => {
  let {
    children
  } = _ref;
  (0, _react.useEffect)(() => {
    document.documentElement.style.setProperty("--testcolor", "#9BFF3D");
  }, []);
  return children;
};
var _default = CssStruct;
exports.default = _default;