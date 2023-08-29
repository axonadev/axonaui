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
  const [contaCaratteri, setContaCaratteri] = useState(0);
  const [avantiCaratteri, setAvantiCaratteri] = useState(1);

  const valueChangeHandler = (evt) => {
    localStorage.setItem("axn_form_change", "1");

    console.debug(evt.target.value, "terged changed");

    setEnteredValue(evt.target.value);
    setContaCaratteri((prev) => {
      if (prev < evt.target.value.length) {
        setAvantiCaratteri((nprev) => {
          return nprev + 1;
        });
      }

      return evt.target.value.length;
    });

    setIsChanged(true);
  };
  const checkItemChange = (evt) => {
    const valn = !evt.target.checked;
    setEnteredValue(valn);
  };
  const inputBlurHandler = (evt) => {
    setIsTouched(true);
    setIsFocussed(false);

    let rvalidate = { validate: true, message: "" };
    setIsValid(rvalidate.validate);
    setMessageError(rvalidate.message);
    if (validate) {
      try {
        validate.map((item) => {
          if (item.type === "obb") {
            if (enteredValue.trim() === "") {
              setIsValid(false);
              setMessageError(
                item.message ? item.message : "Campo obbligatorio"
              );
            }
          } else if (item.type === "maxlenght") {
            if (enteredValue.trim().length > item.value) {
              setIsValid(false);
              setMessageError(
                item.message
                  ? item.message
                  : "Superato il massimo dei caratteri consentiti (" +
                      item.value +
                      ")"
              );
            }
          }
        });
      } catch (error) {}
    }
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
    contaCaratteri,
    avantiCaratteri,
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
