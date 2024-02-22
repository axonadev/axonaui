import React from "react";
import classes from "../style/Pagination.module.css";
import Img from "../Img/Img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCaretRight,
  faSquareCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
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
      <FontAwesomeIcon
        className={classes.pagination_lefticon}
        onClick={onLeftIconClickHandler}
        icon={faSquareCaretLeft}
      />
      {/* <Img type={leftIcon} pathImg='getlocal' /> */}
      <input
        className={classes.paginationInput}
        type='numeric'
        value={page}
        onChange={onChangeHandler}
      />
      <FontAwesomeIcon
        icon={faSquareCaretRight}
        className={classes.pagination_righticon}
        onClick={onRightIconClickHandler}
      />
      {/* <Img type={rightIcon} pathImg='getlocal' /> */}
    </div>
  );
};
export default Pagination;
