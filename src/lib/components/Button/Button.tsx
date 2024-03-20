import React from "react";
import classes from "../style/Button.module.css";

interface MyButtonProps {
  children : JSX.Element | JSX.Element[];
  id: string ;
  onClick : React.MouseEventHandler<HTMLButtonElement>;
  className : JSX.Element | string ;
  type: "md" | "sm" | "submit" | "doc" ;
}

const Button = ({
  children ,
  id ,
  onClick ,
  className ,
  type = "md",
}:MyButtonProps) => {

  const clsStyle = [classes.button, className, classes["button_type_" + type]];
  const onClickHandler = (evt) => {
    try {
      onClick(evt);
    } catch (error) {}
  };

  const btntype = type === "submit" ? type : "button";

  return (
    <button id={id}
      className={clsStyle.join(" ")}
      onClick={onClickHandler}
      type={btntype}
    >
      {children}
    </button>
  );
};
export default Button;
