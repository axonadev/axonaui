import React from "react";
import classes from "../style/ProjectMenu.module.css";
import Img from "../Img/Img";
import ImgFont from "../Img/ImgFont";
const ProjectMenuButton = ({
  id,
  img,
  icon = "",
  label,
  gofunction,
  onClick,
}) => {
  const onClickHandler = () => {
    gofunction();
    onClick(id);
  };
  return (
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
  );
};

export default ProjectMenuButton;
