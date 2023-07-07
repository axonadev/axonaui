import React from "react";
import classes from "../style/SideMenuBottone.module.css";

const SideMenuBottone = ({ path, src, label, onoff, className, onClick }) => {
  const stylecontent = [classes.sidemenubottone_content, className];

  const btnhandler = () => {
    onClick(path);
  };

  return (
    <div className={stylecontent.join(" ")} onClick={btnhandler}>
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
