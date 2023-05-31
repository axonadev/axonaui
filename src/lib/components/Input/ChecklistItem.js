import React, { useState } from "react";
const ChecklistItem = (props) => {
  const listitem = props.listitem;
  const [checked, setChecket] = useState(listitem[props.valCheck]);

  const checkItemChange = (evt) => {
    setChecket((prop) => {
      props.changeRowFetch(evt.target.attributes.idobj.value, !prop);
      return !prop;
    });
  };

  return (
    <div key={listitem[props.valId] + Math.random}>
      <input
        key={listitem[props.valId] + Math.random}
        id={props.db + "_" + listitem[props.valId]}
        idobj={listitem[props.valId]}
        pidobj={props.pidobj}
        type="checkbox"
        tipo="cboxi"
        onClick={checkItemChange}
        checked={checked}
        db={props.db}
      />
      <label>{listitem[props.valDes]}</label>
    </div>
  );
};
export default ChecklistItem;
