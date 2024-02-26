import React from "react";
import classes from "../style/Pagination.module.css";
import Img from "../Img/Img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
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
        <FontAwesomeIcon icon={faCaretLeft} />
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
        <FontAwesomeIcon icon={faCaretRight} />
      </div>
    </div>
  );
};
export default Pagination;
