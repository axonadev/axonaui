import React from "react";
import classes from "../style/Frame.module.css";
import Card from "../Card/Card";
const Frame = ({ label, children, type = "form", id, stato = "" }) => {
  const classStyle = ["frame_label", classes.frame_label];
  const classStyleStato = ["frame_label", classes.frame_stato];
  return (
    <Card
      type={type}
      id={id}
      className={classes["frame_" + stato.toLowerCase()]}
    >
      <div className={classes.frame_header}>
        {label && <div className={classStyle.join(" ")}>{label}</div>}
        {stato && <div className={classStyleStato.join(" ")}>{stato}</div>}
      </div>
      <div className={classes.framecontent}>{children}</div>
    </Card>
  );
};

export default Frame;
