"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useGrid = () => {
  const [isGridLoading, setIsLoading] = (0, _react.useState)(false);
  const [gridError, setError] = (0, _react.useState)(null);
  const [listItems, setListItem] = (0, _react.useState)([]);
  const [rootModule, setRootModule] = (0, _react.useState)("");
  const [filteredListItem, setFilteredListItem] = (0, _react.useState)([]);
  const [selectedRow, setSelectedRow] = (0, _react.useState)(0);
  const [isVarIns, setVarIns] = (0, _react.useState)(false);
  const [idVarIns, setIdVarIns] = (0, _react.useState)(null);
  const [isReload, setReload] = (0, _react.useState)(false);
  const loadGrid = (0, _react.useCallback)(async (requestURL, afterLoad) => {
    setIsLoading(true);
    setError(null);
    setRootModule(requestURL.rootModule);
    try {
      const response = await fetch(requestURL.url, {
        method: "GET"
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      setListItem(data.Itemset[requestURL.dt_filter]);
      setFilteredListItem(data.Itemset[requestURL.dt_filter]);
      if (afterLoad === undefined) {} else {
        afterLoad(data.Itemset[requestURL.dt_filter]);
      }
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  const initList = list => {
    setListItem(list);
    setFilteredListItem(() => list);
  };
  const clickRow = IDOBJ => {
    setSelectedRow(() => {
      return IDOBJ;
    });
  };
  const insertRow = () => {};
  const selectRow = IDOBJ => {};
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
      rr = listItems.filter(item => {
        for (var key in nameItem) {
          console.log(item);
          if (item[nameItem[key]].toLowerCase().indexOf(valueItem.toLowerCase()) > -1) {
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
    reloadGrid
  };
};
var _default = useGrid;
exports.default = _default;