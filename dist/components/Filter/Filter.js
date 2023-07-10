"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.search.js");
var _react = _interopRequireDefault(require("react"));
var _Img = _interopRequireDefault(require("../Img/Img"));
var _Input = _interopRequireDefault(require("../Input/Input"));
var _Button = _interopRequireDefault(require("../Button/Button"));
var _FilterModule = _interopRequireDefault(require("../style/Filter.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Filter = _ref => {
  let {
    id,
    itemSearch,
    onFilter
  } = _ref;
  const clickSearchHandler = () => {
    const valFilter = document.getElementById(id).value;
    onFilter(valFilter, itemSearch);
  };
  const idFilter = id ? id : "idFilter";
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Input.default, {
    className: _FilterModule.default.search,
    id: idFilter
  }), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: clickSearchHandler,
    className: _FilterModule.default.button
  }, /*#__PURE__*/_react.default.createElement(_Img.default, {
    type: "find",
    className: _FilterModule.default.search_img
  })));
};
var _default = Filter;
exports.default = _default;