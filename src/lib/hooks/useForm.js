import React, { useEffect } from "react";
import { useState, useCallback } from "react";

const useForm = () => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [datarow, setDataRow] = useState(null);

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

  useEffect(() => {
    const writeform = () => {
      if (datarow) {
        try {
          const idfield = Object.keys(datarow[0]);
          idfield.map((item) => {
            try {
              document.getElementById(item).value = datarow[0][item];
            } catch (error) {}
          });
        } catch (error) {}
      }
    };
    writeform();
  }, [datarow]);

  return { datarow, isloading, error, onChangeSelected };
};
export default useForm;
