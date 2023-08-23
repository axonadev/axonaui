import React, { useEffect, useState } from "react";
import classes from "../style/Grid.module.css";
import Row from "./Row.prv";

import useGrid from "../../hooks/useGrid";

import Filter from "../Filter/Filter";
import Button from "../Button/Button";
import Img from "../Img/Img";
import Input from "../Input/Input";

const Grid = ({
  id,
  columns,
  items = null,
  itemSearch,
  btn_insert,
  onDoubleClickRow,
  onClickRow,
  onBtnInsert,
  onBtnDelete,
  type = "t",
  nameView = "",
  loadGrid = "",
  reload = 0,
  pidobj = 0,
}) => {
  const [rowSelected, setRowSelected] = useState(0);
  const [filteredValue, setFilteredValue] = useState("");
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
  const [page, setPage] = useState(1);

  const onDoubleClickHandler = (IDOBJ, items) => {
    onDoubleClickRow(IDOBJ, items);
  };

  const onClickRowHandler = (IDOBJ, items) => {
    setRowSelected(() => {
      return IDOBJ;
    });

    onClickRow(IDOBJ, items);
  };

  const insertHandler = () => {
    localStorage.setItem("axn_form_change", "1");
    onBtnInsert(id);
  };
  const deleteHandler = () => {
    onBtnDelete(id);
  };

  const contentDiv = itemSearch || btn_insert ? true : false;

  const idFilter = id ? "filter_" + id : "filter_generic";

  const onClickHeaderHandler = (IDOBJ) => {};

  const requestGrid = {
    url: loadGrid,
    dt_filter: nameView,
    page: page,
    filteredValue: filteredValue,
    pidobj: pidobj ? pidobj : 0,
  };

  const clickFilterGrid = (valueItem, nameItem) => {
    setPage(1);
    console.log(valueItem, "valueitem");
    setFilteredValue(valueItem);
  };

  const pageBeforeHandler = () => {
    setPage((prev) => {
      return prev === 1 ? 1 : parseInt(prev) - 1;
    });
  };
  const pageAfterHandler = () => {
    setPage((prev) => {
      return parseInt(prev) + 1;
    });
  };
  const onChangePage = (evt) => {
    if (!isNaN(evt.target.value)) {
      if (evt.target.value === "") {
        setPage(1);
      } else {
        setPage(evt.target.value);
      }
    }
  };

  useEffect(() => {
    loadGridint(requestGrid);
  }, [reload, page, filteredValue, pidobj]);

  /* useEffect(() => {
    try {
      if(id==="main_t")
      onClickRow(filteredListItem[0].IDOBJ);
    } catch (error) {}
  }, [filteredListItem]); */

  return (
    <>
      <div className={styles.join(" ")}>
        {contentDiv && (
          <div className={classes.grid_filtergrid}>
            <div className={classes.grid_filtergridleft}>
              {btn_insert && (
                <div className={classes.grid_buttonoperation}>
                  <Button
                    onClick={insertHandler}
                    className={classes.grid_button}
                    type="sm"
                  >
                    <Img type="add" pathImg="getlocal" />
                  </Button>
                  <Button
                    onClick={deleteHandler}
                    className={classes.grid_button}
                    type="sm"
                  >
                    <Img type="delete" pathImg="getlocal" />
                  </Button>
                </div>
              )}
            </div>
            <div className={classes.grid_filtergridright}>
              <div className={classes.grid_pagecontrols}>
                <Input
                  label=""
                  id="Grid_Pagination"
                  className={classes.grid_inputpage}
                  nameList="v_pagina"
                  value={page}
                  onChange={onChangePage}
                  icon="right"
                  onIconClick={pageAfterHandler}
                  preIcon="left"
                  onPreIconClick={pageBeforeHandler}
                />
              </div>

              {itemSearch && (
                <Filter
                  onFilter={clickFilterGrid}
                  itemSearch={
                    itemSearch === null || itemSearch === undefined
                      ? itemsearchint
                      : itemSearch
                  }
                  id={idFilter}
                />
              )}
            </div>
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
    </>
  );
};
export default Grid;
