import React from "react";
import { useState, useCallback } from "react";

const useGrid = () => {
  const [isGridLoading, setIsLoading] = useState(false);
  const [gridError, setError] = useState(null);
  const [listItems, setListItem] = useState([]);
  const [rootModule, setRootModule] = useState("");
  const [filteredListItem, setFilteredListItem] = useState([]);
  const [selectedRow, setSelectedRow] = useState(0);
  const [isVarIns, setVarIns] = useState(false);
  const [idVarIns, setIdVarIns] = useState(null);
  const [isReload, setReload] = useState(false);

  const loadGrid = useCallback(async (requestURL, afterLoad) => {
    setIsLoading(true);
    setError(null);
    setRootModule(requestURL.rootModule);

    try {
      const response = await fetch(requestURL.url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      setListItem(data.Itemset[requestURL.dt_filter]);
      setFilteredListItem(data.Itemset[requestURL.dt_filter]);
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
    let rr = [];
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
