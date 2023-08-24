import React, { useEffect } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";
import Img from "../Img/Img";

const Input = ({
  value,
  label,
  preIcon,
  icon,
  className,
  id,
  val,
  onChange,
  onChangeValue,
  onPreIconClick,
  onIconClick,
}) => {
  const pers = localStorage.getItem("pers");

  let effVal = "";

  const valList = val
    ? val.filter((item) => item !== undefined).filter((item) => item.id === id)
    : "";

  effVal = valList[0] ? valList[0].value : value;

  const valincache = JSON.parse(localStorage.getItem("axn_recordselezionato"));

  try {
    if (valincache[0][id] !== undefined) {
      effVal = valincache[0][id];
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
    icon && preIcon
      ? classes.input_preposticon_grid
      : preIcon
      ? classes.input_preicon_grid
      : classes.input_posticon_grid,
  ];

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
  const onBlurInput = (evt) => {
    InputBlur(evt);
  };

  const onIconClickHandler = (evt) => {
    try {
      onIconClick(evt);
    } catch (error) {}
  };
  const onPreIconClickHandler = (evt) => {
    try {
      onPreIconClick(evt);
    } catch (error) {}
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
        {preIcon && (
          <div
            className={classes.input_preicon}
            onClick={onPreIconClickHandler}
          >
            <Img type={preIcon} pathImg="getlocal" />
          </div>
        )}
        <input
          id={id}
          type="text"
          tipo={sTipo}
          onChange={onChangeInput}
          onBlur={onBlurInput}
          onFocus={InputFocus}
          value={InputValue}
        />
        {icon && (
          <div className={classes.input_icon} onClick={onIconClickHandler}>
            <Img type={icon} pathImg="getlocal" />
          </div>
        )}
      </div>
    </div>
  );
};
export default Input;
