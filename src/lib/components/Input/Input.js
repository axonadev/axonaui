import React, { useEffect, useState, forwardRef } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";
import ImgFont from "../Img/ImgFont";
import { formatDate } from "axonalib";

const Input = forwardRef(
  (
    {
      value = "",
      label = "",
      preIcon = "",
      icon = "",
      className = "",
      id = "",
      onChange,
      onChangeValue,
      onPreIconClick,
      onIconClick,
      type = "text",
      min,
      max,
      decimali,
      form_id = "",
      validate,
      help,
      helpMessage,
      disabled = false,
      required = false,
      placeholder,
      align = "left",
    },
    ref
  ) => {
    const pers = localStorage.getItem("pers");

    // let effVal = "";
    const [effVal, setEffVal] = useState("");

    const valincache = JSON.parse(
      localStorage.getItem("axn_record_" + form_id)
    );

    useEffect(() => {
      try {
        if (valincache[0][id] !== undefined) {
          if (type === "date") {
            setEffVal(formatDate(valincache[0][id]));
          } else {
            setEffVal(valincache[0][id]);
          }
        }
      } catch (error) {}

      if (decimali !== undefined) {
        setEffVal(parseFloat(effVal).toFixed(parseInt(decimali)));
      }
    }, []);

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
      classes["input_align_" + align],
      classes["cont_text"],
      classes[className],
      className,
    ];
    const classLabel = [classes.input_label, classFocus, className];
    const classDivInput = [
      classes.input_input,
      classFocus,
      classes["validate_" + InputIsValid],
      classes[className],
      className,
      icon ? classes.input_posticon : "",
      preIcon ? classes.input_preicon : "",
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

      if (value) {
        if (type === "date") {
          setEffVal(formatDate(value));
        } else {
          setEffVal(value);
        }
        try {
          onChangeValue(id, value);
        } catch (error) {}
      }
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
          {help && (
            <div className={classes.helpmessage_content}>
              <span className={classes.helpmessage}>{helpMessage}</span>
            </div>
          )}
        </div>
        <div className={classDivInput.join(" ")}>
          {preIcon && (
            <div
              className={classes.input_preicon}
              onClick={onPreIconClickHandler}
            >
              <ImgFont icon={icon} size='medium' />
            </div>
          )}
          {type === "textarea" && (
            <textarea
              id={id}
              type={type}
              tipo={sTipo}
              onChange={onChangeInput}
              onBlur={onBlurInput}
              onFocus={InputFocus}
              value={InputValue}
              disabled={disabled}
              ref={ref}
              required={required}
              placeholder={placeholder}
            />
          )}

          {type !== "textarea" && (
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
              disabled={disabled}
              required={required}
              ref={ref}
              placeholder={placeholder}
            />
          )}
          {icon && (
            <div className={classes.input_icon}>
              <ImgFont icon={icon} onClick={onIconClickHandler} size='medium' />
            </div>
          )}
        </div>
      </div>
    );
  }
);
export default Input;
