import React from "react";
import classes from "../style/SideMenuBottone.module.css";
import Img from "../Img/Img";

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
    onoff
      ? classes.sidemenubottone_contentopen
      : classes.sidemenubottone_contentclose,
  ];

  const stylelabel = [
    onoff
      ? classes.sidemenubottone_labelopen
      : classes.sidemenubottone_labelclose,
  ];

  const btnhandler = () => {
    onClick(path);
  };

  return (
    <div className={stylecontent.join(" ")} onClick={btnhandler}>
      <div>
        <Img type={src} />
      </div>

      <div className={stylelabel.join(" ")}>
        <label>{label}</label>
      </div>

      {ambito && (
        <div>
          <label>{selezionato ? "-" : "+"}</label>
        </div>
      )}
    </div>
  );
};

export default SideMenuBottone;
