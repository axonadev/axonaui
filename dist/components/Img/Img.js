"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ImgModule = _interopRequireDefault(require("../style/Img.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Img = _ref => {
  let {
    className,
    src,
    alt,
    type
  } = _ref;
  const classn = [_ImgModule.default["img_" + type], _ImgModule.default.img, className ? " " + className : ""];
  return /*#__PURE__*/_react.default.createElement("img", {
    src: src,
    alt: alt ? alt : "",
    className: classn.join(" ")
  });
};
var _default = Img;
exports.default = _default;