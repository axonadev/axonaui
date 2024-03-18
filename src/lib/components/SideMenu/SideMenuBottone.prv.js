import React from "react";
import classes from "../style/SideMenuBottone.module.css";
import ImgFont from "../Img/ImgFont";

const SideMenuBottone = ({
  path,
  src,
  iconsize = "medium",
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
    className,
    ambito ? classes.sidemenubottone_contentambito : "",
    onoff
      ? classes.sidemenubottone_contentopen
      : classes.sidemenubottone_contentclose,

    localStorage.getItem("axn_sidemenubottonesel") === label
      ? classes.sidemenubottonesel
      : "",
  ];

  const stylelabel = [
    onoff
      ? classes.sidemenubottone_labelopen
      : classes.sidemenubottone_labelclose,
  ];

  const btnhandler = () => {
    localStorage.setItem("axn_sidemenubottonesel", label);
    onClick(path);
  };

  return (
    <div className={stylecontent.join(" ")} onClick={btnhandler}>
      <div>
        <ImgFont icon={src} size={iconsize} />
      </div>

      <div className={stylelabel.join(" ")}>
        <label>{label}</label>
      </div>
      {/* {ambito && (
        <div>
          <label>{selezionato ? "-" : "+"}</label>
        </div>
      )} */}
    </div>
  );
};

export default SideMenuBottone;
