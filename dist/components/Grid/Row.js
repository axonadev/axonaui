"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _RowModule = _interopRequireDefault(require("../style/Row.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Row = _ref => {
  let {
    items,
    columns,
    className,
    type,
    rowSelect,
    onClick,
    onDoubleClick
  } = _ref;
  const IDOBJ = items ? items.IDOBJ : null;
  const classStyle = [_RowModule.default.row_content, className ? _RowModule.default[className] : "", type ? _RowModule.default["row_" + type] : "", rowSelect ? _RowModule.default.row_rowselected : ""];
  const onDoubleClickHandler = () => {
    onDoubleClick(IDOBJ);
  };
  const onClickHandler = () => {
    onClick(IDOBJ);
  };
  let hRow = 0;
  if (columns) {
    columns.map(item => {
      try {
        let cStr = items ? items[item.dbField] : "";
        return item.order === 0 ? 0 : cStr.length > 30 ? hRow += 2 : hRow += 1;
      } catch (error) {
        return item.order === 0 ? 0 : hRow += 1;
      }
    });
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: classStyle.join(" "),
    onDoubleClick: onDoubleClickHandler,
    onClick: onClickHandler,
    idobj: IDOBJ
  }, columns && columns.map(item => {
    return item.order === 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null) : /*#__PURE__*/_react.default.createElement("label", {
      key: "l_" + IDOBJ + "_" + Math.random()
    }, items ? items[item.dbField] : item.Label);
  })));
};
var _default = Row;
exports.default = _default;