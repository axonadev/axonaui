import React from "react";
import classes from "../style/Frame.module.css";
const FrameContainer = ({ children, id, form_id, onChangeValue, help }) => {
  let argpost;

  if (onChangeValue !== undefined) {
    argpost = {
      form_id: form_id,
      onChangeValue: onChangeValue,
      help: help,
      key: id,
    };
  } else {
    argpost = {
      form_id: form_id,
      help: help,
      key: id,
    };
  }

  return (
    <div className={classes.framecontainer} id={id} form_id={form_id}>
      {children.length > 1 &&
        children.map((item, i) => {
          return (
            <React.Fragment key={i}>
              {React.cloneElement(item, argpost)}
            </React.Fragment>
          );
        })}
      {children.length === undefined && React.cloneElement(children, argpost)}
    </div>
  );
};

export default FrameContainer;
