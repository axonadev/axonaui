import React from "react";
const FolderLabel = ({ target, children, onClick}) => {

  const onClickHandler =()=>{
    onClick(target);
  }
  return (
    <React.Fragment>
      <a href={"#"+target} onClick={onClickHandler}>
        <label>{children}</label>
      </a>
    </React.Fragment>
  );
};
export default FolderLabel;
