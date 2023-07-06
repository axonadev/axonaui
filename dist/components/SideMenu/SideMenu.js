"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _SideMenuModule = _interopRequireDefault(require("../style/SideMenu.module.css"));
var _SideMenuBottone = _interopRequireDefault(require("./SideMenuBottone"));
var _SideMenuAmbito = _interopRequireDefault(require("./SideMenuAmbito"));
var _SideMenuSwitch = _interopRequireDefault(require("./SideMenuSwitch"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const SideMenu = () => {
  const [onoff, setOnoff] = (0, _react.useState)(true);
  const [idAmbito, setIdAmbito] = (0, _react.useState)(0);
  const listmoduli = JSON.parse(localStorage.getItem("axn_v_moduli"));
  const datatextanagrafica = listmoduli.filter(item => {
    return item.Ambito_Nome === "Anagrafica";
  });
  const datatextgestione = listmoduli.filter(item => {
    return item.Ambito_Nome === "Gestione";
  });
  const datatextordini = listmoduli.filter(item => {
    return item.Ambito_Nome === "Ordini";
  });
  const datatextutilita = listmoduli.filter(item => {
    return item.Ambito_Nome === "Utilita";
  });
  const datatextservizi = listmoduli.filter(item => {
    return item.Ambito_Nome === "Servizi";
  });
  const selAmbito = id => {
    setIdAmbito(precid => {
      return precid === id ? 0 : id;
    });
  };
  const stylecontent = [_SideMenuModule.default.sidemenu_content, onoff ? _SideMenuModule.default.sidemenu_open : _SideMenuModule.default.sidemenu_close];
  const switchEvent = () => {
    setOnoff(prevonoff => {
      return !prevonoff;
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: stylecontent.join(" ")
  }, /*#__PURE__*/_react.default.createElement(_SideMenuSwitch.default, {
    onoff: onoff,
    onClick: switchEvent
  }), /*#__PURE__*/_react.default.createElement(_SideMenuBottone.default, {
    onoff: onoff,
    label: "Home",
    src: "logo192.png"
  }), datatextanagrafica.length > 0 && /*#__PURE__*/_react.default.createElement(_SideMenuAmbito.default, {
    idAmbito: 1,
    onoff: onoff,
    label: "Anagrafica",
    src: "logo192.png",
    selezionato: idAmbito,
    list: datatextanagrafica,
    onClick: selAmbito
  }), datatextgestione.length > 0 && /*#__PURE__*/_react.default.createElement(_SideMenuAmbito.default, {
    idAmbito: 2,
    onoff: onoff,
    label: "Gestione",
    selezionato: idAmbito,
    list: datatextgestione,
    onClick: selAmbito
  }), datatextordini.length > 0 && /*#__PURE__*/_react.default.createElement(_SideMenuAmbito.default, {
    idAmbito: 3,
    onoff: onoff,
    label: "Ordini",
    selezionato: idAmbito,
    list: datatextordini,
    onClick: selAmbito
  }), datatextutilita.length > 0 && /*#__PURE__*/_react.default.createElement(_SideMenuAmbito.default, {
    idAmbito: 4,
    onoff: onoff,
    label: "utilita",
    selezionato: idAmbito,
    list: datatextutilita,
    onClick: selAmbito
  }), datatextservizi.length > 0 && /*#__PURE__*/_react.default.createElement(_SideMenuAmbito.default, {
    idAmbito: 5,
    onoff: onoff,
    label: "Servizi",
    selezionato: idAmbito,
    list: datatextservizi,
    onClick: selAmbito
  }));
};
var _default = SideMenu;
exports.default = _default;