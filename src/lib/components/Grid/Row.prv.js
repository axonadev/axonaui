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
      <tr
        className={classStyle.join(" ")}
        onDoubleClick={onDoubleClickHandler}
        onClick={onClickHandler}
        idobj={IDOBJ}
      >
        {columns &&
          !items &&
          columns.map((item) => {
            return item.order === 0 ? (
              <></>
            ) : (
              <th key={"l_testata_" + Math.random()}>{item.label}</th>
            );
          })}

        {columns &&
          items &&
          columns.map((item) => {
            return item.order === 0 ? (
              <></>
            ) : (
              <td key={"l_" + IDOBJ + "_" + Math.random()}>
                {items[item.dbField]}
              </td>
            );
          })}
      </tr>
    </React.Fragment>
  );
};
export default Row;
