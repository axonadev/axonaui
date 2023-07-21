import React from "react";
import ProjectMenuButton from "./ProjectMenuButton.prv";
import classes from "../style/ProjectMenu.module.css";
const ProjectMenu = ({ items }) => {
  return (
    <div className={classes.projectmenu_content}>
      {items &&
        items.map((item) => {
          return (
            <ProjectMenuButton
              img={item.img}
              label={item.label}
              gofunction={item.function}
            />
          );
        })}
    </div>
  );
};

export default ProjectMenu;
