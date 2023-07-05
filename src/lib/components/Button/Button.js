import React from "react";
import classes from "../style/Button.module.css";
const Button = ({ children, id, onClick, className }) => {
  const clsStyle = [classes.button, className];

  const onClickHandler = (evt) => {
    try {
      onClick(evt);
    } catch (error) {}
  };
  return (
    <button id={id} className={clsStyle.join(" ")} onClick={onClickHandler}>
      {children}
    </button>
  );
};
export default Button;
