import React from "react";
import classes from "../style/Frame.module.css";
import Card from "../Card/Card";
const Frame = ({ label, children, type = "form", id }) => {
  const classStyle = ["frame_label", classes.frame_label];

  return (
    <Card type={type} id={id}>
      {label && <div className={classStyle.join(" ")}>{label}</div>}
      <div className={classes.framecontent}>{children}</div>
    </Card>
  );
};

export default Frame;
