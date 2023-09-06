import React, { useEffect, useState } from "react";
import classes from "../style/Grid.module.css";
import Row from "./Row.prv";

import useGrid from "../../hooks/useGrid";
import useForm from "../../hooks/useForm";
import Filter from "../Filter/Filter";
import Button from "../Button/Button";
import Img from "../Img/Img";
import Input from "../Input/Input";
import MessageModal from "../MessageModal/MessageModal";
import Form from "../Form/Form";
import FrameContainer from "../Frame/FrameContainer";
import FrameInRow from "../Frame/FrameInRow";

import { useEnv } from "axonalib";

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
  formTitle = "",
  dbForm = "",
  children,
}) => {
  const { REACT_APP_SERVERAPI } = useEnv();
  const { onChangeSelected, onReset, onChangeForm } = useForm(
    "form_" + id,
    REACT_APP_SERVERAPI +
      "api/axo_sel/" +
      localStorage.getItem("axn_token") +
      "/general/general/leggirow/" +
      dbForm +
      "_f_",
    dbForm
  );

  const [rowSelected, setRowSelected] = useState(0);
  const [filteredValue, setFilteredValue] = useState("");
  const isFormInsert = children ? true : false;
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(0);
  const [isReloaded, setIsReloaded] = useState(0);
  const [isDelete, setIsDelete] = useState(0);

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
    try {
      modificaHandler(IDOBJ);
    } catch (error) {}

    try {
      onDoubleClickRow(IDOBJ, items);
    } catch (error) {}
    onChangeSelected(IDOBJ);
  };

  const onClickRowHandler = (IDOBJ, items) => {
    setRowSelected(() => {
      return IDOBJ;
    });
    onClickRow(IDOBJ, items);
  };

  const insertHandler = () => {
    localStorage.setItem("axn_form_change", "1");
    if (isFormInsert) {
      setRowSelected(0);
      onChangeSelected(-1);
      setIsOpenInsert(true);
    } else {
      onBtnInsert(id);
    }
  };

  const modificaHandler = (IDOBJ) => {
    if (isFormInsert) {
      onChangeSelected(IDOBJ);
      setIsOpenInsert(true);
    }
  };

  const deleteHandler = () => {
    if (isFormInsert) {
      setIsDelete(id);
    } else {
      onBtnDelete(id);
    }
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
  const onSavehandler = () => {
    //document.getElementById("b_submit_form_" + id).click();
    // document.getElementById("form_" + id).submit();
    setIsFormSubmit((prev) => {
      return prev + 1;
    });
  };
  const onStophandler = () => {
    setIsOpenInsert(false);
  };
  const onSaveformhandler = () => {
    setIsReloaded((prev) => {
      return prev + 1;
    });
    setIsOpenInsert(false);
    setIsFormSubmit(0);
  };
  const onStopformhandler = () => {
    setIsOpenInsert(false);
  };
  useEffect(() => {
    loadGridint(requestGrid);
  }, [reload, page, filteredValue, pidobj, isReloaded]);

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
      {isOpenInsert && (
        <MessageModal
          onOut={onStophandler}
          title={formTitle}
          message=""
          buttons={[
            {
              key: 1,
              label: "Annulla",
              type: "stop",
              onClick: onStophandler,
            },
            {
              key: 2,
              label: "Salva",
              type: "run",
              onClick: onSavehandler,
            },
          ]}
        >
          <Form
            id={"form_" + id}
            idobj={rowSelected}
            modulo="general"
            db={dbForm}
            serverApi={REACT_APP_SERVERAPI}
            afterSubmit={onSaveformhandler}
            onAnnulla={onStopformhandler}
            deleteid={isDelete}
            isFormSubmit={isFormSubmit}
          >
            <FrameContainer>
              <FrameInRow width={["20 hidden", "20 hidden", "20 hidden"]}>
                <Input
                  label="IDOBJ"
                  id="IDOBJ"
                  value={rowSelected}
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="PIDOBJ"
                  id="PIDOBJ"
                  value={pidobj}
                  onChangeValue={onChangeForm}
                />
              </FrameInRow>
              <>
                {children.length > 1 &&
                  children.map((item) => {
                    return React.cloneElement(item, {
                      form_id: "form_" + id,
                      onChangeValue: onChangeForm,
                    });
                  })}
                {children.length === undefined &&
                  React.cloneElement(children, {
                    form_id: "form_" + id,
                    onChangeValue: onChangeForm,
                  })}
              </>
            </FrameContainer>
          </Form>
        </MessageModal>
      )}
    </>
  );
};
export default Grid;
