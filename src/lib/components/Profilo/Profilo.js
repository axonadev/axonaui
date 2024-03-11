import React from "react";
import ImgFont from "../Img/ImgFont";
import classes from "../style/Profilo.module.css";
import Button from "../Button/Button";

const Profilo = ({}) => {
  const logoutHandler = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  //* Imposta utenti
  const pIva = localStorage.axn_piva ? localStorage.axn_piva : "Nessuna Piva";
  const utente = localStorage.axn_utente
    ? localStorage.axn_utente
    : "Utente Di Esempio";
  const mail = localStorage.axn_mail
    ? localStorage.axn_mail
    : "mail.esempio.it";

  return (
    <div className={classes.profilo_content}>
      <div>
        <h2>{utente}</h2>
        <p>P.Iva: {pIva}</p>
        <p>{mail}</p>
      </div>
      <div className={classes.profilo_logout}>
        <Button onClick={logoutHandler}>
          <ImgFont icon='faRightFromBracket' size='medium' />
        </Button>
      </div>
    </div>
  );
};

export default Profilo;
