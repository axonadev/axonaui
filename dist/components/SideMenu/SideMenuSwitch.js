"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _SideMenuSwitchModule = _interopRequireDefault(require("../style/SideMenuSwitch.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SideMenuSwitch = _ref => {
  let {
    onoff,
    onClick
  } = _ref;
  const stylecontent = [_SideMenuSwitchModule.default.sidemenuswitch_content, onoff ? _SideMenuSwitchModule.default.sidemenuswitch_open : _SideMenuSwitchModule.default.sidemenuswitch_close];
  const switchevent = () => {
    onClick();
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: stylecontent.join(" "),
    onClick: switchevent
  }, /*#__PURE__*/_react.default.createElement("label", null, onoff ? "<" : ">"));
};
var _default = SideMenuSwitch;
exports.default = _default;