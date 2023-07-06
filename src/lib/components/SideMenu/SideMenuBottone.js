import React from "react";
import classes from "../style/SideMenuBottone.module.css";

const SideMenuBottone = ({ src, label, onoff, className }) => {
  const stylecontent = [classes.sidemenubottone_content, className];

  return (
    <div className={stylecontent.join(" ")}>
      <div>
        <img src={src} alt="" />
      </div>
      {onoff && (
        <div>
          <label>{label}</label>
        </div>
      )}
    </div>
  );
};

export default SideMenuBottone;
