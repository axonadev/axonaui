import React from "react";
import Img from "../Img/Img";
import Input from "../Input/Input";
import Button from "../Button/Button";
import classes from "../style/Filter.module.css";

const Filter = ({ id, itemSearch, onFilter }) => {
  const clickSearchHandler = () => {
    const valFilter = document.getElementById(id).value;
    onFilter(valFilter, itemSearch);
  };

  const idFilter = id ? id : "idFilter";

  return (
    <React.Fragment>
      <Input className={classes.filter_search} id={idFilter}></Input>
      <Button onClick={clickSearchHandler} className={classes.filter_button}>
        <Img type="find" className={classes.filter_search_img}></Img>
      </Button>
    </React.Fragment>
  );
};

export default Filter;
