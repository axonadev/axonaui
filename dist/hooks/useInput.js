"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _axonalib = require("axonalib");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useInput = () => {
  const [enteredValue, setEnteredValue] = (0, _react.useState)("");
  const [listValue, setListValue] = (0, _react.useState)("");
  const [list, setList] = (0, _react.useState)(null);
  const [isTouched, setIsTouched] = (0, _react.useState)(false);
  const [isFocussed, setIsFocussed] = (0, _react.useState)(false);
  const [isValid, setIsValid] = (0, _react.useState)(true);
  const [messageError, setMessageError] = (0, _react.useState)("");
  const [validate, setValidate] = (0, _react.useState)({});
  const valueChangeHandler = evt => {
    setEnteredValue(evt.target.value);
    if (evt.target.attributes.tipo.value === "list") {
      if (list === null || list === undefined) {} else {
        try {
          if (list.length > 0) {
            let rr = list.filter(function (x) {
              return x.props.value === evt.target.value;
            });
            if (rr.length > 0) {
              setListValue(rr[0].props.idobj);
            }
          }
        } catch (error) {}
      }
    }
  };
  const checkItemChange = evt => {
    console.log(evt);
    const valn = !evt.target.checked;
    setEnteredValue(valn);
  };
  const inputBlurHandler = evt => {
    setIsTouched(true);
    setIsFocussed(false);
    let rvalidate = {
      validate: true,
      message: ""
    };
    if (validate) {
      if (validate.type) {
        rvalidate = (0, _axonalib.validateInput)(enteredValue, validate.type, validate.label ? validate.label : "");
      }
    }
    setIsValid(rvalidate.validate);
    setMessageError(rvalidate.message);
  };
  const inputFocusHandler = evt => {
    setIsFocussed(true);
  };
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
    setIsFocussed(false);
  };
  const setValue = value => {
    setEnteredValue(value);
  };
  (0, _react.useEffect)(() => {
    try {
      if (list.length > 0) {
        let rr = list.filter(function (x) {
          return x.props.idobj === enteredValue;
        });
        if (rr.length > 0) {
          setValue(rr[0].props.value);
        }
      } else {}
    } catch (error) {}
  }, [list]);
  const optionList = plist => {
    let rr = null;
    if (plist === null || plist === undefined) {} else {
      try {
        if (plist.list.length > 0) {
          rr = plist.list.map(item => {
            if (enteredValue === item[plist.id]) {
              setEnteredValue(item[plist.descr]);
              setListValue(item[plist.id]);
            }
            return /*#__PURE__*/_react.default.createElement("option", {
              value: item[plist.descr],
              key: item[plist.id],
              idobj: item[plist.id]
            });
          });
          setList(rr);
        }
      } catch (error) {}
    }
  };
  return {
    value: enteredValue,
    listValue,
    list,
    isValid,
    messageError,
    isTouched,
    isFocussed,
    valueChangeHandler,
    inputBlurHandler,
    inputFocusHandler,
    setValue,
    setList,
    reset,
    setValidate,
    optionList,
    checkItemChange
  };
};
var _default = useInput;
exports.default = _default;