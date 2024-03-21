import React, { useRef } from "react";
import Input from "../Input/Input";
import classes from "../style/Filter.module.css";
import ImgFont from "../Img/ImgFont";
const Filter = ({ id, itemSearch, onFilter }) => {
  const inputRef = useRef(null);
  const clickSearchHandler = () => {
    // alert("ciccioPanzer");
    const valFilter = inputRef.current.value;
    onFilter(valFilter, itemSearch);
  };

  const idFilter = id ? id : "idFilter";

  return (
    <React.Fragment>
      <ImgFont
        className={classes.icona}
        size='medium'
        icon={"faMagnifyingGlass"}
        onClick={clickSearchHandler}
        cursor={true}
      />
      <div className={classes.iconContainer}>
        <Input className={classes.filter_search} id={idFilter} ref={inputRef} />
      </div>
    </React.Fragment>
  );
};

export default Filter;
