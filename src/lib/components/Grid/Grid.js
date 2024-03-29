import React, { useEffect, useState } from "react";
import classes from "../style/Grid.module.css";
import Row from "./Row.prv";
import ImgFont from "../Img/ImgFont";
import useGrid from "../../hooks/useGrid";
import useForm from "../../hooks/useForm";
import Filter from "../Filter/Filter";
import Button from "../Button/Button";
import Input from "../Input/Input";
import MessageModal from "../MessageModal/MessageModal";
import Form from "../Form/Form";
import FrameContainer from "../Frame/FrameContainer";
import FrameInRow from "../Frame/FrameInRow";

import { useEnv, formatDate } from "axonalib";
import InputData from "../Input/InputData";
import GridSetup from "./GridSetup";
import Pagination from "../Pagination/Pagination";

const Grid = ({
  id,
  columns,
  itemSearch,
  btn_insert,
  onDoubleClickRow,
  onClickRow,
  onBtnInsert,
  onActive,
  type = "t",
  nameView = "",
  loadGrid = "",
  reload = 0,
  pidobj = 0,
  formTitle = "",
  dbForm = "",
  children,
  selezionato,
  openSetup = false,
  closeSetup,
  testata = true,
  modulosecondario = "",
  icon,
  frameSize,
}) => {
  console.log("frameSize", frameSize);
  const { REACT_APP_SERVERAPI } = useEnv();
  const { onChangeSelected, onReset, onChangeForm } = useForm(
    "form_" + id,
    REACT_APP_SERVERAPI +
      "api/axo_sel/" +
      localStorage.getItem("axn_token") +
      "/general/general/leggirow/" +
      dbForm +
      "_f_",
    dbForm,
    modulosecondario
  );

  const [rowSelected, setRowSelected] = useState(0);
  const [filteredValue, setFilteredValue] = useState("");
  const isFormInsert = children ? true : false;
  const [isOpenInsert, setIsOpenInsert] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(0);
  const [isReloaded, setIsReloaded] = useState(0);
  const [isDelete, setIsDelete] = useState(false);
  const [isScaduto, setIsScaduto] = useState(false);
  const [rowItem, setRowItem] = useState([]);

  const {
    filterGrid,
    initList,
    listItems,
    filteredListItem,
    loadGrid: loadGridint,
    IsLoading,
    columns: columnsint,
    itemsearch: itemsearchint,
    stat: statGrid,
  } = useGrid();

  const styles = [
    classes.grid_content,
    classes["grid_type_" + type],
    classes["grid_selected_" + selezionato],
  ];
  const [page, setPage] = useState(1);

  const onActiveHandler = () => {
    try {
      onActive();
    } catch (error) {
      console.log(error.message);
    }
  };

  const onDoubleClickHandler = (IDOBJ, items) => {
    try {
      setRowItem(items);
    } catch (error) {
      console.log(error.message);
    }

    try {
      onActiveHandler();
    } catch (error) {
      console.log(error.message);
    }
    try {
      modificaHandler(IDOBJ);
    } catch (error) {
      console.log(error.message);
    }

    try {
      onDoubleClickRow(IDOBJ, items);
    } catch (error) {
      console.log(error.message);
    }
    try {
      onChangeSelected(IDOBJ);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onClickRowHandler = (IDOBJ, items) => {
    try {
      onActiveHandler();
    } catch (error) {}
    setRowSelected(() => {
      return IDOBJ;
    });
    onClickRow(IDOBJ, items);
  };

  const insertHandler = () => {
    try {
      onActiveHandler();
    } catch (error) {}
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
    try {
      onActiveHandler();
    } catch (error) {}
    if (isFormInsert) {
      onChangeSelected(IDOBJ);
      setIsOpenInsert(true);
    }
  };

  const deleteHandler = () => {
    try {
      onActiveHandler();
    } catch (error) {}
    setIsDelete(true);
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
    try {
      onActiveHandler();
    } catch (error) {}
    setPage(1);
    setFilteredValue(valueItem);
  };

  const pageBeforeHandler = () => {
    try {
      onActiveHandler();
    } catch (error) {}
    setPage((prev) => {
      return prev === 1 ? 1 : parseInt(prev) - 1;
    });
  };
  const pageAfterHandler = () => {
    try {
      onActiveHandler();
    } catch (error) {}
    setPage((prev) => {
      return parseInt(prev) + 1;
    });
  };
  const onChangePage = (evt) => {
    try {
      onActiveHandler();
    } catch (error) {}
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
  const onStopDeletehandler = () => {
    setIsDelete(false);
    setIsScaduto(false);
  };
  const onDeletehandler = () => {
    setIsFormSubmit((prev) => {
      return prev + 1;
    });
    setIsScaduto(true);
  };
  const onSaveformhandler = () => {
    setIsReloaded((prev) => {
      return prev + 1;
    });
    setIsOpenInsert(false);
    setIsFormSubmit(0);
    setIsScaduto(false);
    setIsDelete(false);
  };
  const onStopformhandler = () => {
    setIsOpenInsert(false);
    setIsScaduto(false);
    setIsDelete(false);
  };
  useEffect(() => {
    loadGridint(requestGrid);
  }, [reload, page, filteredValue, pidobj, isReloaded]);

  useEffect(() => {
    const goFirstRow = () => {
      if (id === "maint_t") {
        if (statGrid === undefined) {
        } else {
          try {
            onClickRow(parseFloat(statGrid[0]["primoId"]));
          } catch (error) {}
          try {
            setRowSelected(parseFloat(statGrid[0]["primoId"]));
          } catch (error) {}
        }
      }
    };

    goFirstRow();
  }, [statGrid]);

  return (
    <>
      {openSetup && (
        <GridSetup
          onClose={() => {
            closeSetup();
          }}
          loadGrid={loadGrid}
          modulo={dbForm}
          idGriglia={id}
        />
      )}
      <div className={styles.join(" ")}>
        {contentDiv && (
          <div className={classes.grid_filtergrid}>
            <div className={classes.grid_filtergridleft}>
              {btn_insert && (
                <div className={classes.grid_buttonoperation}>
                  <Button
                    onClick={insertHandler}
                    className={`${classes.grid_button} ${classes.grid_buttonAdd}`}
                    type='sm'
                  >
                    <ImgFont icon='faPlus' size='medium' />
                  </Button>
                  <Button
                    onClick={deleteHandler}
                    className={`${classes.grid_button} ${classes.grid_buttonDelete}`}
                    type='sm'
                  >
                    <ImgFont
                      icon='faTrashCan'
                      className='deleteBtn'
                      size='medium'
                    />
                  </Button>
                </div>
              )}
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
            <div className={classes.grid_filtergridright}>
              <div className={classes.grid_pagecontrols}>
                <Pagination
                  id='Grid_Pagination'
                  page={String(page)}
                  onChange={onChangePage}
                  rightIcon='right'
                  onRightIconClick={pageAfterHandler}
                  leftIcon='left'
                  onLeftIconClick={pageBeforeHandler}
                />
              </div>
            </div>
          </div>
        )}
        <div
          className={
            frameSize === 3
              ? classes.grid_table_contentOpen
              : classes.grid_table_contentClosed
          }
        >
          <table className={classes.grid_table} id={id}>
            <thead>
              <Row
                key='INT'
                columns={
                  columns === undefined || columns === null
                    ? columnsint
                    : columns
                }
                type='testata'
                onClick={onClickHeaderHandler}
                onDoubleClick={() => {}}
                labeltestata={testata}
              />
            </thead>
            <tbody>
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
            </tbody>
          </table>
        </div>
      </div>
      {isDelete && (
        <MessageModal
          onOut={onStopDeletehandler}
          title={"Eliminare il record selezionato?"}
          message=''
          buttons={[
            {
              key: 1,
              label: "Annulla",
              type: "stop",
              onClick: onStopDeletehandler,
            },
            {
              key: 2,
              label: "Elimina",
              type: "run",
              onClick: onDeletehandler,
            },
          ]}
        >
          <Form
            id={"form_" + id}
            idobj={rowSelected}
            modulo='general'
            db={dbForm}
            serverApi={REACT_APP_SERVERAPI}
            afterSubmit={onSaveformhandler}
            onAnnulla={onStopformhandler}
            isFormSubmit={isFormSubmit}
            isScaduto={isScaduto}
          >
            <FrameContainer>
              <FrameInRow width={["20 hidden", "20 hidden", "20 hidden"]}>
                <Input label='IDOBJ' id='IDOBJ' value={rowSelected} />
                <InputData
                  label='Scadenza'
                  id={dbForm + "_ScadenzaOBJ"}
                  value={formatDate(Date.now())}
                />
              </FrameInRow>
            </FrameContainer>
          </Form>
        </MessageModal>
      )}
      {isOpenInsert && (
        <MessageModal
          onOut={onStophandler}
          title={formTitle}
          icon={icon}
          message=''
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
            modulo='general'
            db={dbForm}
            serverApi={REACT_APP_SERVERAPI}
            afterSubmit={onSaveformhandler}
            onAnnulla={onStopformhandler}
            isFormSubmit={isFormSubmit}
          >
            <FrameContainer>
              <FrameInRow width={["20 hidden", "20 hidden", "20 hidden"]}>
                <Input
                  label='IDOBJ'
                  id='IDOBJ'
                  value={rowSelected}
                  onChangeValue={onChangeForm}
                />
                <Input
                  label='PIDOBJ'
                  id='PIDOBJ'
                  value={pidobj}
                  onChangeValue={onChangeForm}
                />
                <Input
                  label='ConfigGriglie_NomeCampo'
                  id='ConfigGriglie_NomeCampo'
                  value={rowItem["ConfigGriglie_NomeCampo"]}
                  onChangeValue={onChangeForm}
                />
              </FrameInRow>
              <>
                {children.length > 1 &&
                  children.map((item, i) => {
                    return (
                      <React.Fragment key={i}>
                        {React.cloneElement(item, {
                          form_id: "form_" + id,
                          onChangeValue: onChangeForm,
                        })}
                      </React.Fragment>
                    );
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
