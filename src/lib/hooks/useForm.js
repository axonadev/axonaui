import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { formatDate } from "axonalib";

const useForm = (id, url, nameView) => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [datarow, setDataRow] = useState(null);
  const [formValue, setFormValue] = useState();
  const [isChanged, setIsChanged] = useState(false);
  const [form_Id, setFormId] = useState(id);
  const [form_Url, setFormUrl] = useState(url);
  const [form_nameView, setFormNameView] = useState(nameView);

  const onChangeSelected = useCallback(async (id) => {
    setIsLoading(true);

    try {
      const response = await fetch(form_Url + id, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      setDataRow(data.Itemset[form_nameView]);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  const onReset = useCallback(async () => {
    try {
      const response = await fetch(form_Url + "-1", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      setDataRow(data.Itemset[form_nameView]);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
  });

  const onChangeForm = (id, value) => {
    if (datarow) {
      let jsonMod = datarow;
      try {
        jsonMod[0][id] = value;
        setDataRow(jsonMod);
        localStorage.setItem("axn_record_" + form_Id, JSON.stringify(jsonMod));
      } catch (error) {}
    }
  };

  useEffect(() => {
    const writeform = () => {
      if (datarow) {
        try {
          localStorage.removeItem("axn_record_" + form_Id);
          const idfield = Object.keys(datarow[0]);

          const arr = idfield.map((item) => {
            try {
              if (document.getElementById(item).type === "date") {
                return { id: item, value: formatDate(datarow[0][item]) };
              } else {
                return { id: item, value: datarow[0][item] };
              }
            } catch (error) {
              return { id: item, value: datarow[0][item] };
            }
          });

          setFormValue(arr);
          localStorage.setItem(
            "axn_record_" + form_Id,
            JSON.stringify(datarow)
          );
        } catch (error) {}
      }
    };
    writeform();
  }, [datarow]);

  return {
    datarow,
    isloading,
    error,
    onChangeSelected,
    onReset,
    onChangeForm,
    formValue,
    isChanged,
    setIsChanged,
    setFormId,
  };
};
export default useForm;
