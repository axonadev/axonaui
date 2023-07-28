import React, { useEffect } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";

const Input = ({ value, label, icon, className, id }) => {
  const pers = localStorage.getItem("pers");

  let effVal = "";

  effVal = value;

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

  const classFocus = InputIsFocussed ? classes["input_focused"] : "";
  const classContent = [
    classes.input,
    classes["input_" + pers],
    classes["cont_text"],
  ];
  const classLabel = [classes.input_label, classFocus, className];
  const classDivInput = [
    classes.input_input,
    classFocus,
    classes["validate_" + InputIsValid],
  ];

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
          type="text"
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
export default Input;
