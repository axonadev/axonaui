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
  Folder,
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
  const itemsFolder = [
    { key: 1, label: "Prova 1", target: "idTarget" },
    { key: 2, label: "Prova 2", target: "idTarget2" },
    { key: 2, label: "Prova 3", target: "idTarget3" },
    { key: 2, label: "Prova 4", target: "idTarget4" },
  ];
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

  const deleteClickHandler = (idGriglia) => {
    console.log(idGriglia);
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
          <Frame label="TESTATA" type="form_t" stato={statoGriglia}>
            <Grid
              itemSearch={itemsSearch}
              id="main_t"
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
              onBtnDelete={deleteClickHandler}
              reload={reloadGriglia}
            />
          </Frame>

          {focusForm === "form_t" && (
            <Form
              id="form_t"
              idobj={idobj_T}
              modulo={modulo}
              db={modulo}
              folders={itemsFolder}
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
                <FrameInRow width={[10, 10, 50]}>
                  <Input label="Valore" id="Ive_Valore"></Input>
                  <InputData
                    type="date"
                    label="Scadenza"
                    id="Ive_ScadenzaOBJ"
                  ></InputData>
                  <Input label="Deducibilità" id="Ive_Deducibilita"></Input>
                </FrameInRow>
                <FrameInRow width={[30, 30, 40]}>
                  <Input label="Descrizione" id="Ive_Descrizione"></Input>
                  <Input label="Conto Vendite" id="Ive_ContoVendite"></Input>
                  <Input label="Conto Acquisti" id="Ive_ContoAcquisti"></Input>
                </FrameInRow>
                <FrameInRow width={[25, 25, 25, 5]}>
                  <Input label="Natura" id="Ive_Natura"></Input>
                  <Input
                    label="Riferimento Normativi"
                    id="Ive_RiferimentoNormativo"
                  ></Input>
                  <Input
                    type="checkbox"
                    label="Default Testo Libero"
                    id="Ive_DefaultTestoLibero"
                  ></Input>
                </FrameInRow>
              </Frame>
              <Frame label="CONTABILITÀ">
                <FrameInRow width={[30, 30, 40]}>
                  <Input
                    label="Conto Ideducibile"
                    id="Ive_ContoIndeducibile"
                  ></Input>
                  <Input label="Conto Vendite" id="Ive_ContoVendite"></Input>
                  <Input label="Conto Acquisti" id="Ive_ContoAcquisti"></Input>
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
