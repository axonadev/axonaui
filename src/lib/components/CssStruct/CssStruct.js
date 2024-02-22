import { useEffect, useState } from "react";

const CssStruct = ({ children, url, piva, template = "default" }) => {
  const [defaultCss, setDefaultCss] = useState(null);
  const [personalCss, setPersonalCss] = useState(null);
  const versioncss = new Date().getTime();

  const getdefaultCss = async (url) => {
    let rr = false;
    const response = await fetch(url + "/" + template + ".json?v=" + versioncss)
      .then((result) => result.json())
      .then((data) => {
        rr = data;
      });
    return rr;
  };

  const getpersonalCss = async (url, piva) => {
    let rr = false;
    const response = await fetch(url + "/" + piva + "/css.json?v=" + versioncss)
      .then((result) => result.json())
      .then((data) => {
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
          try {
            document
              .getElementById(prop)
              .style.setProperty(propid, idElem[propid]);
          } catch (error) {}
        }
      }
    }
  };

  loadCss();

  useEffect(() => {
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
export default CssStruct;
