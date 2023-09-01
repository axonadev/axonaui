import React from "react";
import classes from "../style/Frame.module.css";
const FrameContainer = ({ children, id, form_id, onChangeValue }) => {
  let argpost;

  if (onChangeValue !== undefined) {
    argpost = {
      form_id: form_id,
      onChangeValue: onChangeValue,
    };
  } else {
    argpost = {
      form_id: form_id,
    };
  }

  return (
    <div className={classes.framecontainer} id={id} form_id={form_id}>
      {children.length > 1 &&
        children.map((item) => {
          return React.cloneElement(item, argpost);
        })}
      {children.length === undefined && React.cloneElement(children, argpost)}
    </div>
  );
};

export default FrameContainer;
