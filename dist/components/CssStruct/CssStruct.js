"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = require("react");
const CssStruct = _ref => {
  let {
    children,
    url,
    piva
  } = _ref;
  const [defaultCss, setDefaultCss] = (0, _react.useState)(null);
  const [personalCss, setPersonalCss] = (0, _react.useState)(null);
  const versioncss = new Date().getTime();
  const getdefaultCss = async url => {
    let rr = false;
    const response = await fetch(url + "/default.json?v=" + versioncss).then(result => result.json()).then(data => {
      rr = data;
    });
    return rr;
  };
  const getpersonalCss = async (url, piva) => {
    let rr = false;
    const response = await fetch(url + "/" + piva + "/css.json?v=" + versioncss).then(result => result.json()).then(data => {
      rr = data;
    });
    return rr;
  };
  const loadCss = () => {
    if (defaultCss) {
      const dftrootElement = defaultCss.root;
      for (var prop in dftrootElement) {
        document.documentElement.style.setProperty(prop, dftrootElement[prop]);
      }
    }
    if (personalCss) {
      const prsrootElement = personalCss.root;
      for (var prop in prsrootElement) {
        document.documentElement.style.setProperty(prop, prsrootElement[prop]);
      }
      const prsidElement = personalCss.id;
      for (var prop in prsidElement) {
        let idElem = prsidElement[prop];
        for (var propid in idElem) {
          document.getElementById(prop).style.setProperty(propid, idElem[propid]);
        }
      }
    }
  };
  loadCss();
  (0, _react.useEffect)(() => {
    const dftCss = async () => {
      const rpersonal = await getdefaultCss(url);
      setDefaultCss(rpersonal);
      return rpersonal;
    };
    const prsCss = async () => {
      const rpersonal = await getpersonalCss(url, piva);
      setPersonalCss(rpersonal);
      return rpersonal;
    };
    dftCss();
    prsCss();
  }, []);
  return children;
};
var _default = CssStruct;
exports.default = _default;