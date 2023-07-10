"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _SideMenuBottone = _interopRequireDefault(require("./SideMenuBottone"));
var _SideMenuAmbitoModule = _interopRequireDefault(require("../style/SideMenuAmbito.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const SideMenuAmbito = _ref => {
  let {
    label,
    src,
    onoff,
    list,
    selezionato,
    idAmbito,
    onClick,
    onSelProgetto
  } = _ref;
  const selAmbitoEvent = () => {
    onClick(idAmbito);
  };
  const selProgetto = path => {
    onSelProgetto(path);
  };
  const stylelist = [_SideMenuAmbitoModule.default.sidemenuambito_list, selezionato === idAmbito ? _SideMenuAmbitoModule.default.sidemenuambito_listopen : _SideMenuAmbitoModule.default.sidemenuambito_listclose];
  console.log(src);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _SideMenuAmbitoModule.default.sidemenuambito_content
  }, /*#__PURE__*/_react.default.createElement(_SideMenuBottone.default, {
    onoff: onoff,
    label: label,
    src: src,
    className: _SideMenuAmbitoModule.default.sidemenuambito_label,
    onClick: selAmbitoEvent
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: stylelist.join(" "),
    style: {
      height: list.length * 50 + "px"
    }
  }, selezionato === idAmbito && list && list.map(item => {
    return /*#__PURE__*/_react.default.createElement(_SideMenuBottone.default, {
      onoff: onoff,
      label: item.Moduli_Nome,
      src: item.Moduli_Icona,
      onClick: selProgetto,
      path: item.Moduli_IndirizzoModulo
    });
  })));
};
var _default = SideMenuAmbito;
exports.default = _default;