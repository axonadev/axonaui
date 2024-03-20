import React from "react";
import SideMenuBottone from "./SideMenuBottone.prv";
import classes from "../style/SideMenuAmbito.module.css";
import class2 from "../style/SideMenuBottone.module.css";

const SideMenuAmbito = ({
  label,
  src,
  icon,
  onoff,
  list,
  idAmbito,
  onClick,
  onSelProgetto,
}) => {
  const selAmbitoEvent = () => {
    onClick(idAmbito);
  };
  const selProgetto = (path) => {
    onSelProgetto(path);
  };

  const selezionato = parseInt(localStorage.getItem("axn_sidemenuchoose"));

  const stylelist = [
    classes.sidemenuambito_list,
    selezionato === idAmbito
      ? classes.sidemenuambito_listopen
      : classes.sidemenuambito_listclose,
  ];

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
                iconsize='xs'
                key={item.IDOBJ}
                onoff={onoff}
                label={item.Moduli_Nome}
                src={item.Moduli_Icona}
                onClick={selProgetto}
                path={"../" + item.Moduli_IndirizzoModulo}
                className={`${classes.sidemenuambito_progetti} ${class2.sidemenubottone_progetti}`}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SideMenuAmbito;
