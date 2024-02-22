import React, { useState } from "react";
import classes from "../style/Folder.module.css";
import ImgFont from "../Img/ImgFont";
const FolderLabel = ({ target, children, onClick, img }) => {
  const [isShown, setIsShown] = useState(false);
  const onClickHandler = () => {
    onClick(target);
  };
  return (
    <React.Fragment>
      {isShown && (
        <div className={classes.fumetto}>
          <div>{children}</div>
        </div>
      )}
      <div
        className={classes.folderlabel}
        onClick={onClickHandler}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <ImgFont icon={img} pathImg='getlocal' />
      </div>
    </React.Fragment>
  );
};
export default FolderLabel;
