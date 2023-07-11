import React from "react";
import classes from "../style/SideMenuSwitch.module.css";
const SideMenuSwitch = ({ onoff, onClick }) => {
  const stylecontent = [
    classes.sidemenuswitch_content,
    onoff ? classes.sidemenuswitch_open : classes.sidemenuswitch_close,
  ];
  const switchevent = () => {
    onClick();
  };
  return (
    <div className={stylecontent.join(" ")} onClick={switchevent}>
      <label>{onoff ? "<" : ">"}</label>
    </div>
  );
};

export default SideMenuSwitch;
