import React from "react";
import classes from "../style/ProjectMenu.module.css";
import ImgFont from "../Img/ImgFont";

const RightSideForm = ({ children, openMenu, onClose }) => {
  const styled = [
    classes.projectmenu_sideoperation,
    openMenu
      ? classes.projectmenu_sideoperation_open
      : classes.projectmenu_sideoperation_close,
  ];

  const closeMenuHandler = () => {
    onClose(false);
  };

  return (
    <div className={styled.join(" ")}>
      <div className={classes.projectmenu_sideoperation_content}>
        <div
          className={classes.projectmenu_sideoperation_top_x}
          onClick={closeMenuHandler}
        >
          <ImgFont icon="faXmark" size="medium" />
        </div>
        {/* CHILDREN */}
        <div className={classes.projectmenu_children_content}>{children}</div>
      </div>
    </div>
  );
};

export default RightSideForm;
