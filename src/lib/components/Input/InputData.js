import React, { useEffect } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";
import { formatDate } from "axonalib";

const InputData = ({ value, label, icons, className, id, val }) => {
  const pers = localStorage.getItem("pers");

  let effVal = "";

  const valList = val
    ? val.filter((item) => item !== undefined).filter((item) => item.id === id)
    : "";

  effVal = valList[0] ? valList[0].value : value;

  if (value === undefined) {
  } else {
    effVal = formatDate(effVal);
  }

  const valincache = JSON.parse(localStorage.getItem("axn_recordselezionato"));

  try {
    if (valincache[0][id] !== undefined) {
      effVal = formatDate(valincache[0][id]);
    }
  } catch (error) {}

  const objLabel = label;
  let sTipo = "text";

  const {
    value: InputValue,
    isValid: InputIsValid,
    isFocussed: InputIsFocussed,
    messageError: InputMessageError,
    valueChangeHandler: InputChange,
    inputBlurHandler: InputBlur,
    inputFocusHandler: InputFocus,
    setValue: setInputValue,
  } = useInput();

  let icon = icons;
  if (icon === null) {
    icon = "";
  }

  const classFocus = InputIsFocussed ? classes["input_focused"] : "";
  const classContent = [
    classes.input,
    classes["input_" + pers],
    classes["cont_date"],
  ];
  const classLabel = [classes.input_label, classFocus, className];
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

  /*  useEffect(() => {
    if (effVal === "") {
    } else {
      setInputValue(effVal);
    }
  }, [effVal]); */

  useEffect(() => {
    setInputValue(effVal);
  }, [effVal]);

  return (
    <div id={"cont_" + id} className={classContent.join(" ")}>
      <div className={classLabel.join(" ")}>
        <label>
          {objLabel}
          {!InputIsValid && (
            <span className={classes.errorText}>{InputMessageError}</span>
          )}
        </label>
      </div>
      <div className={classDivInput.join(" ")}>
        <input
          id={id}
          type="date"
          tipo={sTipo}
          onChange={InputChange}
          onBlur={InputBlur}
          onFocus={InputFocus}
          value={InputValue}
        />
      </div>
    </div>
  );
};
export default InputData;
