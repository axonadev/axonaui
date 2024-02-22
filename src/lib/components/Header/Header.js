import React from "react";
import Img from "../Img/Img";
import classes from "../style/Header.module.css";
const Header = ({ id, titolo, pathimg, className }) => {
  const clsName = [classes.header_content, classes[className]];

  return (
    <header id={id} className={clsName.join(" ")}>
      <div id={id} className={classes.header_contentorizontal}>
        <div className={classes.header_contentvertical}>
          <label className={classes.header_label}>{titolo}</label>
        </div>
        <div className={classes.header_contentvertical}>
          {/* <span>
            <Img src={pathimg + "/message.png"} type={"button"} />
            <Img src={pathimg + "/notification.png"} type={"button"} />
            <Img src={pathimg + "/settings.png"} type={"button"} />
          </span> */}
        </div>
      </div>
    </header>
  );
};
export default Header;
