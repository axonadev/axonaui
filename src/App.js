import React, { useState } from "react";
import {
  Grid,
  SideMenu,
  CssStruct,
  Header,
  ContentForm,
  FrameInRow,
  Frame,
  Input,
  Form,
} from "./lib";

import ProjectMenu from "./lib/components/ProjectMenu/ProjectMenu";
import useProjectMenu from "./lib/hooks/useProjectMenu";
import useForm from "./lib/hooks/useForm";
import InputData from "./lib/components/Input/InputData";
import InputCheckBox from "./lib/components/Input/InputCheckBox";

const App = () => {
  const modulo = "ive";
  const nameView = "v_" + modulo;
  const nameTable = modulo;

  const [focusForm, setFocusForm] = useState("");
  const [statoGriglia, setStatoGriglia] = useState("");
  const [reloadGriglia, setReloadGriglia] = useState(0);

  const [styleMenu, setStyleMenu] = useState(
    localStorage.getItem("axn_sidemenuswitch") === "true" ? true : false
  );

  const [idobj_T, setIdobj_T] = useState(0);

  const onSideMenuChangeHandler = (stmenu) => {
    setStyleMenu(stmenu);
  };

  const projectMenuClickHandler = (idProject) => {
    setFormPj(getFormMenuPj(idProject));
  };

  const projectMenuRequestSubmitHandler = (evt) => {
    processRequest(evt);
  };
  const { onChangeSelected, onReset } = useForm();
  const insertClickHandler = (idGriglia) => {
    const idform = "form_" + idGriglia.split("_")[1];
    onReset();
    setFocusForm(idform);
    setStatoGriglia("INSERIMENTO");
    setIdobj_T(0);
  };

  const [formPj, setFormPj] = useState(null);
  const {
    items: pjItems,
    getFormMenuPj,
    processRequest,
    answerReq,
  } = useProjectMenu();

  const itemsSearch = ["Soggetti_Nome1", "Soggetti_Nome2"];
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
              itemSearch={itemsSearch}
              id="main_t"
              stato={statoGriglia}
              loadGrid={
                "http://192.168.2.159:8811/api/axo_sel/" +
                localStorage.getItem("axn_token") +
                "/" +
                modulo +
                "/" +
                modulo +
                "sel/leggi"
              }
              nameView={nameView}
              onClickRow={(IDOBJ) => {
                setIdobj_T(IDOBJ);
                setFocusForm("form_t");
                setStatoGriglia("");
                onChangeSelected(
                  "http://192.168.2.159:8811/api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/" +
                    modulo +
                    "/" +
                    modulo +
                    "sel/getrow/" +
                    IDOBJ,
                  nameTable
                );
              }}
              btn_insert={true}
              onDoubleClickRow={() => {
                console.log("click");
              }}
              onBtnInsert={insertClickHandler}
              reload={reloadGriglia}
            />
          </Frame>

          {focusForm === "form_t" && (
            <Form
              id="form_t"
              idobj={idobj_T}
              modulo={modulo}
              db={modulo}
              onAnnulla={() => {
                setReloadGriglia((item) => {
                  return item + 1;
                });
                setStatoGriglia("");
                onChangeSelected(
                  "http://192.168.2.159:8811/api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/" +
                    modulo +
                    "/" +
                    modulo +
                    "sel/getrow/" +
                    idobj_T,
                  nameTable
                );
              }}
              serverApi="http://192.168.2.159:8811/"
              afterSubmit={() => {
                setReloadGriglia((item) => {
                  return item + 1;
                });
                setStatoGriglia("");
                onChangeSelected(
                  "http://192.168.2.159:8811/api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/" +
                    modulo +
                    "/" +
                    modulo +
                    "sel/getrow/" +
                    idobj_T,
                  nameTable
                );
              }}
            >
              <Frame label="DATI DI PROVA">
                <FrameInRow width={[80, 10, 10]}>
                  <Input label="prova" id="Ive_Descrizione"></Input>
                  <Input label="prova" id="Ive_Valore"></Input>
                  <InputData
                    label="prova"
                    type="date"
                    id="Ive_ScadenzaOBJ"
                  ></InputData>
                </FrameInRow>
                <FrameInRow width={[80, 10, 10]}>
                  <InputCheckBox
                    label="prova"
                    id="Ive_DefaultTestoLibero"
                  ></InputCheckBox>
                </FrameInRow>
              </Frame>
            </Form>
          )}
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
