import React from "react";
import classes from "../style/ProjectMenu.module.css";

const RightSideForm = ({ children, openMenu, onClose }) => {
  const styled = [
    classes.projectmenu_sideoperation,
    openMenu
      ? classes.projectmenu_sideoperation_open
      : classes.projectmenu_sideoperation_close,
  ];

  const closeOnLeave = () => {
    setTimeout(() => {
      onClose(false);
    }, 1500);
  };

  return (
    <div className={styled.join(" ")} onMouseLeave={closeOnLeave}>
      <div className={classes.projectmenu_sideoperation_content}>
        <div className={classes.projectmenu_sideoperation_top_x}></div>
        {/* CHILDREN */}
        <div className={classes.projectmenu_children_content}>{children}</div>
      </div>
    </div>
  );
};

export default RightSideForm;
