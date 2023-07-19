import React from "react";
import classes from "../style/Button.module.css";
const Button = ({ children, id, onClick, className, type = "md" }) => {
  const clsStyle = [classes.button, className, classes["button_type_" + type]];

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
