import React, { useState, useEffect } from "react";
import ChecklistItem from "./ChecklistItem";

const Checklist = (props) => {
  const [strRowFetch, setstrRowFetch] = useState("");
  const effList = props.list;

  const changeRowFetchHandler = (id, valrow) => {
    let comms = "";
    let commsapp = "";
    comms = strRowFetch;

    effList.list.map((item) => {
      if (Number(id) === item[effList.id]) {
        commsapp = comms.substring(
          comms.indexOf('"' + effList.col + '":"' + item[effList.id] + '",')
        );
        comms = comms.substring(
          0,
          comms.indexOf('"' + effList.col + '":"' + item[effList.id] + '",')
        );
        commsapp = commsapp.substring(commsapp.indexOf("}") + 1);
        comms =
          comms +
          '"' +
          effList.col +
          '":"' +
          id +
          '","valid":"' +
          valrow +
          '"}' +
          commsapp;
      } else {
      }
    });

    if (comms[0] === ",") {
      comms = comms.substring(1);
    }
    setstrRowFetch(comms);
    console.log(comms);
  };

  useEffect(() => {
    let comms = "";
    effList.list.map((item) => {
      comms =
        comms +
        ',{"pidobj":"' +
        effList.pidobj +
        '","' +
        effList.col +
        '":"' +
        item[effList.id] +
        '","valid":"' +
        (item[effList.value] === 1 ? "true" : "false") +
        '"}';
    });
    if (comms[0] === ",") {
      comms = comms.substring(1);
    }
    setstrRowFetch(comms);
  }, [effList.list]);

  return (
    <>
      {effList.list.map((item) => {
        return (
          <ChecklistItem
            key={effList.descr + "_" + item[effList.id]}
            id={effList.descr + "_" + item[effList.id]}
            listitem={item}
            valId={effList.id}
            valDes={effList.descr}
            valCheck={effList.value}
            db={props.id}
            pidobj={props.pidobj}
            changeRowFetch={changeRowFetchHandler}
          />
        );
      })}
      <input
        type="text"
        value={strRowFetch}
        id={effList.col}
        tipo="listbox"
        pidobj={props.pidobj}
        db={props.id}
      />
    </>
  );
};
export default Checklist;
