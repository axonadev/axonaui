import React from "react";
import classes from "../style/Img.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

const ImgFont = ({ className, id, icon, onClick }) => {
  const classn = [
    classes["img_" + icon],
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
    // <FontAwesomeIcon
    //   icon={Icons[[icon]]}
    //   id={id}
    //   className={classn.join(" ")}
    //   onClick={onClickHandler}
    // />

    <FontAwesomeIcon
      icon={Icons[icon === "print" ? "faPrint" : icon]}
      id={id}
      className={classn.join(" ")}
      onClick={onClickHandler}
    />
  );
};
export default ImgFont;
