import React from "react";
import Input from "../Input/Input";
import classes from "../style/Filter.module.css";
import ImgFont from "../Img/ImgFont";
const Filter = ({ id, itemSearch, onFilter }) => {
  const clickSearchHandler = () => {
    const valFilter = document.getElementById(id).value;
    onFilter(valFilter, itemSearch);
  };

  const idFilter = id ? id : "idFilter";

  return (
    <React.Fragment>
      <ImgFont
        className={classes.icona}
        size='medium'
        icon={"faMagnifyingGlass"}
      />
      <div className={classes.iconContainer}>
        <Input
          className={classes.filter_search}
          id={idFilter}
          onIconClick={clickSearchHandler}
        ></Input>
      </div>
    </React.Fragment>
  );
};

export default Filter;
