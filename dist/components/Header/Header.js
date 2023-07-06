"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Img = _interopRequireDefault(require("../Img/Img"));
var _HeaderModule = _interopRequireDefault(require("../style/Header.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Header = _ref => {
  let {
    id,
    logo,
    titolo,
    pathimg
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("header", {
    id: id,
    className: _HeaderModule.default.header_content
  }, /*#__PURE__*/_react.default.createElement("div", {
    id: id,
    className: _HeaderModule.default.header_contentorizontal
  }, /*#__PURE__*/_react.default.createElement(_Img.default, {
    src: logo,
    type: "icon"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: _HeaderModule.default.header_contentvertical
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: _HeaderModule.default.header_label
  }, titolo)), /*#__PURE__*/_react.default.createElement("div", {
    className: _HeaderModule.default.header_contentvertical
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_Img.default, {
    src: pathimg + "/message.png",
    type: "button"
  }), /*#__PURE__*/_react.default.createElement(_Img.default, {
    src: pathimg + "/notification.png",
    type: "button"
  }), /*#__PURE__*/_react.default.createElement(_Img.default, {
    src: pathimg + "/settings.png",
    type: "button"
  })))));
};
var _default = Header;
exports.default = _default;