import React, { useState } from "react";
import classes from "../style/ProjectMenu.module.css";
import Button from "../Button/Button";
import ImgFont from "../Img/ImgFont";
import Profilo from "../Profilo/Profilo";

const ProjectMenu = ({ children, onHelp }) => {
  const [openProfilo, setOpenProfilo] = useState(false);
  // const [isHelp, setIsHelp] = useState(true);

  const profiloClick = () => {
    setOpenProfilo((prec) => {
      return !prec;
    });
  };

  // const onHelpHandler = () => {
  //   setIsHelp((prec) => {
  //     onHelp(!prec);
  //     return !prec;
  //   });
  // };

  return (
    <>
      {openProfilo && <Profilo />}
      <aside className={classes.projectmenu_content}>
        <div>
          <div className={classes.projectmenu_profilo}>
            <Button onClick={profiloClick}>
              <ImgFont icon='faUser' size='medium' />
            </Button>
          </div>
          {children}
        </div>

        <div>
          {/* BOTTONE HELP */}
          {/* <div className={classes.projectmenu_help}>
            <Button onClick={onHelpHandler}>
              <ImgFont icon="faQuestion" size="medium" />
            </Button>
          </div> */}
        </div>
      </aside>
    </>
  );
};

export default ProjectMenu;
