import React from "react";
import Input from "../Input/Input";
import classes from "../style/Filter.module.css";

const Filter = ({ id, itemSearch, onFilter }) => {
  const clickSearchHandler = () => {
    const valFilter = document.getElementById(id).value;
    onFilter(valFilter, itemSearch);
  };

  const idFilter = id ? id : "idFilter";

  return (
    <React.Fragment>
      <Input
        className={classes.filter_search}
        id={idFilter}
        icon="find"
        onIconClick={clickSearchHandler}
      ></Input>
    </React.Fragment>
  );
};

export default Filter;
