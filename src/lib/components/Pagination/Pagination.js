import React from "react";
import classes from "../style/Pagination.module.css";
import Img from "../Img/Img";

const Pagination = ({
  id,
  page,
  leftIcon,
  rightIcon,
  onChange,
  onLeftIconClick,
  onRightIconClick,
}) => {
  const onLeftIconClickHandler = () => {
    onLeftIconClick();
  };
  const onRightIconClickHandler = () => {
    onRightIconClick();
  };
  const onChangeHandler = () => {
    onChange();
  };

  return (
    <div id={id} className={classes.pagination_content}>
      <div
        className={classes.pagination_lefticon}
        onClick={onLeftIconClickHandler}
      >
        <Img type={leftIcon} pathImg="getlocal" />
      </div>
      <input type="numeric" value={page} onChange={onChangeHandler}></input>
      <div
        className={classes.pagination_righticon}
        onClick={onRightIconClickHandler}
      >
        <Img type={rightIcon} pathImg="getlocal" />
      </div>
    </div>
  );
};
export default Pagination;
