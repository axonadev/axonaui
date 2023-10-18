import React, { useState } from "react";
import classes from "../style/Grid.module.css";

const Row = ({
  items,
  columns,
  className,
  type,
  rowSelect,
  onClick,
  onDoubleClick,
  labeltestata = true,
}) => {
  const IDOBJ = items ? items.IDOBJ : null;

  const [isRidimensiona, setIsRidimensiona] = useState(false);
  const [colPosIni, setColPosIni] = useState(0);

  const classStyle = [
    classes.row_content,
    className ? classes[className] : "",
    type ? classes["row_" + type] : "",
    rowSelect ? classes.row_rowselected : "",
  ];

  const onDoubleClickHandler = () => {
    try {
      onDoubleClick(IDOBJ, items);
    } catch (error) {}
  };
  const onClickHandler = () => {
    onClick(IDOBJ, items);
  };

  const onMouseDownRidimensionamentoRow = (evt) => {
    setIsRidimensiona(true);
    setColPosIni(evt.clientX);
  };
  const onMouseUpRidimensionamentoRow = () => {
    setIsRidimensiona(false);
    setColPosIni(0);
  };

  let hRow = 0;
  if (columns) {
    columns.map((item) => {
      try {
        let cStr = items ? items[item.ConfigGriglie_NomeCampo] : "";
        return item.order === 0
          ? 0
          : cStr.length > 30
          ? (hRow += 2)
          : (hRow += 1);
      } catch (error) {
        return item.ConfigGriglie_Ordinamento === 0 ? 0 : (hRow += 1);
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
            return item.ConfigGriglie_Ordinamento === 0 ||
              item.ConfigGriglie_Dimensione === 0 ? (
              <></>
            ) : (
              <th
                key={"l_testata_" + Math.random()}
                style={{ width: item.ConfigGriglie_Dimensione - 2 + "px" }}
                id={
                  "l_testata_" + item.ConfigGriglie_Label.replaceAll("_", " ")
                }
                onMouseUp={onMouseUpRidimensionamentoRow}
              >
                {labeltestata && item.ConfigGriglie_Label.replaceAll("_", " ")}
                <div
                  className={classes.grid_row_ridimensiona}
                  onMouseDown={onMouseDownRidimensionamentoRow}
                  onMouseMove={(evt) => {
                    if (isRidimensiona) {
                      let x = evt.clientX;
                      let diff = colPosIni - x;
                      let r = item.ConfigGriglie_Dimensione - diff;

                      document.getElementById(
                        "l_testata_" +
                          item.ConfigGriglie_Label.replaceAll("_", " ")
                      ).style.width = r + "px";
                    }
                  }}
                >
                  .
                </div>
              </th>
            );
          })}

        {columns &&
          items &&
          columns.map((item) => {
            return item.ConfigGriglie_Ordinamento === 0 ||
              item.ConfigGriglie_Dimensione === 0 ? (
              <></>
            ) : (
              <td key={"l_" + IDOBJ + "_" + Math.random()}>
                {items[item.ConfigGriglie_Label]}
              </td>
            );
          })}
      </tr>
    </React.Fragment>
  );
};
export default Row;
