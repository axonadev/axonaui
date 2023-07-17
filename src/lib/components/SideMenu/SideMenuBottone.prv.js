import React from "react";
import classes from "../style/SideMenuBottone.module.css";

const SideMenuBottone = ({
  path,
  src,
  label,
  onoff,
  className,
  onClick,
  ambito,
  selezionato,
}) => {
  const stylecontent = [
    classes.sidemenubottone_content,
    classes[className],
    ambito ? classes.sidemenubottone_contentambito : "",
  ];

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
      {ambito && (
        <div>
          <label>{selezionato ? "-" : "+"}</label>
        </div>
      )}
    </div>
  );
};

export default SideMenuBottone;
