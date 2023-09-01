import React from "react";
import classes from "../style/Frame.module.css";
import Card from "../Card/Card";
const Frame = ({
  label,
  children,
  form_id,
  type = "form",
  id,
  stato = "",
  onChangeValue,
}) => {
  const classStyle = ["frame_label", classes.frame_label];
  const classStyleStato = ["frame_label", classes.frame_stato];

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
    <Card
      type={type}
      id={id}
      className={classes["frame_" + stato.toLowerCase()]}
    >
      <div className={classes.frame_header}>
        {label && <div className={classStyle.join(" ")}>{label}</div>}
        {stato && <div className={classStyleStato.join(" ")}>{stato}</div>}
      </div>
      <div className={classes.framecontent}>
        {children.length > 1 &&
          children.map((item) => {
            return React.cloneElement(item, argpost);
          })}
        {children.length === undefined && React.cloneElement(children, argpost)}
      </div>
    </Card>
  );
};

export default Frame;
