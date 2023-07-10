"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _GridModule = _interopRequireDefault(require("../style/Grid.module.css"));
var _Row = _interopRequireDefault(require("./Row"));
var _useGrid = _interopRequireDefault(require("../../../hooks/useGrid"));
var _Filter = _interopRequireDefault(require("../Filter/Filter"));
var _Button = _interopRequireDefault(require("../Button/Button"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Grid = _ref => {
  let {
    id,
    columns,
    items,
    itemSearch,
    btn_insert,
    onDoubleClickRow,
    onClickRow,
    onBtnInsert
  } = _ref;
  const [rowSelected, setRowSelected] = (0, _react.useState)(0);
  const {
    filterGrid,
    initList,
    filteredListItem
  } = (0, _useGrid.default)();
  const onDoubleClickHandler = IDOBJ => {
    onDoubleClickRow(IDOBJ);
  };
  const onClickRowHandler = IDOBJ => {
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
  (0, _react.useEffect)(() => {
    initList(items);
  }, [items]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: _GridModule.default.KGrid
  }, contentDiv && /*#__PURE__*/_react.default.createElement("div", {
    className: _GridModule.default.filtergrid
  }, btn_insert && /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: insertHandler,
    className: _GridModule.default.button
  }, "Inserisci"), itemSearch && /*#__PURE__*/_react.default.createElement(_Filter.default, {
    onFilter: filterGrid,
    itemSearch: itemSearch,
    id: idFilter
  })), /*#__PURE__*/_react.default.createElement(_Row.default, {
    key: "INT",
    columns: columns,
    style: "testata"
  }), filteredListItem !== [] && filteredListItem.map(item => {
    return /*#__PURE__*/_react.default.createElement(_Row.default, {
      items: item,
      key: item.IDOBJ,
      columns: columns,
      onClick: onClickRowHandler,
      onDoubleClick: onDoubleClickHandler,
      rowSelect: rowSelected === item.IDOBJ ? true : false
    });
  }));
};
var _default = Grid;
exports.default = _default;