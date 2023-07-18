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
} from "./lib";

const App = () => {
  const [styleMenu, setStyleMenu] = useState(
    localStorage.getItem("axn_sidemenuswitch") === "true" ? true : false
  );
  const onSideMenuChangeHandler = (stmenu) => {
    setStyleMenu(stmenu);
  };

  const datacomm = [
    { label: "grafico1", gennaio: 12, febbraio: 23, marzo: 33 },
    { label: "grafico2", gennaio: 22, febbraio: 43, marzo: 13 },
    { label: "grafico3", gennaio: 42, febbraio: 21, marzo: 3 },
  ];

  return (
    <>
      <CssStruct url="http://192.168.2.159:8011/css">
        {/* tenere per sviluppare il css */}
        <Header
          logo={process.env.REACT_APP_IMGFOLDER + "/55555555550/logo.png"}
          titolo={"titolo"}
        />
        <SideMenu onSideMenuChange={onSideMenuChangeHandler} />
        <ContentForm sidemenuopen={styleMenu}>
          <ChartLine title="grafico stocazzo" data={datacomm} />
        </ContentForm>
      </CssStruct>
    </>
  );
};

export default App;
