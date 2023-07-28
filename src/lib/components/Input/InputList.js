import React, { useEffect } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";

const InputList = (props) => {
  let effVal = "";
  try {
    if (props.list.length > 0) {
      let rr = props.list.filter(function (x) {
        return x.props.idobj === props.value;
      });
      if (rr.length > 0) {
        effVal = rr[0].props.value;
      }
    } else {
      effVal = props.value;
    }
  } catch (error) {}

  const effList = props.list ? props.list : null;

  const objLabel = props.label;
  let sTipo = "text";

  const fnvalidate = props.validate;

  const {
    value: InputValue,
    listValue,
    list,
    isValid: InputIsValid,
    isFocussed: InputIsFocussed,
    messageError: InputMessageError,
    valueChangeHandler: InputChange,
    inputBlurHandler: InputBlur,
    inputFocusHandler: InputFocus,
    setValue: setInputValue,
    setValidate: setInputValidate,
    optionList,
  } = useInput();

  let icon = props.icons;
  if (icon === null) {
    icon = "";
  }

  const classFocus = InputIsFocussed ? classes["input_focused"] : "";
  const classContent = [
    classes.input,
    classes["input_" + pers],
    classes["cont_" + props.type],
  ];
  const classLabel = [classes.input_label, classFocus, props.className];
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
  sTipo = "list";

  useEffect(() => {
    setInputValue(effVal);
    setInputValidate(fnvalidate);
    optionList(effList);
  }, [effVal, fnvalidate, effList]);

  return (
    <div id={"cont_" + props.id} className={classContent.join(" ")}>
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
          id={props.id}
          type={props.type}
          tipo={sTipo}
          onChange={InputChange}
          onBlur={InputBlur}
          onFocus={InputFocus}
          value={InputValue}
          list_value={effList && listValue}
          list={effList && "list_" + props.id}
        />
      </div>
      <datalist id={"list_" + props.id}>{list}</datalist>
    </div>
  );
};
export default InputList;
