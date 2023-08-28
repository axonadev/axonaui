import React, { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";

const InputCheckBox = ({
  value,
  label,
  className,
  id,
  type,
  list,
  onChange,
  form_id,
  onChangeValue,
}) => {
  const pers = localStorage.getItem("pers");

  let effVal = "";

  const valincache = JSON.parse(localStorage.getItem("axn_record_" + form_id));

  try {
    if (valincache[0][id] !== undefined) {
      effVal = valincache[0][id]
        ? valincache[0][id]
        : valincache[0][id] === "True"
        ? true
        : valincache[0][id] === "true"
        ? true
        : valincache[0][id] === true
        ? true
        : false;
    }
  } catch (error) {
    effVal =
      value === "True"
        ? true
        : value === "true"
        ? true
        : value === true
        ? true
        : false;
  }

  const [isChecked, setIsChecked] = useState(effVal);

  const objLabel = label;
  let sTipo = "text";

  const effList = list ? list : null;

  const {
    isValid: InputIsValid,
    isFocussed: InputIsFocussed,
    messageError: InputMessageError,
    inputBlurHandler: InputBlur,
    inputFocusHandler: InputFocus,
    setValue: setInputValue,
    optionList,
  } = useInput();

  const InputChangeHandler = (evt) => {
    try {
      onChange(evt);
    } catch (error) {}

    setIsChecked((prev) => {
      try {
        onChangeValue(id, !prev);
      } catch (error) {}

      return !prev;
    });
  };

  const classFocus = InputIsFocussed ? classes["input_focused"] : "";
  const classContent = [
    classes.input,
    classes["input_" + pers],
    classes["cont_checkbox"],
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

  sTipo = "cbox";

  useEffect(() => {
    setInputValue(effVal);
    optionList(effList);
  }, [effVal, effList]);

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
          type="checkbox"
          tipo={sTipo}
          onChange={InputChangeHandler}
          onBlur={InputBlur}
          onFocus={InputFocus}
          checked={isChecked}
        />
      </div>
    </div>
  );
};
export default InputCheckBox;
