import React from "react";
import classes from "./style/Img.module.css";
const Img = ({ className, src, alt, type }) => {
  const classn = [
    classes["img_" + type],
    classes.img,
    className ? " " + className : "",
  ];

  return <img src={src} alt={alt ? alt : ""} className={classn.join(" ")} />;
};
export default Img;
