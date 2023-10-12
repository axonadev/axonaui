import React from "react";
import Img from "../Img/Img";
import classes from "../style/Profilo.module.css";
import Button from "../Button/Button";

const Profilo = ({}) => {
  const logoutHandler = () => {
    localStorage.clear();
  };

  return (
    <div className={classes.profilo_content}>
      <div className={classes.profilo_content_img}>
        <div className={classes.profilo_immagine}>
          <Img type="profilo" pathImg="getlocal" />
        </div>
      </div>

      <div>
        <h2>Nome Profilo</h2>
        <p>P.iva</p>
        <p>nomeprofilo@mail.com</p>
      </div>
      <div className={classes.profilo_logout}>
        <Button onClick={logoutHandler}>
          <Img type="logout" pathImg="getlocal" />
        </Button>
      </div>
    </div>
  );
};

export default Profilo;
