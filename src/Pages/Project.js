import React, { useEffect, useState } from "react";
import {
  useForm,
  Input,
  InputCheckBox,
  InputData,
  Form,
  Frame,
  FrameInRow,
  Grid,
  InputList,
  FrameContainer,
  Citta,
} from "../lib";
import { useEnv } from "axonalib";
import InputCheckList from "../lib/components/Input/InputCheckList";
import FormButton from "../lib/components/Form/FormButton";

const Project = ({ request }) => {
  const { REACT_APP_SERVERAPI } = useEnv();

  const moduloForm = "soggetti";
  const nameView = "v_" + moduloForm;
  const nameTable = moduloForm;
  const cmd_getForm = "/" + moduloForm + "/" + moduloForm + "sel/getrow/";
  const cmd_getGrid = "/" + moduloForm + "/" + moduloForm + "sel/leggi";
  const cmd_getDomiciliGrid =
    "/" + moduloForm + "/" + moduloForm + "sel/leggiDomicili";

  const [domiciliReloadGriglia, setDomiciliReloadGriglia] = useState(0);

  const listaanni = [
    { IDOBJ: 2020, Anni_Descrizione: "duemilaventi" },
    { IDOBJ: 2021, Anni_Descrizione: "duemilaventuno" },
    { IDOBJ: 2022, Anni_Descrizione: "duemilaventidue" },
  ];

  const [focusForm, setFocusForm] = useState("");
  const [statoGriglia, setStatoGriglia] = useState("");
  const [reloadGriglia, setReloadGriglia] = useState(0);
  const [idobj_T, setIdobj_T] = useState(0);
  const [idobj_Domicili, setIdobj_Domicili] = useState(0);

  const { onChangeSelected, onReset, formValue } = useForm();

  const domiciliItemsSearch = [
    "SoggettiDomicili_Nome1",
    "SoggettiDomicili_Nome2",
  ];

  const insertClickHandler = (idGriglia) => {
    const idform = "form_" + idGriglia.split("_")[1];
    onReset();

    setFocusForm(idform);
    setStatoGriglia("INSERIMENTO");
    setIdobj_T(0);
  };
  const deleteClickHandler = (idGriglia) => {};

  const onLoadRow = () => {
    setReloadGriglia((item) => {
      return item + 1;
    });

    setStatoGriglia("");
    onChangeSelected(
      REACT_APP_SERVERAPI +
        "api/axo_sel/" +
        localStorage.getItem("axn_token") +
        cmd_getForm +
        idobj_T,
      nameTable
    );
  };
  const onChangeRow = (idobj) => {
    setIdobj_T(idobj);
    setFocusForm("form_t");
    setStatoGriglia("");
    onChangeSelected(
      REACT_APP_SERVERAPI +
        "api/axo_sel/" +
        localStorage.getItem("axn_token") +
        cmd_getForm +
        idobj,
      nameTable
    );
  };
  const domiciliChangeRow = (idobj) => {
    setIdobj_Domicili(idobj);
  };

  useEffect(() => {
    const loadRequest = () => {};

    loadRequest();
  }, [request]);

  const itemFolders = [
    { key: 1, label: "label 1", img: "save", target: "frame_1" },
    { key: 2, label: "label 4", img: "save", target: "frame_4" },
    { key: 3, label: "label 4", img: "save", target: "frame_5" },
  ];
  const idFolder1 = "frame_1";
  const itemsSearch = ["Soggetti_Nome1", "Soggetti_Nome2"];

  const onChangeInput = () => {};
  const domiciliInsertClickHandler = (idGriglia) => {};
  const domiciliDeleteClickHandler = (idGriglia) => {
    console.log(idGriglia);
  };
  return (
    <>
      <Frame label="TESTATA" type="form_t" stato={statoGriglia}>
        <Grid
          id="maint_t"
          loadGrid={
            REACT_APP_SERVERAPI +
            "api/axo_sel/" +
            localStorage.getItem("axn_token") +
            cmd_getGrid
          }
          onClickRow={(IDOBJ) => {
            onChangeRow(IDOBJ);
          }}
          onDoubleClickRow={() => {}}
          onBtnInsert={insertClickHandler}
          onBtnDelete={deleteClickHandler}
          nameView={nameView}
          reload={reloadGriglia}
          itemSearch={itemsSearch}
          btn_insert={true}
        />
      </Frame>
      <FormButton onAnnulla={onLoadRow} id_submit="form_t" />
      {focusForm === "form_t" && (
        <Form
          id="form_t"
          idobj={idobj_T}
          modulo={moduloForm}
          db={nameTable}
          serverApi={REACT_APP_SERVERAPI}
          folders={itemFolders}
          afterSubmit={onLoadRow}
          onAnnulla={onLoadRow}
        >
          <FrameContainer id="frame_1">
            <Frame label="DATI DI PROVA 1">
              <FrameInRow width={[80, 10, 10]}>
                <Input
                  label="prova"
                  id="Ive_Descrizione"
                  val={formValue}
                  onChange={onChangeInput}
                ></Input>
                <Input
                  label="prova"
                  id="Ive_Valore"
                  val={formValue}
                  onChange={onChangeInput}
                ></Input>
                <InputData
                  label="Scadenza"
                  id="Soggetti_ScadenzaOBJ"
                  val={formValue}
                  onChange={onChangeInput}
                />
              </FrameInRow>
              <FrameInRow width={[5, 25, 20, 10]}>
                <InputCheckBox
                  label="checkbox"
                  val={formValue}
                  onChange={onChangeInput}
                />
                <InputList
                  label="Natura iva"
                  id="Ive_Natura"
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/ive/ivesel/legginaturaiva"
                  }
                  nameList="v_naturaiva"
                  field_id="IDOBJ"
                  field_description={[
                    "NaturaIVA_Codice",
                    "NaturaIVA_Descrizione",
                  ]}
                  val={formValue}
                  onChange={onChangeInput}
                  numerocaratteri={3}
                />
                <InputList
                  label="Anni"
                  id="Ive_Anni"
                  nameList="v_anni"
                  field_id="IDOBJ"
                  field_description={["Anni_Descrizione"]}
                  defList={listaanni}
                  val={formValue}
                  onChange={onChangeInput}
                />
                <InputCheckList
                  label="tipisoggetto"
                  id="tipisoggetto"
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/soggetti/soggettisel/leggitipisoggetto/" +
                    idobj_T
                  }
                  nameList="v_tipisoggetto"
                  field_id="IDOBJ"
                  field_description="TipiSoggetto_Descrizione"
                  field_value="valore"
                  field_target="SoggettiTipi_Tipo"
                  val={formValue}
                  pidobj={idobj_T}
                  onChange={onChangeInput}
                />
              </FrameInRow>
              <FrameInRow width={[100]}>
                <Citta
                  nazione={{ label: "Nazione", id: "Soggetti_Nazione" }}
                  citta={{ label: "Citta", id: "Soggetti_Citta" }}
                  provincia={{ label: "Provincia", id: "Soggetti_Prov" }}
                  cap={{ label: "CAP", id: "Soggetti_CAP" }}
                  onChange={onChangeInput}
                  val={formValue}
                />
              </FrameInRow>
            </Frame>
          </FrameContainer>
          <FrameContainer id="frame_4">
            <Grid
              id="grid_domicili"
              loadGrid={
                REACT_APP_SERVERAPI +
                "api/axo_sel/" +
                localStorage.getItem("axn_token") +
                cmd_getDomiciliGrid
              }
              onClickRow={(IDOBJ) => {
                domiciliChangeRow(IDOBJ);
              }}
              pidobj={idobj_T}
              onDoubleClickRow={() => {}}
              onBtnInsert={domiciliInsertClickHandler}
              onBtnDelete={domiciliDeleteClickHandler}
              btn_insert={true}
              nameView={"v_soggettidomicili"}
              reload={domiciliReloadGriglia}
              itemSearch={domiciliItemsSearch}
            />
          </FrameContainer>
        </Form>
      )}
    </>
  );
};
export default Project;
