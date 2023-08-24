import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { formatDate } from "axonalib";

const useForm = () => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [datarow, setDataRow] = useState(null);
  const [formValue, setFormValue] = useState();
  const [isChanged, setIsChanged] = useState(false);

  const onChangeSelected = useCallback(async (url, nameView) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      setDataRow(data.Itemset[nameView]);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  const onReset = () => {
    if (datarow) {
      try {
        const idfield = Object.keys(datarow[0]);
        idfield.map((item) => {
          try {
            document.getElementById(item).value = "";
          } catch (error) {}
        });
      } catch (error) {}
    }
  };

  const onChangeForm = (id, value) => {
    if (datarow) {
      let jsonMod = datarow;
      try {
        jsonMod[0][id] = value;
        setDataRow(jsonMod);
        localStorage.setItem("axn_recordselezionato", JSON.stringify(jsonMod));
      } catch (error) {}
    }
  };

  useEffect(() => {
    const writeform = () => {
      if (datarow) {
        /* try {
          const idfield = Object.keys(datarow[0]);
          idfield.map((item) => {
            try {
              if (document.getElementById(item).type === "date") {
                document.getElementById(item).value = formatDate(
                  datarow[0][item]
                );
              } else if (document.getElementById(item).type === "checkbox") {
                document.getElementById(item).checked = datarow[0][item];
              } else if (
                document.getElementById(item).getAttribute("tipo") === "list"
              ) {
                inputRef[0].current.value = "aaaa";
                let rr = document
                  .getElementById("list_" + item)
                  .filter(function (x) {
                    return x.getAttribute("idobj") === datarow[0][item];
                  });

                document.getElementById(item).value = rr.getAttribute("value");
                document
                  .getElementById(item)
                  .setAttribute("list_value", rr.getAttribute("idobj"));
              } else {
                document.getElementById(item).value = datarow[0][item];
              }
            } catch (error) {}
          });
        } catch (error) {} */

        try {
          localStorage.removeItem("axn_recordselezionato");
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
            "axn_recordselezionato",
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
  };
};
export default useForm;
