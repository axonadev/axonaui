"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _useInput = _interopRequireDefault(require("../../hooks/useInput"));
var _InputModule = _interopRequireDefault(require("../style/Input.module.css"));
var _axonalib = require("axonalib");
var _Checklist = _interopRequireDefault(require("./Checklist"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Input = props => {
  const pers = localStorage.getItem("pers");
  let effVal = "";
  if (props.type === "date") {
    effVal = (0, _axonalib.formatDate)(props.value);
  } else if (props.list) {
    try {
      if (props.list.length > 0) {
        let rr = props.list.filter(function (x) {
          return x.props.idobj === props.value;
        });
        if (rr.length > 0) {
          effVal = rr[0].props.value;
        }
      } else {
        effVal = props.value;
      }
    } catch (error) {}
  } else {
    effVal = props.value;
  }
  const effList = props.list ? props.list : null;
  const objLabel = props.label;
  let sTipo = "text";
  const fnvalidate = props.validate;
  const {
    value: InputValue,
    listValue,
    list,
    isValid: InputIsValid,
    isTouched: InputIsTouched,
    isFocussed: InputIsFocussed,
    messageError: InputMessageError,
    valueChangeHandler: InputChange,
    inputBlurHandler: InputBlur,
    inputFocusHandler: InputFocus,
    reset: InputReset,
    setValue: setInputValue,
    setValidate: setInputValidate,
    optionList,
    checkItemChange
  } = (0, _useInput.default)();
  let icon = props.icons;
  if (icon === null) {
    icon = "";
  }
  const classFocus = InputIsFocussed ? _InputModule.default["input_focused"] : "";
  const classContent = [_InputModule.default.input, _InputModule.default["input_" + pers], _InputModule.default["cont_" + props.type]];
  const classLabel = [_InputModule.default.input_label, classFocus, props.className];
  const classDivInput = [_InputModule.default.input_input, classFocus, _InputModule.default["validate_" + InputIsValid]];
  const classDivCheckList = [_InputModule.default.input_checklist, classFocus, _InputModule.default["validate_" + InputIsValid]];
  if (props.list) {
    sTipo = "list";
  }
  if (props.type === "checkbox") {
    sTipo = "cbox";
  }
  (0, _react.useEffect)(() => {
    setInputValue(effVal);
    setInputValidate(fnvalidate);
    optionList(effList);
  }, [effVal, fnvalidate, effList]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: classContent.join(" ")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: classLabel.join(" ")
  }, /*#__PURE__*/_react.default.createElement("label", null, objLabel, !InputIsValid && /*#__PURE__*/_react.default.createElement("span", {
    className: _InputModule.default.errorText
  }, InputMessageError))), props.type != "checklist" && /*#__PURE__*/_react.default.createElement("div", {
    className: classDivInput.join(" ")
  }, /*#__PURE__*/_react.default.createElement("input", {
    id: props.id,
    type: props.type,
    tipo: sTipo,
    onChange: InputChange,
    onBlur: InputBlur,
    onFocus: InputFocus,
    value: InputValue,
    list_value: effList && listValue,
    list: effList && "list_" + props.id
  })), props.type === "checklist" && /*#__PURE__*/_react.default.createElement("div", {
    className: classDivCheckList.join(" ")
  }, /*#__PURE__*/_react.default.createElement(_Checklist.default, {
    list: effList,
    id: props.id,
    pidobj: props.pidobj
  })), effList && /*#__PURE__*/_react.default.createElement("datalist", {
    id: "list_" + props.id
  }, list));
};
var _default = Input;
exports.default = _default;