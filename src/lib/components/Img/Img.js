import React from "react";
import classes from "../style/Img.module.css";
const Img = ({ className, id, src, alt, type }) => {
  const classn = [
    classes["img_" + type],
    classes.img,
    className ? " " + className : "",
  ];

  const urlsite = window.location.hostname;

  return (
    <img
      id={id}
      src={src ? src : urlsite + "/img/" + type + ".png"}
      alt={alt ? alt : ""}
      className={classn.join(" ")}
    />
  );
};
export default Img;
