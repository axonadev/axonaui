import React, { Children, useState } from "react";
import ProjectMenuButton from "./ProjectMenuButton.prv";
import classes from "../style/ProjectMenu.module.css";
import Button from "../Button/Button";
import ImgFont from "../Img/ImgFont";
import Profilo from "../Profilo/Profilo";
const ProjectMenu = ({
  items,
  onClick,
  title,
  children,
  onRequestSubmit,
  versione,
  onHelp,
}) => {
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
    setOpenProfilo((prec) => {
      return !prec;
    });
  };

  const onHelpHandler = () => {
    setIsHelp((prec) => {
      onHelp(!prec);
      return !prec;
    });
  };

  return (
    <>
      {openProfilo && <Profilo />}
      <aside className={classes.projectmenu_content}>
        <div>
          <div className={classes.projectmenu_profilo}>
            <Button onClick={profiloClick}>
              <ImgFont icon='faUser' />
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
                    icon={item.img}
                    label={item.label}
                    gofunction={item.function}
                    onClick={onClickHandler}
                  />
                );
              })}
          </div>
          <div className={styled.join(" ")}>
            <div className={classes.projectmenu_sideoperation_content}>
              <form className={classes.sideForm} onSubmit={onClickFormHandler}>
                <div className={classes.projectmenu_sideoperation_top}>
                  <div className={classes.projectmenu_sideoperation_top_title}>
                    {title}
                  </div>
                  <div
                    className={classes.projectmenu_sideoperation_top_x}
                    onClick={() => {
                      setOpenMenu(false);
                    }}
                  >
                    <ImgFont icon='faXmark' />
                  </div>
                </div>
                <div className={classes.projectmenu_children_content}>
                  {children}
                </div>

                <div>
                  <Button type='submit'>Avanti</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <div className={classes.projectmenu_help}>
            <Button onClick={onHelpHandler}>
              <ImgFont icon='faQuestion' />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ProjectMenu;
