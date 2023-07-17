import React from "react";
import classes from "../style/SideMenuSwitch.module.css";
const SideMenuSwitch = ({ onoff, onClick }) => {
  const stylecontent = [
    classes.sidemenuswitch_content,
    onoff ? classes.sidemenuswitch_open : classes.sidemenuswitch_close,
  ];

  const stylebar = [onoff ? classes.mstogglerbar : classes.mstogglerbarclose];
  const switchevent = () => {
    onClick();
  };
  return (
    <div className={stylecontent.join(" ")} onClick={switchevent}>
      <div className={classes.msasidetoggler}>
        <span className={stylebar.join(" ")}></span>
        <span className={stylebar.join(" ")}></span>
        <span className={stylebar.join(" ")}></span>
      </div>
    </div>
  );
};

export default SideMenuSwitch;
