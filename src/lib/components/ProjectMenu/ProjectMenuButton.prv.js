import React, { useState, useEffect } from "react";
import classes from "../style/ProjectMenu.module.css";
import ImgFont from "../Img/ImgFont";
import RightSideForm from "./RightSideForm";

const ProjectMenuButton = ({ id, idOpen, icon = "", label, children }) => {
  const [openMenu, setOpenMenu] = useState(idOpen === id ? true : false);

  useEffect(() => {
    setOpenMenu(idOpen === id ? true : false);
  }, [idOpen]);

  const onClickHandler = () => {
    setOpenMenu((prec) => !prec);
  };

  const onCloseHandler = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <div
        className={classes.projectmenubutton_item}
        onClick={onClickHandler}
        idprojectitem={id}
      >
        <div className={classes.projectmenubutton_item_label}>
          <label>{label}</label>
        </div>
        <div className={classes.projectmenubutton_item_div}>
          <div className={classes.projectmenubutton_item_img}>
            <ImgFont icon={icon} />
          </div>
        </div>
      </div>
      <RightSideForm openMenu={openMenu} onClose={onCloseHandler}>
        {children}
      </RightSideForm>
    </>
  );
};

export default ProjectMenuButton;
