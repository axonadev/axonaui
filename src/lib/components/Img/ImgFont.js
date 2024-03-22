import React from "react";
import classes from "../style/Img.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

const ImgFont = ({
  className,
  id,
  icon = "",
  size = "",
  onClick,
  color,
  cursor,
}) => {
  const classn = [
    classes["img_" + color],
    classes["img_" + (cursor ? "cursor" : "")],
    // classes["img_cursor"],
    classes.img,
    classes["img_" + size],
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
      icon={icon ? Icons[icon] : ""}
      id={id}
      className={classn.join(" ")}
      onClick={onClickHandler}
    />
  );
};
export default ImgFont;
