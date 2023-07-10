import React, { useEffect, useState } from "react";
import classes from "../style/Grid.module.css";
import Row from "./Row";

import useGrid from "../../../hooks/useGrid";

import Filter from "../Filter/Filter";
import Button from "../Button/Button";

const Grid = ({
  id,
  columns,
  items,
  itemSearch,
  btn_insert,
  onDoubleClickRow,
  onClickRow,
  onBtnInsert,
}) => {
  const [rowSelected, setRowSelected] = useState(0);
  const { filterGrid, initList, filteredListItem } = useGrid();

  const onDoubleClickHandler = (IDOBJ) => {
    onDoubleClickRow(IDOBJ);
  };

  const onClickRowHandler = (IDOBJ) => {
    setRowSelected(() => {
      return IDOBJ;
    });
    onClickRow(IDOBJ);
  };

  const insertHandler = () => {
    onBtnInsert();
  };

  const contentDiv = itemSearch || btn_insert ? true : false;

  const idFilter = id ? "filter_" + id : "filter_generic";

  useEffect(() => {
    initList(items);
  }, [items]);

  return (
    <div className={classes.KGrid}>
      {contentDiv && (
        <div className={classes.filtergrid}>
          {btn_insert && (
            <Button onClick={insertHandler} className={classes.button}>
              Inserisci
            </Button>
          )}
          {itemSearch && (
            <Filter
              onFilter={filterGrid}
              itemSearch={itemSearch}
              id={idFilter}
            />
          )}
        </div>
      )}
      <Row key="INT" columns={columns} style="testata" />
      {filteredListItem !== [] &&
        filteredListItem.map((item) => {
          return (
            <Row
              items={item}
              key={item.IDOBJ}
              columns={columns}
              onClick={onClickRowHandler}
              onDoubleClick={onDoubleClickHandler}
              rowSelect={rowSelected === item.IDOBJ ? true : false}
            />
          );
        })}
    </div>
  );
};
export default Grid;
