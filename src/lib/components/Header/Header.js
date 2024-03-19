import React, { useState } from "react";
import classes from "../style/Header.module.css";
const Header = ({ id, titolo, className }) => {
  const [openProfilo, setOpenProfilo] = useState(false);
  const profiloClick = () => {
    setOpenProfilo((prec) => {
      return !prec;
    });
  };

  const clsName = [classes.header_content, classes[className]];

  return (
    <header id={id} className={clsName.join(" ")}>
      <h1 className={classes.header_label}>{titolo}</h1>
    </header>
  );
};
export default Header;
