import React, { useState } from "react";
import Img from "../Img/Img";
import Button from "../Button/Button";
import Profilo from "../Profilo/Profilo";
import classes from "../style/Header.module.css";
const Header = ({ id, titolo, pathimg, className }) => {
  const [openProfilo, setOpenProfilo] = useState(false);
  const profiloClick = () => {
    // console.log("hai cliccato profilo");
    setOpenProfilo((prec) => {
      return !prec;
    });
  };

  const clsName = [classes.header_content, classes[className]];

  return (
    <header id={id} className={clsName.join(" ")}>
      <label className={classes.header_label}>{titolo}</label>

      {/* VECCHIO HEADER */}
      {/* <div id={id} className={classes.header_contentorizontal}>
        <div className={classes.header_contentvertical}>
          <label className={classes.header_label}>{titolo}</label>
        </div>
        <div className={classes.header_contentvertical}>
        </div>
      </div>
       <span>
        <Img src={pathimg + "/message.png"} type={"button"} />
        <Img src={pathimg + "/notification.png"} type={"button"} />
        <Img src={pathimg + "/settings.png"} type={"button"} />
      </span> */}
    </header>
  );
};
export default Header;
