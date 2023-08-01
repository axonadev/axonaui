import React, { useEffect } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";
import Checklist from "./Checklist";

const InputCheckBox = ({
  value,
  label,
  icon,
  className,
  id,
  type,
  pidobj,
  list,
  val,
}) => {
  const pers = localStorage.getItem("pers");

  let effVal = "";

  const valList = val
    ? val.filter((item) => item !== undefined).filter((item) => item.id === id)
    : "";

  effVal = valList[0] ? valList[0].value : value;

  const objLabel = label;
  let sTipo = "text";

  const effList = list ? list : null;

  const {
    value: InputValue,
    isValid: InputIsValid,
    isFocussed: InputIsFocussed,
    messageError: InputMessageError,
    valueChangeHandler: InputChange,
    inputBlurHandler: InputBlur,
    inputFocusHandler: InputFocus,
    setValue: setInputValue,
    optionList,
  } = useInput();

  const classFocus = InputIsFocussed ? classes["input_focused"] : "";
  const classContent = [
    classes.input,
    classes["input_" + pers],
    classes["cont_" + type],
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
      {type != "checklist" && (
        <div className={classDivInput.join(" ")}>
          <input
            id={id}
            type="checkbox"
            tipo={sTipo}
            onChange={InputChange}
            onBlur={InputBlur}
            onFocus={InputFocus}
            checked={InputValue}
          />
        </div>
      )}
      {type === "checklist" && (
        <div className={classDivCheckList.join(" ")}>
          <Checklist list={effList} id={id} pidobj={pidobj} />
        </div>
      )}
    </div>
  );
};
export default InputCheckBox;
