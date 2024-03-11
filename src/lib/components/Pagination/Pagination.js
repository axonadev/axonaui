import React from "react";
import classes from "../style/Pagination.module.css";
import ImgFont from "../Img/ImgFont";
const Pagination = ({
  id,
  page,
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
        <ImgFont icon={"faCaretLeft"} size='medium' />
      </div>
      <input
        className={classes.paginationInput}
        type='numeric'
        value={page}
        onChange={onChangeHandler}
      />
      <div
        className={classes.pagination_righticon}
        onClick={onRightIconClickHandler}
      >
        <ImgFont icon={"faCaretRight"} size='medium' />
      </div>
    </div>
  );
};
export default Pagination;
