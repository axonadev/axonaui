import React from "react";
import classes from "../style/Card.module.css";
const Card = ({ children, className, id, type }) => {
  const cls = [classes.card, className, classes["card_" + type]];

  return (
    <div id={id} className={cls.join(" ")}>
      {children}
    </div>
  );
};
export default Card;
