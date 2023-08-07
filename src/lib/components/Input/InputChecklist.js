import React, { useState, useEffect } from "react";
import InputCheckBox from "./InputCheckBox";

const InputCheckList = ({
  url,
  nameList,
  field_id,
  field_description,
  field_value,
  field_target,
  pidobj,
}) => {
  const [list, setList] = useState(null);
  const [jsonDriver, setJsonDriver] = useState("");

  useEffect(() => {
    const loadList = () => {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setList(data.Itemset[nameList]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    loadList();
  }, []);

  useEffect(() => {
    const convertinJson = () => {
      if (list) {
        let comm = "";
        list.map((item) => {
          if (item[field_value] === "True") {
            comm =
              comm +
              ",{pidobj:" +
              pidobj +
              "," +
              field_target +
              ":" +
              item[field_id] +
              "}";
          }
        });

        setJsonDriver("[" + comm.substring(1) + "]");
      }
    };
    convertinJson();
  }, [list]);

  return (
    <>
      {list &&
        list.map((item) => {
          return (
            <InputCheckBox
              label={item[field_description]}
              value={item[field_value]}
              id={field_description + "_" + item[field_id]}
            />
          );
        })}

      <input type="text" id={field_target} value={jsonDriver} tipo="text" />
    </>
  );
};
export default InputCheckList;
