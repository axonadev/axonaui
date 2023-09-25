import React, { Children, useState } from "react";
import ProjectMenuButton from "./ProjectMenuButton.prv";
import classes from "../style/ProjectMenu.module.css";
import Button from "../Button/Button";
const ProjectMenu = ({ items, onClick, children, onRequestSubmit, versione }) => {
  const [openMenu, setOpenMenu] = useState(false);

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
  return (
    <aside className={classes.projectmenu_content}>
      <div>
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
          <label>Title</label>
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
    
      <label>{versione}</label>
      
      </div>
    </aside>


  );
};

export default ProjectMenu;
