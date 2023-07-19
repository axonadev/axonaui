import React, { useState } from "react";
import {
  Filter,
  Grid,
  SideMenu,
  CssStruct,
  Folder,
  Header,
  ContentForm,
  ChartLine,
  Card,
  ChartPie,
} from "./lib";
import ChartBar from "./lib/components/Chart/ChartBar";
import ChartRadar from "./lib/components/Chart/ChartRadar";

const App = () => {
  const [styleMenu, setStyleMenu] = useState(
    localStorage.getItem("axn_sidemenuswitch") === "true" ? true : false
  );
  const onSideMenuChangeHandler = (stmenu) => {
    setStyleMenu(stmenu);
  };

  const datacomm = [
    { label: "grafaaa", gennaio: 12, febbraio: 23, marzo: 33, pippo: 53 },
    { label: "grafico2", gennaio: 22, febbraio: 43, marzo: 13, pippo: 5 },
    { label: "grafico3", gennaio: 42, febbraio: 21, marzo: 3, pippo: 55 },
    { label: "grafico4", gennaio: 42, febbraio: 21, marzo: 3, pippo: 55 },
    { label: "grafico4", gennaio: 42, febbraio: 21, marzo: 3, pippo: 55 },
  ];
  const datacommpie = [
    {
      label: "grafaaa",
      gennaio: 12,
      febbraio: 23,
      marzo: 33,
      pippo: 53,
      pippo1: 53,
      pippo2: 53,
      pippo3: 53,
      pippo4: 53,
    },
    {
      label: "grafaaa",
      gennaio1: 112,
      febbraio: 123,
      marzo: 233,
      pippo: 353,
      pippo1: 53,
      pippo2: 53,
      pippo3: 53,
      pippo4: 53,
    },
  ];

  return (
    <>
      <CssStruct url="http://192.168.2.159:8011/css">
        {/* tenere per sviluppare il css */}
        <Header
          logo={process.env.REACT_APP_IMGFOLDER + "/55555555550/logo.png"}
          titolo={"titolo"}
        />
        <SideMenu
          onSideMenuChange={onSideMenuChangeHandler}
          pathImg={"http://192.168.2.159:8011/img"}
        />
        <ContentForm sidemenuopen={styleMenu}>
          <ChartLine title="grafico stocazzo" data={datacomm} />
          <ChartPie title="grafico stocazzo" data={datacommpie} />
          <ChartBar title="grafico stocazzo" data={datacommpie} />
          <ChartRadar title="grafico stocazzo" data={datacommpie} />
        </ContentForm>
      </CssStruct>
    </>
  );
};

export default App;
