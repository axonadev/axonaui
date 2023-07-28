import React, { useEffect } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";
import { formatDate } from "axonalib";

const InputData = ({ value, label, icons, className, id }) => {
  const pers = localStorage.getItem("pers");

  let effVal = "";
  try {
    console.log(document.getElementById(id).value, "inputdata");
  } catch (error) {}

  if (value === undefined) {
  } else {
    effVal = formatDate(value);
  }

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
