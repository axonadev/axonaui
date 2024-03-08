import React, { useState, useEffect } from "react";
import classes from "../style/SideMenu.module.css";
import Img from "../Img/Img";
import SideMenuBottone from "./SideMenuBottone.prv";
import SideMenuAmbito from "./SideMenuAmbito.prv";
import SideMenuSwitch from "./SideMenuSwitch.prv";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { sideMenu } from "../../../redux/SideMenuOpenSlice";

const SideMenu = ({ onSideMenuChange }) => {
  const onoff = useSelector((state) => state.sideMenu.value);
  const dispatch = useDispatch();

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

  useEffect(() => {}, [onoff]);

  return (
    <div className={stylecontent.join(" ")}>
      <div className={classes.sidemenu_top}>
        <div className={classes.sidemenu_topimg}>
          <div className={classes.sidemenu_topimgcenter}>
            <Img type='my_logo' pathImg='getlocal' />
          </div>
        </div>
        <SideMenuSwitch
          onoff={onoff}
          onClick={() => dispatch(sideMenu(onoff))}
        />
      </div>
      <div className={classes.sidemenu_buttoncontent}>
        <SideMenuBottone
          onoff={onoff}
          label='Home'
          src='faHouse'
          onClick={selProgetto}
          path={"/"}
          className={"sidemenubottone_contentambito"}
        />
      </div>
      {datatextanagrafica.length > 0 && (
        <SideMenuAmbito
          idAmbito={1}
          onoff={onoff}
          label='Anagrafica'
          src='faAddressCard'
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
          label='Gestione'
          src='faUsersCog'
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
          label='Ordini'
          src='faShoppingCart'
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
          label='Contabilità'
          src='faCalculator'
          selezionato={idAmbito}
          list={datatextconta}
          onClick={selAmbito}
          onSelProgetto={selProgetto}
        />
      )}

      {datatextutilita.length > 0 && (
        <SideMenuAmbito
          idAmbito={5}
          onoff={onoff}
          label='utilita'
          src={datatextutilita[0].Ambito_Icona}
          selezionato={idAmbito}
          list={datatextutilita}
          onClick={selAmbito}
          onSelProgetto={selProgetto}
        />
      )}

      {datatextservizi.length > 0 && (
        <SideMenuAmbito
          idAmbito={6}
          onoff={onoff}
          label='Servizi'
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
