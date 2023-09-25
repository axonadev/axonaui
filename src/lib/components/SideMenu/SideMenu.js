import React, { useState, useEffect } from "react";
import classes from "../style/SideMenu.module.css";
import Img from "../Img/Img";
import SideMenuBottone from "./SideMenuBottone.prv";
import SideMenuAmbito from "./SideMenuAmbito.prv";
import SideMenuSwitch from "./SideMenuSwitch.prv";

const SideMenu = ({ onSideMenuChange }) => {
  const [onoff, setOnoff] = useState(
    localStorage.getItem("axn_sidemenuswitch")
      ? localStorage.getItem("axn_sidemenuswitch") === "true"
        ? true
        : false
      : true
  );

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

  const datatextconta = listmoduli.filter((item) => {
    return item.Ambito_Nome === "Contabilita";
  });

  const datatextutilita = listmoduli.filter((item) => {
    return item.Ambito_Nome === "Utilita";
  });

  const datatextservizi = listmoduli.filter((item) => {
    return item.Ambito_Nome === "Servizi";
  });

  const selAmbito = (id) => {
    setIdAmbito((precid) => {
      localStorage.setItem("axn_sidemenuchoose", precid === id ? 0 : id);
      return precid === id ? 0 : id;
    });
  };

  const selProgetto = (path) => {
    window.location = path;
  };

  const stylecontent = [
    classes.sidemenu_content,
    onoff ? classes.sidemenu_open : classes.sidemenu_close,
  ];

  const switchEvent = () => {
    setOnoff((prevonoff) => {
      localStorage.setItem("axn_sidemenuswitch", !prevonoff);
      onSideMenuChange(!prevonoff);
      return !prevonoff;
    });
  };

  return (
    <div className={stylecontent.join(" ")}>
      <div className={classes.sidemenu_top}>
        <div className={classes.sidemenu_topimg}>
          <div className={classes.sidemenu_topimgcenter}>
            <Img type="my_logo" pathImg="getlocal" />
          </div>
        </div>
        <SideMenuSwitch onoff={onoff} onClick={switchEvent} />
      </div>
      <div className={classes.sidemenu_buttoncontent}>
        <SideMenuBottone
          onoff={onoff}
          label="Home"
          src="home"
          onClick={selProgetto}
          path={"/"}
          className={"sidemenubottone_contentambito"}
        />
      </div>
      {datatextanagrafica.length > 0 && (
        <SideMenuAmbito
          idAmbito={1}
          onoff={onoff}
          label="Anagrafica"
          src={datatextanagrafica[0].Ambito_Icona}
          selezionato={idAmbito}
          list={datatextanagrafica}
          onClick={selAmbito}
          onSelProgetto={selProgetto}
        />
      )}
      {datatextgestione.length > 0 && (
        <SideMenuAmbito
          idAmbito={2}
          onoff={onoff}
          label="Gestione"
          src={datatextgestione[0].Ambito_Icona}
          selezionato={idAmbito}
          list={datatextgestione}
          onClick={selAmbito}
          onSelProgetto={selProgetto}
        />
      )}
      {datatextordini.length > 0 && (
        <SideMenuAmbito
          idAmbito={3}
          onoff={onoff}
          label="Ordini"
          src={datatextordini[0].Ambito_Icona}
          selezionato={idAmbito}
          list={datatextordini}
          onClick={selAmbito}
          onSelProgetto={selProgetto}
        />
      )}
      {datatextconta.length > 0 && (
        <SideMenuAmbito
          idAmbito={4}
          onoff={onoff}
          label="Contabilità"
          src={datatextconta[0].Ambito_Icona}
          selezionato={idAmbito}
          list={datatextconta}
          onClick={selAmbito}
          onSelProgetto={selProgetto}
        />
      )}

      {datatextutilita.length > 0 && (
        <SideMenuAmbito
          idAmbito={4}
          onoff={onoff}
          label="utilita"
          src={datatextutilita[0].Ambito_Icona}
          selezionato={idAmbito}
          list={datatextutilita}
          onClick={selAmbito}
          onSelProgetto={selProgetto}
        />
      )}

      {datatextservizi.length > 0 && (
        <SideMenuAmbito
          idAmbito={5}
          onoff={onoff}
          label="Servizi"
          src={datatextservizi[0].Ambito_Icona}
          selezionato={idAmbito}
          list={datatextservizi}
          onClick={selAmbito}
          onSelProgetto={selProgetto}
        />
      )}
    </div>
  );
};

export default SideMenu;
