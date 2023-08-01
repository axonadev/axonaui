import React, { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";

const InputList = ({
  url,
  nameList,
  field_id,
  field_description,
  value,
  id,
  label,
  validate,
  className,
  type,
  val,
}) => {
  const valList = val
    ? val.filter((item) => item !== undefined).filter((item) => item.id === id)
    : "";

  const effVal = valList[0] ? valList[0].value : value;

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

  const [list, setList] = useState(null);
  const [list_value, setListValue] = useState(0);

  const classFocus = InputIsFocussed ? classes["input_focused"] : "";
  const classContent = [classes.input, classes["cont_" + type]];
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

  const inputChangeHandler = (evt) => {
    if (list) {
      let rr = list.filter(function (x) {
        const val = field_description.map((columnselect) => {
          return x[columnselect];
        });

        return val.join(" ") === evt.target.value;
      });

      if (rr.length > 0) {
        setListValue(rr[0][field_id]);
      } else {
        setListValue(0);
      }
    }
    InputChange(evt);
  };

  const getValore = (lista) => {
    if (lista) {
      let rr = lista.filter(function (x) {
        return x.IDOBJ === effVal;
      });
      const valList = field_description.map((columnselect) => {
        return rr[0][columnselect];
      });

      setInputValue(valList ? valList.join(" ") : value);
    }
  };

  useEffect(() => {
    const loadList = () => {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setList(data.Itemset[nameList]);
          getValore(data.Itemset[nameList]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    loadList();
  }, []);

  useEffect(() => {
    getValore(list);

    setInputValidate(validate ? validate : "");
  }, [value, validate]);

  return (
    <div id={"cont_" + id} className={classContent.join(" ")}>
      <div className={classLabel.join(" ")}>
        <label>
          {label && label}
          {!InputIsValid && (
            <span className={classes.errorText}>{InputMessageError}</span>
          )}
        </label>
      </div>

      <div className={classDivInput.join(" ")}>
        <input
          id={id}
          type="text"
          tipo="list"
          onChange={inputChangeHandler}
          onBlur={InputBlur}
          onFocus={InputFocus}
          value={InputValue}
          list_value={list_value}
          list={"list_" + id}
        />
      </div>
      <datalist id={"list_" + id}>
        {list &&
          list.map((item) => {
            const valList = field_description.map((columnselect) => {
              return item[columnselect];
            });

            return (
              <option value={valList.join(" ")} idobj={item[field_id]}></option>
            );
          })}
      </datalist>
    </div>
  );
};
export default InputList;
