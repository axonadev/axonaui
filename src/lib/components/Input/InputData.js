import React, { useEffect } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";
import { formatDate } from "axonalib";

const InputData = ({
  value,
  label,
  icons,
  className,
  id,
  form_id,
  onChange,
  onChangeValue,
}) => {
  const pers = localStorage.getItem("pers");

  let effVal = "";

  effVal = value;

  if (value === undefined) {
  } else {
    effVal = formatDate(effVal);
  }

  const valincache = JSON.parse(localStorage.getItem("axn_record_" + form_id));

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
    classes[className],
  ];
  const classLabel = [classes.input_label, classFocus];
  const classDivInput = [
    classes.input_input,
    classes.inputDateWidth,
    classFocus,
    classes["validate_" + InputIsValid],
  ];
  // const classDivCheckList = [
  //   classes.input_checklist,
  //   classFocus,
  //   classes["validate_" + InputIsValid],
  // ];

  /*  useEffect(() => {
    if (effVal === "") {
    } else {
      setInputValue(effVal);
    }
  }, [effVal]); */

  useEffect(() => {
    setInputValue(effVal);
  }, [effVal]);

  const onChangeInput = (evt) => {
    try {
      onChange(evt);
    } catch (error) {}

    onChangeValuehandler(evt);
    InputChange(evt);
  };
  const onChangeValuehandler = (evt) => {
    try {
      onChangeValue(id, evt.target.value);
    } catch (error) {}
  };

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
          type='date'
          tipo={sTipo}
          onChange={onChangeInput}
          onBlur={InputBlur}
          onFocus={InputFocus}
          value={InputValue}
        />
      </div>
    </div>
  );
};
export default InputData;
