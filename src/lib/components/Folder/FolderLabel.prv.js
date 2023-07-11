import React from "react";
const FolderLabel = ({ onClick, target, children }) => {
  const clickHandler = () => {
    onClick(target);
  };

  return (
    <React.Fragment>
      <div onClick={clickHandler}>
        <label>{children}</label>
      </div>
    </React.Fragment>
  );
};
export default FolderLabel;
