import React from "react";
import classes from "../style/Img.module.css";
const Img = ({ className, id, src, alt, type, pathImg = "" }) => {
  const classn = [
    classes["img_" + type],
    classes.img,
    className ? " " + className : "",
  ];
  const urlsite =
    pathImg === "getlocal"
      ? localStorage.getItem("axn_pathimg")
      : pathImg === "" || pathImg === null || pathImg === undefined
      ? window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "") +
        "/img"
      : pathImg.indexOf("/img") > -1
      ? pathImg
      : pathImg + "/img";

  const srcImage = src
    ? src
    : type.substring(0, 3) === "my_"
    ? "" +
      urlsite +
      "/" +
      localStorage.getItem("axn_piva") +
      "/" +
      type +
      ".png"
    : "" + urlsite + "/" + type + ".png";

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
