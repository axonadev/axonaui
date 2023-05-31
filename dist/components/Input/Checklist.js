"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _ChecklistItem = _interopRequireDefault(require("./ChecklistItem"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Checklist = props => {
  const [strRowFetch, setstrRowFetch] = (0, _react.useState)("");
  const effList = props.list;
  const changeRowFetchHandler = (id, valrow) => {
    let comms = "";
    let commsapp = "";
    comms = strRowFetch;
    effList.list.map(item => {
      if (Number(id) === item[effList.id]) {
        commsapp = comms.substring(comms.indexOf('"' + effList.col + '":"' + item[effList.id] + '",'));
        comms = comms.substring(0, comms.indexOf('"' + effList.col + '":"' + item[effList.id] + '",'));
        commsapp = commsapp.substring(commsapp.indexOf("}") + 1);
        comms = comms + '"' + effList.col + '":"' + id + '","valid":"' + valrow + '"}' + commsapp;
      } else {}
    });
    if (comms[0] === ",") {
      comms = comms.substring(1);
    }
    setstrRowFetch(comms);
    console.log(comms);
  };
  (0, _react.useEffect)(() => {
    let comms = "";
    effList.list.map(item => {
      comms = comms + ',{"pidobj":"' + effList.pidobj + '","' + effList.col + '":"' + item[effList.id] + '","valid":"' + (item[effList.value] === 1 ? "true" : "false") + '"}';
    });
    if (comms[0] === ",") {
      comms = comms.substring(1);
    }
    setstrRowFetch(comms);
  }, [effList.list]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, effList.list.map(item => {
    return /*#__PURE__*/_react.default.createElement(_ChecklistItem.default, {
      key: effList.descr + "_" + item[effList.id],
      id: effList.descr + "_" + item[effList.id],
      listitem: item,
      valId: effList.id,
      valDes: effList.descr,
      valCheck: effList.value,
      db: props.id,
      pidobj: props.pidobj,
      changeRowFetch: changeRowFetchHandler
    });
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    value: strRowFetch,
    id: effList.col,
    tipo: "listbox",
    pidobj: props.pidobj,
    db: props.id
  }));
};
var _default = Checklist;
exports.default = _default;