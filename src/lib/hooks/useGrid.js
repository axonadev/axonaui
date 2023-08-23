import React from "react";
import { useState, useCallback } from "react";

const useGrid = () => {
  const [isGridLoading, setIsLoading] = useState(false);
  const [gridError, setError] = useState(null);
  const [listItems, setListItem] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rootModule, setRootModule] = useState("");
  const [filteredListItem, setFilteredListItem] = useState([]);
  const [selectedRow, setSelectedRow] = useState(0);
  const [isVarIns, setVarIns] = useState(false);
  const [idVarIns, setIdVarIns] = useState(null);
  const [isReload, setReload] = useState(false);

  const loadGrid = useCallback(async (requestURL, afterLoad) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestURL.url +
          "/" +
          (requestURL.filteredValue === "" ? "-" : requestURL.filteredValue) +
          "_f_" +
          requestURL.page +
          (requestURL.pidobj != 0 ? "_f_" + requestURL.pidobj : ""),
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      setListItem(data.Itemset[requestURL.dt_filter]);
      setFilteredListItem(data.Itemset[requestURL.dt_filter]);

      setColumns(data.Itemset["conf_griglia"]);

      if (afterLoad === undefined) {
      } else {
        afterLoad(data.Itemset[requestURL.dt_filter]);
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  const initList = (list) => {
    setListItem(list);
    setFilteredListItem(() => list);
  };

  const clickRow = (IDOBJ) => {
    setSelectedRow(() => {
      return IDOBJ;
    });
  };

  const insertRow = () => {};
  const selectRow = (IDOBJ) => {};

  const insertRowModal = () => {
    setVarIns(true);
    setIdVarIns(0);
  };
  const varRowModal = () => {
    setVarIns(true);
    setIdVarIns(selectedRow);
  };
  const stopVarIns = () => {
    setVarIns(false);
    setIdVarIns(null);
  };
  const reloadGrid = () => {
    setReload(true);
    setVarIns(false);
    setIdVarIns(null);
  };

  const filterGrid = (valueItem, nameItem) => {
    /* let rr = [];
    try {
      rr = listItems.filter((item) => {
        for (var key in nameItem) {
          console.log(item);
          if (
            item[nameItem[key]].toLowerCase().indexOf(valueItem.toLowerCase()) >
            -1
          ) {
            return true;
          }
        }
      });
    } catch (error) {}
    setFilteredListItem(rr);
     */
    //setFilteredValue(valueItem.toLowerCase());
  };

  return {
    isGridLoading,
    gridError,
    listItems,
    filteredListItem,
    selectedRow,
    isVarIns,
    idVarIns,
    isReload,
    columns,
    loadGrid,
    selectRow,
    clickRow,
    insertRow,
    filterGrid,
    initList,
    varRowModal,
    insertRowModal,
    stopVarIns,
    reloadGrid,
  };
};
export default useGrid;
