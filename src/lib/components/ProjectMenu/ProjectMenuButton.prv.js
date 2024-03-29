import React, { useEffect } from "react";
import classes from "../style/ProjectMenu.module.css";
import ImgFont from "../Img/ImgFont";
import RightSideForm from "./RightSideForm";

const ProjectMenuButton = ({
  id,
  idOpen,
  icon = "",
  label,
  children,
  onOpen,
  onClose,
  notify = false,
  notifyAmount = 0,
}) => {
  const openMenu = idOpen === id ? true : false;
  useEffect(() => {}, [idOpen, openMenu]);

  const onClickHandler = () => {
    if (idOpen === id) {
      onClose();
    } else {
      onOpen(id);
    }
  };

  const onCloseHandler = () => {
    onClose();
  };

  return (
    <>
      {/* Bottone */}
      <div
        className={classes.projectmenubutton_item}
        onClick={onClickHandler}
        idprojectitem={id}
      >
        {/* Testo Bottone */}
        <div className={classes.projectmenubutton_item_label}>
          <label>{label}</label>
        </div>

        {/* Icona */}
        <div className={classes.projectmenubutton_item_div}>
          {notify && notifyAmount > 0 && (
            <div className={classes.notifica}>{notifyAmount}</div>
          )}
          <div className={classes.projectmenubutton_item_img}>
            <ImgFont icon={icon} size='medium' />
          </div>
        </div>
      </div>

      {/* Componente che viene attivato */}
      <RightSideForm openMenu={openMenu} onClose={onCloseHandler}>
        {children}
      </RightSideForm>
    </>
  );
};

export default ProjectMenuButton;
