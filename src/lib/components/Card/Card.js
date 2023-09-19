import React from "react";
import classes from "../style/Card.module.css";

const Card = ({ children, className, id, type = "", onClick }) => {
  const cls = [classes.card, className, classes["card_" + type]];

  const clickHandler = () => {
    try {
      onClick();
    } catch (error) {}
  };

  return (
    <div id={id} className={cls.join(" ")} onClick={clickHandler}>
      {children}
    </div>
  );
};
export default Card;
