import React, { useEffect } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";

const Input = ({ value, label, icon, className, id, val, onChange }) => {
  const pers = localStorage.getItem("pers");

  let effVal = "";

  const valList = val
    ? val.filter((item) => item !== undefined).filter((item) => item.id === id)
    : "";

  effVal = valList[0] ? valList[0].value : value;

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

  const onChangeInput = (evt) => {
    onChange();
    InputChange(evt);
  };
  const onBlurInput = (evt) => {
    InputBlur(evt);
  };

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
          onChange={onChangeInput}
          onBlur={onBlurInput}
          onFocus={InputFocus}
          value={InputValue}
        />
      </div>
    </div>
  );
};
export default Input;
