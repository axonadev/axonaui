import React from "react";
import classes from "../style/Folder.module.css";
import Img from "../Img/Img";
const FolderLabel = ({ target, children, onClick, img }) => {
  const onClickHandler = () => {
    onClick(target);
  };
  return (
    <React.Fragment>
      <div className={classes.folderlabel} onClick={onClickHandler}>
        <Img type={img} pathImg="getlocal" />
        <label>{children}</label>
      </div>
    </React.Fragment>
  );
};
export default FolderLabel;
