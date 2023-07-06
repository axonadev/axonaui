import React from "react";
import SideMenuBottone from "./SideMenuBottone";
import classes from "../style/SideMenuAmbito.module.css";

const SideMenuAmbito = ({
  label,
  src,
  onoff,
  list,
  selezionato,
  idAmbito,
  onClick,
}) => {
  const selAmbitoEvent = () => {
    onClick(idAmbito);
  };
  const stylelist = [
    classes.sidemenuambito_list,
    selezionato === idAmbito
      ? classes.sidemenuambito_listopen
      : classes.sidemenuambito_listclose,
  ];

  console.log(src);
  return (
    <div className={classes.sidemenuambito_content} onClick={selAmbitoEvent}>
      <SideMenuBottone
        onoff={onoff}
        label={label}
        src={src}
        className={classes.sidemenuambito_label}
      />
      <div
        className={stylelist.join(" ")}
        style={{ height: list.length * 50 + "px" }}
      >
        {selezionato === idAmbito &&
          list &&
          list.map((item) => {
            return (
              <SideMenuBottone
                onoff={onoff}
                label={item.Moduli_Nome}
                src={item.Moduli_Icona}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SideMenuAmbito;
