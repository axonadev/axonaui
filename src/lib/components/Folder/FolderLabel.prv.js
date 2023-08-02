import React from "react";
import classes from "../style/Folder.module.css";
const FolderLabel = ({ target, children, onClick }) => {
  const onClickHandler = () => {
    onClick(target);
  };
  return (
    <React.Fragment>
      <div className={classes.folderlabel} onClick={onClickHandler}>
        <label>{children}</label>
      </div>
    </React.Fragment>
  );
};
export default FolderLabel;
