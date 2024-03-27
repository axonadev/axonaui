import React, { useEffect, useState } from "react";
import classes from "../style/ProjectMenu.module.css";

const RightSideForm = ({ children, openMenu, onClose }) => {
  const styled = [
    classes.projectmenu_sideoperation,
    openMenu
      ? classes.projectmenu_sideoperation_open
      : classes.projectmenu_sideoperation_close,
  ];

  const [isOpen, setIsOpen] = useState(false);

  const onMouseEnterHandler = () => {
    setTimeout(() => {
      setIsOpen(true);
    }, "1000");
  };

  const onMouseLeaveHandler = () => {
    if (isOpen) {
      onClose(false);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    onMouseEnterHandler();
    console.log(openMenu);
  }, [openMenu]);

  return (
    <div
      className={styled.join(" ")}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className={classes.projectmenu_sideoperation_content}>
        <div className={classes.projectmenu_sideoperation_top_x}></div>
        {/* CHILDREN */}
        <div className={classes.projectmenu_children_content}>{children}</div>
      </div>
    </div>
  );
};

export default RightSideForm;
