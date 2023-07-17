import React, { useState } from "react";
import {
  Filter,
  Grid,
  SideMenu,
  CssStruct,
  Folder,
  Header,
  ContentForm,
} from "./lib";

const App = () => {
  const [styleMenu, setStyleMenu] = useState(
    localStorage.getItem("axn_sidemenuswitch") === "true" ? true : false
  );
  const onSideMenuChangeHandler = (stmenu) => {
    setStyleMenu(stmenu);
  };
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
          <label>contenuto del form</label>
        </ContentForm>
      </CssStruct>
    </>
  );
};

export default App;
