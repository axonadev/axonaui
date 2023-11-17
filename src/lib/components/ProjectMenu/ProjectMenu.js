import React, { Children, useState } from "react";
import ProjectMenuButton from "./ProjectMenuButton.prv";
import classes from "../style/ProjectMenu.module.css";
import Button from "../Button/Button";
import Img from "../Img/Img";
import Profilo from "../Profilo/Profilo";
const ProjectMenu = ({ items, onClick, children, onRequestSubmit, versione, onHelp }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const [openProfilo, setOpenProfilo] = useState(false);
  const [isHelp, setIsHelp] = useState(true);

  const onClickHandler = (idprogectitem) => {
    setOpenMenu(true);
    onClick(idprogectitem);
  };

  const onClickFormHandler = (evt) => {
    evt.preventDefault();

    onRequestSubmit(evt);
    setOpenMenu(false);
  };

  const styled = [
    classes.projectmenu_sideoperation,
    openMenu
      ? classes.projectmenu_sideoperation_open
      : classes.projectmenu_sideoperation_close,
  ];

  const profiloClick = () => {
    console.log("hai cliccato profilo");
    setOpenProfilo((prec)=>{return !prec});
  }

  const onHelpHandler =()=>{
    setIsHelp((prec)=>{
      onHelp(!prec);
      return !prec;
    });
   
  }

  return (
    <>
    {openProfilo && <Profilo />}
    <aside className={classes.projectmenu_content}>
             <div>
        <div className={classes.projectmenu_profilo}>
          <Button onClick={profiloClick}>
         
          <Img
         
          type="profilo"
          pathImg="getlocal"
          />
        </Button>
        </div>
      <div className={classes.projectmenu_items}>
        {items &&
          items.map((item) => {
            return (
              <ProjectMenuButton
                key={item.id}
                id={item.id}
                img={item.img}
                label={item.label}
                gofunction={item.function}
                onClick={onClickHandler}
              />
            );
          })}
      </div>
      <div className={styled.join(" ")}>
        <div className={classes.projectmenu_sideoperation_top}>
          <label>Titlee</label>
          <div
            className={classes.projectmenu_sideoperation_top_x}
            onClick={() => {
              setOpenMenu(false);
            }}
          >
            X
          </div>
        </div>
        <div className={classes.projectmenu_sideoperation_content}>
          <form onSubmit={onClickFormHandler}>
            {children}

            <div>
              <Button type="submit">Avanti</Button>
            </div>
          </form>
        </div>
   
      </div>
      </div>
    <div>
    
    <div className={classes.projectmenu_help} >
      <Button onClick={onHelpHandler}>?</Button>
    </div>
      <label>{versione}</label>
      
      </div>
    </aside>

    </>
  );
  
};

export default ProjectMenu;
