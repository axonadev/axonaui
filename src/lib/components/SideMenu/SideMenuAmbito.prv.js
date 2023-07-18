import React from "react";
import SideMenuBottone from "./SideMenuBottone.prv";
import classes from "../style/SideMenuAmbito.module.css";

const SideMenuAmbito = ({
  label,
  src,
  onoff,
  list,
  selezionato,
  idAmbito,
  onClick,
  onSelProgetto,
  pathImg = "",
}) => {
  const selAmbitoEvent = () => {
    onClick(idAmbito);
  };
  const selProgetto = (path) => {
    onSelProgetto(path);
  };
  const stylelist = [
    classes.sidemenuambito_list,
    selezionato === idAmbito
      ? classes.sidemenuambito_listopen
      : classes.sidemenuambito_listclose,
  ];

  console.log(src);
  return (
    <div className={classes.sidemenuambito_content}>
      <SideMenuBottone
        onoff={onoff}
        label={label}
        src={src}
        className={classes.sidemenuambito_label}
        onClick={selAmbitoEvent}
        ambito={true}
        selezionato={selezionato === idAmbito}
        pathImg={pathImg}
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
                onClick={selProgetto}
                path={item.Moduli_IndirizzoModulo}
                pathImg={pathImg}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SideMenuAmbito;
