import React from "react";
import Input from "../Input/Input";
import classes from "../style/Filter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
const Filter = ({ id, itemSearch, onFilter }) => {
  const clickSearchHandler = () => {
    const valFilter = document.getElementById(id).value;
    onFilter(valFilter, itemSearch);
  };

  const idFilter = id ? id : "idFilter";

  return (
    <React.Fragment>
      <div className={classes.iconContainer}>
        <Input
          className={classes.filter_search}
          id={idFilter}
          // icon='find'
          onIconClick={clickSearchHandler}
        ></Input>
        <FontAwesomeIcon className={classes.icona} icon={faMagnifyingGlass} />
      </div>
    </React.Fragment>
  );
};

export default Filter;
