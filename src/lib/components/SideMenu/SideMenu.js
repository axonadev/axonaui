import React, { useState } from "react";
import classes from "../style/SideMenu.module.css";
import SideMenuBottone from "./SideMenuBottone";
import SideMenuAmbito from "./SideMenuAmbito";
import SideMenuSwitch from "./SideMenuSwitch";

const SideMenu = () => {
  const [onoff, setOnoff] = useState(true);
  const [idAmbito, setIdAmbito] = useState(0);

  const listmoduli = JSON.parse(localStorage.getItem("axn_v_moduli"));

  const datatextanagrafica = listmoduli.filter((item) => {
    return item.Ambito_Nome === "Anagrafica";
  });
  const datatextgestione = listmoduli.filter((item) => {
    return item.Ambito_Nome === "Gestione";
  });

  const datatextordini = listmoduli.filter((item) => {
    return item.Ambito_Nome === "Ordini";
  });

  const datatextutilita = listmoduli.filter((item) => {
    return item.Ambito_Nome === "Utilita";
  });

  const datatextservizi = listmoduli.filter((item) => {
    return item.Ambito_Nome === "Servizi";
  });

  const selAmbito = (id) => {
    setIdAmbito((precid) => {
      return precid === id ? 0 : id;
    });
  };

  const stylecontent = [
    classes.sidemenu_content,
    onoff ? classes.sidemenu_open : classes.sidemenu_close,
  ];

  const switchEvent = () => {
    setOnoff((prevonoff) => {
      return !prevonoff;
    });
  };
  return (
    <div className={stylecontent.join(" ")}>
      <SideMenuSwitch onoff={onoff} onClick={switchEvent} />
      <SideMenuBottone onoff={onoff} label="Home" src="logo192.png" />

      {datatextanagrafica.length > 0 && (
        <SideMenuAmbito
          idAmbito={1}
          onoff={onoff}
          label="Anagrafica"
          src="logo192.png"
          selezionato={idAmbito}
          list={datatextanagrafica}
          onClick={selAmbito}
        />
      )}
      {datatextgestione.length > 0 && (
        <SideMenuAmbito
          idAmbito={2}
          onoff={onoff}
          label="Gestione"
          selezionato={idAmbito}
          list={datatextgestione}
          onClick={selAmbito}
        />
      )}
      {datatextordini.length > 0 && (
        <SideMenuAmbito
          idAmbito={3}
          onoff={onoff}
          label="Ordini"
          selezionato={idAmbito}
          list={datatextordini}
          onClick={selAmbito}
        />
      )}

      {datatextutilita.length > 0 && (
        <SideMenuAmbito
          idAmbito={4}
          onoff={onoff}
          label="utilita"
          selezionato={idAmbito}
          list={datatextutilita}
          onClick={selAmbito}
        />
      )}

      {datatextservizi.length > 0 && (
        <SideMenuAmbito
          idAmbito={5}
          onoff={onoff}
          label="Servizi"
          selezionato={idAmbito}
          list={datatextservizi}
          onClick={selAmbito}
        />
      )}
    </div>
  );
};

export default SideMenu;
