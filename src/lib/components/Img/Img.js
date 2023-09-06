import React, { useState } from "react";
import classes from "../style/Img.module.css";
const Img = ({ className, id, src, alt, type, pathImg = "", onClick }) => {
  const classn = [
    classes["img_" + type],
    classes.img,
    className ? " " + className : "",
  ];

  const varpath =
    localStorage.getItem("axn_pathimg") === null ||
    localStorage.getItem("axn_pathimg") === undefined
      ? window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "") +
        "/img"
      : localStorage.getItem("axn_pathimg");

  const urlsite =
    pathImg === "getlocal"
      ? varpath
      : pathImg === "" || pathImg === null || pathImg === undefined
      ? window.location.protocol +
        "//" +
        window.location.hostname +
        (window.location.port ? ":" + window.location.port : "") +
        "/img"
      : pathImg.indexOf("/img") > -1
      ? pathImg
      : pathImg + "/img";

  const [srcImage, setSrcImage] = useState(
    src
      ? src
      : type.substring(0, 3) === "my_"
      ? "" +
        urlsite +
        "/" +
        localStorage.getItem("axn_piva") +
        "/" +
        type +
        ".svg"
      : "" + urlsite + "/" + type + ".svg"
  );

  const onClickHandler = (evt) => {
    try {
      onClick(evt);
    } catch (error) {}
  };

  const onErrorHanding = () => {
    setSrcImage(
      src
        ? src
        : type.substring(0, 3) === "my_"
        ? "" +
          urlsite +
          "/" +
          localStorage.getItem("axn_piva") +
          "/" +
          type +
          ".png"
        : "" + urlsite + "/" + type + ".png"
    );
  };

  return (
    <img
      id={id}
      src={srcImage}
      alt={alt ? alt : ""}
      className={classn.join(" ")}
      onClick={onClickHandler}
      onError={onErrorHanding}
    />
  );
};
export default Img;
