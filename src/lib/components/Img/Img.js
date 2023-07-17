import React from "react";
import classes from "../style/Img.module.css";
const Img = ({ className, id, src, alt, type }) => {
  const classn = [
    classes["img_" + type],
    classes.img,
    className ? " " + className : "",
  ];
  const urlsite = window.location.hostname;
  const porturlsite = window.location.port;

  const srcImage = src
    ? src
    : type.substring(0, 3) === "my_"
    ? "//" +
      urlsite +
      (porturlsite ? ":" + porturlsite : "") +
      "/img/" +
      localStorage.getItem("axn_piva") +
      "/" +
      type +
      ".png"
    : "//" +
      urlsite +
      (porturlsite ? ":" + porturlsite : "") +
      "/img/" +
      type +
      ".png";

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
