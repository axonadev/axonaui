import React, { useState, useEffect } from "react";
import InputCheckBox from "./InputCheckBox";

const InputChecklist = ({
  url,
  nameList,
  field_id,
  field_description,
  field_value,
}) => {
  const [list, setList] = useState(null);

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
    </>
  );
};
export default InputChecklist;
