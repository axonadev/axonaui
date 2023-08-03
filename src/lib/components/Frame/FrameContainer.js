import React from "react";
import classes from "../style/Frame.module.css";
const FrameContainer = ({ children, id }) => {
  return (
    <div className={classes.framecontainer} id={id}>
      {children}
    </div>
  );
};

export default FrameContainer;
