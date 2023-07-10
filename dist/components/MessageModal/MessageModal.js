"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Button = _interopRequireDefault(require("../Button/Button"));
var _MessageModalModule = _interopRequireDefault(require("../style/MessageModal.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MessageModal = (_ref, props) => {
  let {
    id,
    type,
    buttons,
    title,
    message,
    children,
    onOut
  } = _ref;
  const classContent = [_MessageModalModule.default.messagemodal_modal, _MessageModalModule.default["messagemodal_modal_" + (type ? type : "msg")]];
  const c_buttons = buttons ? buttons : [{
    key: 1,
    onClick: "onSave",
    type: "success",
    label: "Salva"
  }, {
    key: 2,
    onClick: "onStop",
    type: "stop",
    label: "Annulla"
  }];
  return /*#__PURE__*/_react.default.createElement("div", {
    id: id
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _MessageModalModule.default.messagemodal_backdrop,
    onClick: onOut
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: classContent.join(" ")
  }, /*#__PURE__*/_react.default.createElement("header", {
    className: _MessageModalModule.default.messagemodal_header
  }, /*#__PURE__*/_react.default.createElement("h2", null, title)), /*#__PURE__*/_react.default.createElement("div", {
    className: _MessageModalModule.default.messagemodal_content
  }, message && /*#__PURE__*/_react.default.createElement("p", null, message), children && children), /*#__PURE__*/_react.default.createElement("footer", {
    className: "".concat(_MessageModalModule.default.messagemodal_actions, " ").concat(_MessageModalModule.default.messagemodal_footer)
  }, c_buttons.map(item => {
    return /*#__PURE__*/_react.default.createElement(_Button.default, {
      key: item.key,
      onClick: props[item.onClick],
      className: "".concat(_MessageModalModule.default.messagemodal_minButton, " ").concat(_MessageModalModule.default[item.type])
    }, item.label);
  }))));
};
var _default = MessageModal;
exports.default = _default;