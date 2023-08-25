import React from "react";
import classes from "../style/Frame.module.css";
const FrameContainer = ({ children, id, form_id }) => {
  return (
    <div className={classes.framecontainer} id={id} form_id={form_id}>
      {children.length > 1 &&
        children.map((item) => {
          return React.cloneElement(item, { form_id: form_id });
        })}
      {children.length === undefined &&
        React.cloneElement(children, { form_id: form_id })}
    </div>
  );
};

export default FrameContainer;
