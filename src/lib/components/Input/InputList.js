import React, { useEffect, useState } from "react";
import useInput from "../../hooks/useInput";
import classes from "../style/Input.module.css";
import HelpMessage from "../HelpMessage/HelpMessage";

const InputList = ({
  url,
  nameList,
  field_id = "IDOBJ",
  field_description = ["Descrizione"],
  value,
  id,
  label,
  validate,
  className,
  type,
  onChangeValue,
  defList,
  form_id,
  numerocaratteri = 0,
  help,
  helpMessage
}) => {
  let effVal = value;

  const valincache = JSON.parse(localStorage.getItem("axn_record_" + form_id));

  try {
    if (valincache[0][id] !== undefined) {
      effVal = valincache[0][id];
    }
  } catch (error) {}

  const {
    value: InputValue,
    contaCaratteri: InputContaCaratteri,
    avantiCaratteri: InputCaratteriAvanti,
    isValid: InputIsValid,
    isFocussed: InputIsFocussed,
    messageError: InputMessageError,
    valueChangeHandler: InputChange,
    inputBlurHandler: InputBlur,
    inputFocusHandler: InputFocus,
    setValue: setInputValue,
    setValidate: setInputValidate,
  } = useInput();

  /* const [list, setList] = useState(
    defList === undefined ? [] : defList[0].data
  ); */

  const [list, setList] = useState();
  const [list_value, setListValue] = useState(effVal);

  const classFocus = InputIsFocussed ? classes["input_focused"] : "";
  const classContent = [classes.input, classes["cont_" + type]];
  const classLabel = [classes.input_label, classFocus, className];
  const classDivInput = [
    classes.input_input,
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
        onChangeValuehandler(rr[0][field_id]);
      } else {
        setListValue(0);
        onChangeValuehandler(0);
      }
    } else {
      onChangeValuehandler(0);
    }

    InputChange(evt);
  };
  const onChangeValuehandler = (lvalue) => {
    try {
      onChangeValue(id, lvalue);
    } catch (error) {}
  };
  const getValore = (lista) => {
    if (lista) {
      let rr = lista.filter(function (x) {
        return x.IDOBJ === list_value;
      });

      const valList = field_description.map((columnselect) => {
        try {
          return rr[0][columnselect];
        } catch (error) {}
      });

      setInputValue(valList ? valList.join(" ") : value);
    }
  };

  const keydownHandler = (evt) => {
    if (evt.keyCode === 46) {
      setInputValue("");
      setListValue(0);
    }
  };

  useEffect(() => {
    const goList = () => {
      try {
        console.log(defList[0].data, "aaaassss" + id);
      } catch (error) {}

      if (defList === undefined) {
      } else {
        if (defList.length > 0) {
          setList(defList[0].data);
        }
      }
    };

    goList();
  }, [defList]);

  useEffect(() => {
    if (defList) {
      try {
        getValore(defList[0].data);
      } catch (error) {}
    } else {
    }
  }, []);

  useEffect(() => {
    return () => {
      if (defList) {
        try {
          getValore(defList[0].data);
        } catch (error) {}
      } else {
        getValore(list);

        setInputValidate(validate ? validate : "");
      }
    };
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
        <HelpMessage helpMessage={helpMessage} help={help}/>
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
          onKeyDown={keydownHandler}
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
