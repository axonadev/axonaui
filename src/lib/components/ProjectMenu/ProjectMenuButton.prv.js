import React from "react";
import classes from "../style/ProjectMenu.module.css";
import Img from "../Img/Img";
const ProjectMenuButton = ({ img, label, gofunction, pathImg = "" }) => {
  return (
    <div className={classes.projectmenubutton_item} onClick={gofunction}>
      <div className={classes.projectmenubutton_item_label}>
        <label>{label}</label>
      </div>
      <div className={classes.projectmenubutton_item_div}>
        <div className={classes.projectmenubutton_item_img}>
          <Img type={img} pathImg={pathImg} />
        </div>
      </div>
    </div>
  );
};

export default ProjectMenuButton;
