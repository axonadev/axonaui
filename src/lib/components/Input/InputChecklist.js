import React, { useState, useEffect } from "react";
import InputCheckBox from "./InputCheckBox";
import classes from "../style/Input.module.css";

const InputCheckList = ({
  url,
  nameList,
  field_id,
  field_description,
  field_value,
  field_target,
  db_target,
  pidobj,
}) => {
  const [list, setList] = useState(null);
  const [jsonDriver, setJsonDriver] = useState("");

  const changeSelection = (evt) => {
    if (list) {
      let comm = "";

      list.map((item) => {
        var checkbox = document.getElementById(
          field_description + "_" + item[field_id]
        );

        if (checkbox.checked) {
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

      if (comm === "") {
        comm = ",{pidobj:" + pidobj + "," + field_target + ":0}";
      }

      setJsonDriver("[" + comm.substring(1) + "]");
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

        if (comm === "") {
          comm = ",{pidobj:" + pidobj + "," + field_target + ":0}";
        }
        setJsonDriver("[" + comm.substring(1) + "]");
      }
    };
    convertinJson();
  }, [list]);

  return (
    <div className={classes.inputchecklist_content}>
      {list &&
        list.map((item, i) => {
          return (
            <InputCheckBox
              key={i}
              label={item[field_description]}
              value={item[field_value]}
              id={field_description + "_" + item[field_id]}
              onChange={changeSelection}
              labelAlign='right'
            />
          );
        })}

      <input
        type='text'
        id={field_target}
        value={jsonDriver}
        tipo='driverchecklist'
        db_target={db_target}
        className={classes.checkboxlistjson}
      />
    </div>
  );
};
export default InputCheckList;
