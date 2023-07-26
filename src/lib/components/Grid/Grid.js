import React, { useEffect, useState } from "react";
import classes from "../style/Grid.module.css";
import Row from "./Row.prv";

import useGrid from "../../hooks/useGrid";

import Filter from "../Filter/Filter";
import Button from "../Button/Button";
import Img from "../Img/Img";

const Grid = ({
  id,
  columns,
  stato,
  items = null,
  itemSearch,
  btn_insert,
  onDoubleClickRow,
  onClickRow,
  onBtnInsert,
  type = "t",
  nameView = "",
  loadGrid = "",
}) => {
  const [rowSelected, setRowSelected] = useState(0);
  const {
    filterGrid,
    initList,
    filteredListItem,
    loadGrid: loadGridint,
    IsLoading,
    columns: columnsint,
    itemsearch: itemsearchint,
  } = useGrid();

  const styles = [classes.grid_content, classes["grid_type_" + type]];

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
    onBtnInsert(id);
  };

  const contentDiv = itemSearch || btn_insert ? true : false;

  const idFilter = id ? "filter_" + id : "filter_generic";

  const onClickHeaderHandler = (IDOBJ) => {
    console.log(IDOBJ);
  };

  const requestGrid = {
    url: loadGrid,
    dt_filter: nameView,
  };

  useEffect(() => {
    loadGridint(requestGrid);
  }, []);

  /* useEffect(() => {
    try {
      if(id==="main_t")
      onClickRow(filteredListItem[0].IDOBJ);
    } catch (error) {}
  }, [filteredListItem]); */

  console.log(
    columns === undefined || columns === null ? true : false,
    "columns1"
  );

  return (
    <div className={styles.join(" ")}>
      {contentDiv && (
        <div className={classes.grid_filtergrid}>
          {btn_insert && (
            <Button
              onClick={insertHandler}
              className={classes.grid_button}
              type="sm"
            >
              <Img type="add" />
            </Button>
          )}

          {stato && <label className={classes.grid_labelstato}>{stato}</label>}

          {itemSearch && (
            <Filter
              onFilter={filterGrid}
              itemSearch={
                itemSearch === null || itemSearch === undefined
                  ? itemsearchint
                  : itemSearch
              }
              id={idFilter}
            />
          )}
        </div>
      )}
      <div className={classes.grid_table_content}>
        <table className={classes.grid_table} id={id}>
          <Row
            key="INT"
            columns={
              columns === undefined || columns === null ? columnsint : columns
            }
            type="testata"
            onClick={onClickHeaderHandler}
            onDoubleClick={() => {}}
          />
          {filteredListItem &&
            filteredListItem.map((item) => {
              return (
                <Row
                  items={item}
                  key={item.IDOBJ}
                  columns={
                    columns === undefined || columns === null
                      ? columnsint
                      : columns
                  }
                  onClick={onClickRowHandler}
                  onDoubleClick={onDoubleClickHandler}
                  rowSelect={rowSelected === item.IDOBJ ? true : false}
                />
              );
            })}
        </table>
      </div>
    </div>
  );
};
export default Grid;
