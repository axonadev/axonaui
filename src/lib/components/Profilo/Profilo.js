import React from "react";
import Img from "../Img/Img";
import ImgFont from "../Img/ImgFont";
import classes from "../style/Profilo.module.css";
import Button from "../Button/Button";

const Profilo = ({}) => {
  const logoutHandler = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  return (
    <div className={classes.profilo_content}>
      <div>
        <h2>Nome Profilo</h2>
        <p>P.iva</p>
        <p>nomeprofilo@mail.com</p>
      </div>
      <div className={classes.profilo_logout}>
        <Button onClick={logoutHandler}>
          <ImgFont icon="faRightFromBracket" />
        </Button>
      </div>
    </div>
  );
};

export default Profilo;
