import React, { useCallback, useEffect } from "react";
import classes from "../style/Card.module.css";

const Card = ({
  children = null,
  className = null,
  id = "",
  type = "",
  onClick = null,
  onKeyUp = null,
}) => {
  const cls = [classes.card, className, classes["card_" + type]];

  const keyState = {
    toggleCP: (event) => {
      try {
        onKeyUp(event);
      } catch (error) {}
    },
  };

  const handleKeyUp = useCallback(
    (event) => {
      keyState.toggleCP(event);
    },
    [keyState.toggleCP]
  );

  const clickHandler = () => {
    try {
      onClick();
    } catch (error) {}
  };

  const onKeyUpHandler = () => {
    try {
      onKeyUp();
    } catch (error) {}
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <div
      id={id}
      className={cls.join(" ")}
      onClick={clickHandler}
      onKeyUp={onKeyUpHandler}
    >
      {children}
    </div>
  );
};
export default Card;
