import React, { useState } from "react";
import classes from "../style/SideMenuSwitch.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
const SideMenuSwitch = ({ onoff, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const stylecontent = [
    classes.sidemenuswitch_content,
    onoff ? classes.sidemenuswitch_open : classes.sidemenuswitch_close,
  ];

  const stylebar = [onoff ? classes.mstogglerbar : classes.mstogglerbarclose];
  const switchevent = () => {
    onClick();
    setIsOpen(!isOpen);
  };
  return (
    <div className={stylecontent.join(" ")} onClick={switchevent}>
      <div className={classes.msasidetoggler}>
        {/* <span className={stylebar.join(" ")}></span>
        <span className={stylebar.join(" ")}></span>
        <span className={stylebar.join(" ")}></span> */}
        {isOpen && <FontAwesomeIcon icon={faChevronLeft} />}
        {!isOpen && <FontAwesomeIcon icon={faChevronRight} />}
      </div>
    </div>
  );
};

export default SideMenuSwitch;
