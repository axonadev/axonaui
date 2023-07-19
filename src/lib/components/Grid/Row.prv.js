import React from "react";
import classes from "../style/Grid.module.css";

const Row = ({
  items,
  columns,
  className,
  type,
  rowSelect,
  onClick,
  onDoubleClick,
}) => {
  const IDOBJ = items ? items.IDOBJ : null;

  const classStyle = [
    classes.row_content,
    className ? classes[className] : "",
    type ? classes["row_" + type] : "",
    rowSelect ? classes.row_rowselected : "",
  ];

  const onDoubleClickHandler = () => {
    onDoubleClick(IDOBJ);
  };
  const onClickHandler = () => {
    onClick(IDOBJ);
  };

  let hRow = 0;
  if (columns) {
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
  }
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
              <label
                key={"l_" + (IDOBJ ? IDOBJ : "TESTA") + "_" + Math.random()}
              >
                {items ? items[item.dbField] : item.label}
              </label>
            );
          })}
      </div>
    </React.Fragment>
  );
};
export default Row;
