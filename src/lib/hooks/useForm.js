import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import { formatDate } from "axonalib";

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

  useEffect(() => {
    const writeform = () => {
      if (datarow) {
        try {
          const idfield = Object.keys(datarow[0]);
          idfield.map((item) => {
            try {
              if (document.getElementById(item).type === "date") {
                console.log(document.getElementById(item));
                /* document.getElementById(item).value = formatDate(
                  datarow[0][item],
                  "dd-MM-yyyy"
                ); */

                const dt = new Date("2024-08-02");

                console.log(dt);
                document.getElementById(item).value = formatDate(dt);
                console.log(document.getElementById(item));
              } else {
                document.getElementById(item).value = datarow[0][item];
              }
            } catch (error) {}
          });
        } catch (error) {}
      }
      const dt = new Date("2024-08-02");
    };
    writeform();
  }, [datarow]);

  return { datarow, isloading, error, onChangeSelected, onReset };
};
export default useForm;
