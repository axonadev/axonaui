import React from "react";
import classes from "../style/Img.module.css";
const Img = ({ className, id, src, alt, type, pathImg = "" }) => {
  const classn = [
    classes["img_" + type],
    classes.img,
    className ? " " + className : "",
  ];
  const urlsite =
    pathImg === ""
      ? window.location.hostname +
        (window.location.port ? ":" + window.location.port : "")
      : pathImg;

  const srcImage = src
    ? src
    : type.substring(0, 3) === "my_"
    ? "//" +
      urlsite +
      "/img/" +
      localStorage.getItem("axn_piva") +
      "/" +
      type +
      ".png"
    : "//" + urlsite + "/img/" + type + ".png";

  return (
    <img
      id={id}
      src={srcImage}
      alt={alt ? alt : ""}
      className={classn.join(" ")}
    />
  );
};
export default Img;
