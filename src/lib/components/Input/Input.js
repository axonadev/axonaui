import React, { useEffect } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";
import { formatDate } from "axonalib";
import Checklist from "./Checklist";

const Input = (props) => {
  const pers = localStorage.getItem("pers");

  let effVal = "";
  if (props.type === "date") {
    effVal = formatDate(props.value);
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
    checkItemChange,
  } = useInput();

  let icon = props.icons;
  if (icon === null) {
    icon = "";
  }

  const classFocus = InputIsFocussed ? classes["input_focused"] : "";
  const classContent = [
    classes.input,
    classes["input_" + pers],
    classes["cont_" + props.type],
  ];
  const classLabel = [classes.input_label, classFocus, props.className];
  const classDivInput = [
    classes.input_input,
    classFocus,
    classes["validate_" + InputIsValid],
  ];
  const classDivCheckList = [
    classes.input_checklist,
    classFocus,
    classes["validate_" + InputIsValid],
  ];

  if (props.list) {
    sTipo = "list";
  }
  if (props.type === "checkbox") {
    sTipo = "cbox";
  }

  useEffect(() => {
    setInputValue(effVal);
    setInputValidate(fnvalidate);
    optionList(effList);
  }, [effVal, fnvalidate, effList]);

  return (
    <div className={classContent.join(" ")}>
      <div className={classLabel.join(" ")}>
        <label>
          {objLabel}
          {!InputIsValid && (
            <span className={classes.errorText}>{InputMessageError}</span>
          )}
        </label>
      </div>
      {props.type != "checklist" && (
        <div className={classDivInput.join(" ")}>
          <input
            id={props.id}
            type={props.type}
            tipo={sTipo}
            onChange={InputChange}
            onBlur={InputBlur}
            onFocus={InputFocus}
            value={InputValue}
            list_value={effList && listValue}
            list={effList && "list_" + props.id}
          />
        </div>
      )}
      {props.type === "checklist" && (
        <div className={classDivCheckList.join(" ")}>
          <Checklist list={effList} id={props.id} pidobj={props.pidobj} />
        </div>
      )}
      {effList && <datalist id={"list_" + props.id}>{list}</datalist>}
    </div>
  );
};
export default Input;
