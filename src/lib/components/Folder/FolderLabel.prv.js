import React from "react";
import classes from "../style/Folder.module.css";
import ImgFont from "../Img/ImgFont";
const FolderLabel = ({ target, children, onClick, img }) => {
  const onClickHandler = () => {
    onClick(target);
  };
  return (
    <React.Fragment>
      <div className={classes.folderlabel} onClick={onClickHandler}>
        <ImgFont icon={img} pathImg='getlocal' />
        <label>{children}</label>
      </div>
    </React.Fragment>
  );
};
export default FolderLabel;
