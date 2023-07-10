import React from "react";
import classes from "../style/Row.module.css";

const Row = ({ items, columns, onClick, onDoubleClick }) => {
  const IDOBJ = items ? items.IDOBJ : null;

  const classStyle = [
    classes.KRow,
    props.className ? classes[props.className] : "",
    props.style ? classes[props.style] : "",
    props.rowSelect ? classes.rowselected : "",
  ];

  const onDoubleClickHandler = () => {
    onDoubleClick(IDOBJ);
  };
  const onClickHandler = () => {
    onClick(IDOBJ);
  };

  let hRow = 0;
  columns.map((item) => {
    try {
      let cStr = items ? items[item.dbField] : "";
      return item.order === 0
        ? 0
        : cStr.length > 30
        ? (hRow += 2)
        : (hRow += 1);
    } catch (error) {
      return item.order === 0 ? 0 : (hRow += 1);
    }
  });
  return (
    <React.Fragment>
      <div
        className={classStyle.join(" ")}
        onDoubleClick={onDoubleClickHandler}
        onClick={onClickHandler}
        idobj={IDOBJ}
      >
        {columns &&
          columns.map((item) => {
            return item.order === 0 ? (
              <></>
            ) : (
              <label key={"l_" + IDOBJ + "_" + Math.random()}>
                {items ? items[item.dbField] : item.Label}
              </label>
            );
          })}
      </div>
    </React.Fragment>
  );
};
export default Row;
