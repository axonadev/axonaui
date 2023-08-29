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
  onChange,
  onChangeValue,
  onPreIconClick,
  onIconClick,
  type = "text",
  min,
  max,
  decimali,
  form_id,
  validate,
}) => {
  const pers = localStorage.getItem("pers");

  let effVal = "";
  console.log(form_id, id + " valore citta input");

  const valincache = JSON.parse(localStorage.getItem("axn_record_" + form_id));

  try {
    if (valincache[0][id] !== undefined) {
      effVal = valincache[0][id];
    }
  } catch (error) {}

  if (decimali !== undefined) {
    effVal = parseFloat(effVal).toFixed(parseInt(decimali));
  }

  if (value) {
    effVal = value;
    onChangeValue(id, value);
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
    setValidate: setInputValidate,
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
    if (decimali !== undefined && type === "number") {
      setInputValue(parseFloat(evt.target.value).toFixed(parseInt(decimali)));
    }
    if (max !== undefined && type === "number") {
      if (evt.target.value > parseFloat(max)) {
        setInputValue(parseFloat(max).toFixed(parseInt(decimali)));
      }
    }
    if (min !== undefined && type === "number") {
      if (evt.target.value < parseFloat(min)) {
        setInputValue(parseFloat(min).toFixed(parseInt(decimali)));
      }
    }

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
  useEffect(() => {
    setInputValidate(validate);
  }, []);

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
          type={type}
          tipo={sTipo}
          onChange={onChangeInput}
          onBlur={onBlurInput}
          onFocus={InputFocus}
          value={InputValue}
          min={min}
          max={max}
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
