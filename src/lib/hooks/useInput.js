import React, { useEffect, useState } from "react";
import { validateInput } from "axonalib";

const useInput = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [listValue, setListValue] = useState("");
  const [list, setList] = useState(null);
  const [isTouched, setIsTouched] = useState(false);
  const [isFocussed, setIsFocussed] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [validate, setValidate] = useState({});

  const valueChangeHandler = (evt) => {
    localStorage.setItem("axn_form_change", "1");
    setEnteredValue(evt.target.value);

    setIsChanged(true);
  };
  const checkItemChange = (evt) => {
    console.log(evt);
    const valn = !evt.target.checked;
    setEnteredValue(valn);
  };
  const inputBlurHandler = (evt) => {
    setIsTouched(true);
    setIsFocussed(false);

    let rvalidate = { validate: true, message: "" };

    if (validate) {
      if (validate.type) {
        rvalidate = validateInput(
          enteredValue,
          validate.type,
          validate.label ? validate.label : ""
        );
      }
    }
    setIsValid(rvalidate.validate);
    setMessageError(rvalidate.message);
  };

  const inputFocusHandler = (evt) => {
    setIsFocussed(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
    setIsFocussed(false);
  };

  const setValue = (value) => {
    if (value === undefined) {
    } else {
      // alert(value);
    }
    setEnteredValue(value);
  };

  /*   useEffect(() => {
    try {
      if (list.length > 0) {
        let rr = list.filter(function (x) {
          return x.props.idobj === enteredValue;
        });
        if (rr.length > 0) {
          setValue(rr[0].props.value);
        }
      } else {
      }
    } catch (error) {}
  }, [list]); */

  const optionList = (plist) => {
    /* let rr = null;

    if (plist === null || plist === undefined) {
    } else {
      try {
        if (plist.list.length > 0) {
          rr = plist.list.map((item) => {
            if (enteredValue === item[plist.id]) {
              setEnteredValue(item[plist.descr]);
              setListValue(item[plist.id]);
            }
            return (
              <option
                value={item[plist.descr]}
                key={item[plist.id]}
                idobj={item[plist.id]}
              />
            );
          });

          setList(rr);
        }
      } catch (error) {}
    } */
  };

  return {
    value: enteredValue,
    listValue,
    list,
    isValid,
    messageError,
    isTouched,
    isFocussed,
    isChanged,
    valueChangeHandler,
    inputBlurHandler,
    inputFocusHandler,
    setValue,
    setList,
    reset,
    setValidate,
    optionList,
    checkItemChange,
  };
};

export default useInput;
