import React from "react";
import classes from "./style/Card.module.css";
const Card = ({ children, className, id }) => {
  const cls = [classes.card, className];

  return (
    <div id={id} className={cls.join(" ")}>
      {children}
    </div>
  );
};
export default Card;
