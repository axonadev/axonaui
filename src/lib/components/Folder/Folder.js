import React from "react";
import FolderLabel from "./FolderLabel.prv";
import classes from "../style/Folder.module.css";
const Folder = ({ onClick, items, children }) => {
  const clickHandler = (target) => {
    onClick(target);
  };

  return (
    <React.Fragment>
      <div class={classes.contentfolder}>
        {items &&
          items.map((item) => {
            return (
              <FolderLabel
                key={item.key}
                onClick={clickHandler}
                target={item.target}
              >
                {item.label}
              </FolderLabel>
            );
          })}
      </div>
      <div>{children}</div>
    </React.Fragment>
  );
};
export default Folder;
