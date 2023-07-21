import React, { useState } from "react";
import ProjectMenuButton from "./ProjectMenuButton.prv";
import classes from "../style/ProjectMenu.module.css";
const ProjectMenu = ({ items, onClick }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const onClickHandler = (idprogectitem) => {
    setOpenMenu(true);
    onClick(idprogectitem);
  };

  const styled = [
    classes.projectmenu_sideoperation,
    openMenu
      ? classes.projectmenu_sideoperation_open
      : classes.projectmenu_sideoperation_close,
  ];
  return (
    <aside className={classes.projectmenu_content}>
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
        <div className={classes.projectmenu_sideoperation_content}></div>
      </div>
    </aside>
  );
};

export default ProjectMenu;
