import React from "react";
import classes from "../style/Frame.module.css";
const Frame = ({ label, children }) => {
  const classStyle = ["frame_label", classes.frame_label];

  return (
    <React.Fragment>
      {label && <div className={classStyle.join(" ")}>{label}</div>}
      <div className={classes.framecontent}>{children}</div>
    </React.Fragment>
  );
};

export default Frame;
