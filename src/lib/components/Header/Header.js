import React, { useEffect, useState } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import classes from "../style/Header.module.css";

const Header = ({ id, titolo }) => {
  const isSideOpen = useSelector((state) => state.sideMenu.value);

  useEffect(() => {}, [isSideOpen]);

  return (
    <header
      id={id}
      className={
        isSideOpen ? classes.header_left_250px : classes.header_left_60px
      }
    >
      <label className={classes.header_label}>{titolo}</label>
    </header>
  );
};
export default Header;
