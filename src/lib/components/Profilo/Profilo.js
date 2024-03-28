import React, { useState } from "react";
import ImgFont from "../Img/ImgFont";
import classes from "../style/Profilo.module.css";
import Button from "../Button/Button";
import Login from "./Login.prv";
import { useEnv } from "axonalib";
import MessageModal from "../MessageModal/MessageModal";

const Profilo = ({}) => {
  const { REACT_APP_SERVERAPI } = useEnv();

  const [isOpenLogIn, setIsOpenLogIn] = useState(false);

  const logoutHandler = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  const loginHandler = () => {
    setIsOpenLogIn((prec) => {
      return !prec;
    });
  };
  const modalOutHandler = () => {
    setIsOpenLogIn(false);
  };

  //* Imposta utenti
  const pIva = localStorage.axn_piva ? localStorage.axn_piva : "Nessuna Piva";
  const utente = localStorage.axn_nomesoggetto
    ? localStorage.axn_nomesoggetto
    : "Utente Di Esempio";
  const mail = localStorage.axn_utente
    ? localStorage.axn_utente
    : "mail.esempio.it";

  const isSviluppo = REACT_APP_SERVERAPI === "http://192.168.2.14:8811/";

  return (
    <>
      <div className={classes.profilo_content}>
        <div>
          <h2>{utente}</h2>
          <p>P.Iva: {pIva}</p>
          <p>{mail}</p>
        </div>
        <div className={classes.profilo_bottoni}>
          <div className={classes.profilo_logout}>
            <Button onClick={logoutHandler}>
              <ImgFont icon="faRightFromBracket" size="medium" />
            </Button>
          </div>
          {isSviluppo && (
            <div>
              <Button onClick={loginHandler}>
                <ImgFont icon="faRightToBracket" size="medium" />
              </Button>
            </div>
          )}
        </div>
      </div>
      {isOpenLogIn && (
        <MessageModal type="sm" onOut={modalOutHandler} buttons={[]}>
          <Login
            className={classes.profilo_login}
            urlApi={REACT_APP_SERVERAPI + "api/axo_login/"}
            onSubmit={() => {
              if (localStorage.getItem("axn_token")) {
                window.location.replace("/");
              }
            }}
          />
        </MessageModal>
      )}
    </>
  );
};

export default Profilo;
