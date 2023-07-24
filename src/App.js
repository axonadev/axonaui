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
  FrameInRow,
  Frame,
  Input,
} from "./lib";
import ChartBar from "./lib/components/Chart/ChartBar";
import ChartRadar from "./lib/components/Chart/ChartRadar";
import ProjectMenu from "./lib/components/ProjectMenu/ProjectMenu";
import useProjectMenu from "./lib/hooks/useProjectMenu";

const App = () => {
  const [styleMenu, setStyleMenu] = useState(
    localStorage.getItem("axn_sidemenuswitch") === "true" ? true : false
  );

  const onSideMenuChangeHandler = (stmenu) => {
    setStyleMenu(stmenu);
  };

  const projectMenuClickHandler = (idProject) => {
    setFormPj(getFormMenuPj(idProject));
  };

  const projectMenuRequestSubmitHandler = (evt) => {
    processRequest(evt);
  };

  const [formPj, setFormPj] = useState(null);
  const {
    items: pjItems,
    getFormMenuPj,
    processRequest,
    answerReq,
  } = useProjectMenu();

  const columns = [
    { dbField: "IDOBJ", label: "IDOBJ", order: 0 },
    { dbField: "Soggetti_Nome1", label: "Nome", order: 1 },
    { dbField: "Soggetti_Nome2", label: "Cognome", order: 2 },
    { dbField: "Soggetti_Indirizzo", label: "Indirizzo", order: 3 },
  ];
  const items = [
    {
      IDOBJ: 1.0,
      AZIENDA: "00000000000",
      S_INS: "2023-07-12T10:23:23.16",
      S_VAR: "2023-07-12T10:23:23.16",
      Soggetti_ScadenzaOBJ: "2999-12-31T00:00:00",
      Soggetti_Codice: null,
      Soggetti_Tipo: null,
      Soggetti_Titolo: null,
      Soggetti_Nome1: "Emanuele",
      Soggetti_Nome2: "Croce",
      Soggetti_Indirizzo: "via da qui",
    },
    {
      IDOBJ: 2.0,
      AZIENDA: "00000000000",
      S_INS: "2023-07-12T10:23:23.16",
      S_VAR: "2023-07-12T10:23:23.16",
      Soggetti_ScadenzaOBJ: "2999-12-31T00:00:00",
      Soggetti_Codice: null,
      Soggetti_Tipo: null,
      Soggetti_Titolo: null,
      Soggetti_Nome1: "Mirko",
      Soggetti_Nome2: "Sciarpa",
      Soggetti_Indirizzo: null,
    },
    {
      IDOBJ: 3.0,
      AZIENDA: "00000000000",
      S_INS: "2023-07-12T10:23:23.16",
      S_VAR: "2023-07-12T10:23:23.16",
      Soggetti_ScadenzaOBJ: "2999-12-31T00:00:00",
      Soggetti_Codice: null,
      Soggetti_Tipo: null,
      Soggetti_Titolo: null,
      Soggetti_Nome1: "Davide",
      Soggetti_Nome2: "Sciarpa",
      Soggetti_Indirizzo: null,
    },
  ];

  const itemsSearch = ["Soggetti_Nome1", "Soggetti_Nome2"];
  console.log("------");
  console.log(pjItems);
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
        <ContentForm sidemenuopen={styleMenu} request={answerReq}>
          <Frame label="TESTATA" type="form_t">
            <Grid
              id="idGriglia"
              columns={columns}
              items={items}
              itemSearch={itemsSearch}
              onClickRow={() => {
                console.log("click");
              }}
              btn_insert={true}
              onDoubleClickRow={() => {
                console.log("click");
              }}
            />
          </Frame>
          <Frame label="DETTAGLIO" type="form_d">
            <Grid
              id="idGriglia"
              columns={columns}
              items={items}
              btn_insert={true}
              itemSearch={itemsSearch}
              onClickRow={() => {
                console.log("click");
              }}
              type="d"
              onDoubleClickRow={() => {
                console.log("click");
              }}
            />
          </Frame>

          <Frame label="DATI DI PROVA">
            <FrameInRow width={[80, 10, 10]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[20, 20]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
          </Frame>
          <Frame label="Dati di prova">
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[20, 20]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
          </Frame>
          <Frame label="Dati di prova">
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[20, 20]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
          </Frame>
          <Frame label="Dati di prova">
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[20, 20]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
          </Frame>
        </ContentForm>
        <ProjectMenu
          items={pjItems}
          onClick={projectMenuClickHandler}
          onRequestSubmit={projectMenuRequestSubmitHandler}
        >
          {formPj}
        </ProjectMenu>
      </CssStruct>
    </>
  );
};

export default App;
