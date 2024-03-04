import React from "react";
import classes from "../style/Img.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

const ImgFont = ({ className, id, icon = "", onClick, color }) => {
  const classn = [
    classes["img_" + color],
    classes.img,
    className ? " " + className : "",
    classes[className],
  ];

  const onClickHandler = (evt) => {
    try {
      onClick(evt);
    } catch (error) {}
  };

  return (
    <FontAwesomeIcon
      icon={Icons[icon]}
      id={id}
      className={classn.join(" ")}
      onClick={onClickHandler}
    />
  );
};
export default ImgFont;
