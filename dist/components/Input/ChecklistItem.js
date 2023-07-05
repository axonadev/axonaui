"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ChecklistItem = props => {
  const listitem = props.listitem;
  const [checked, setChecket] = (0, _react.useState)(listitem[props.valCheck]);
  const checkItemChange = evt => {
    setChecket(prop => {
      props.changeRowFetch(evt.target.attributes.idobj.value, !prop);
      return !prop;
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    key: listitem[props.valId] + Math.random
  }, /*#__PURE__*/_react.default.createElement("input", {
    key: listitem[props.valId] + Math.random,
    id: props.db + "_" + listitem[props.valId],
    idobj: listitem[props.valId],
    pidobj: props.pidobj,
    type: "checkbox",
    tipo: "cboxi",
    onClick: checkItemChange,
    checked: checked,
    db: props.db
  }), /*#__PURE__*/_react.default.createElement("label", null, listitem[props.valDes]));
};
var _default = ChecklistItem;
exports.default = _default;