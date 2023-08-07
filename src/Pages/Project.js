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
} from "../lib";
import { useEnv } from "axonalib";
import InputCheckList from "../lib/components/Input/InputCheckList";

const Project = ({ request }) => {
  const { REACT_APP_SERVERAPI } = useEnv();

  const moduloForm = "soggetti";
  const nameView = "v_" + moduloForm;
  const nameTable = moduloForm;
  const cmd_getForm = "/" + moduloForm + "/" + moduloForm + "sel/getrow/";
  const cmd_getGrid = "/" + moduloForm + "/" + moduloForm + "sel/leggi";

  const listaanni = [
    { IDOBJ: 2020, Anni_Descrizione: "duemilaventi" },
    { IDOBJ: 2021, Anni_Descrizione: "duemilaventuno" },
    { IDOBJ: 2022, Anni_Descrizione: "duemilaventidue" },
  ];

  const [focusForm, setFocusForm] = useState("");
  const [statoGriglia, setStatoGriglia] = useState("");
  const [reloadGriglia, setReloadGriglia] = useState(0);
  const [idobj_T, setIdobj_T] = useState(0);
  const { onChangeSelected, onReset, formValue, isChanged, setIsChanged } =
    useForm();

  const insertClickHandler = (idGriglia) => {
    const idform = "form_" + idGriglia.split("_")[1];
    onReset();
    setIsChanged(false);
    setFocusForm(idform);
    setStatoGriglia("INSERIMENTO");
    setIdobj_T(0);
  };
  const deleteClickHandler = (idGriglia) => {};

  const onLoadRow = () => {
    setIsChanged(false);
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
    setIsChanged(false);
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
  const onChangeInput = () => {
    setIsChanged(true);
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
          isChanged={isChanged}
        >
          <FrameContainer id="frame_1">
            <Frame label="DATI DI PROVA 1">
              <FrameInRow width={[80, 10, 10]}>
                <Input
                  label="prova"
                  id="Soggetti_Nome1"
                  val={formValue}
                  onChange={onChangeInput}
                ></Input>
                <Input
                  label="prova"
                  id="Soggetti_Nome2"
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
              <FrameInRow width={[20, 25, 20, 20]}>
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
            </Frame>
          </FrameContainer>
          <FrameContainer id="frame_4">
            <label>seconfo</label>
          </FrameContainer>
        </Form>
      )}
    </>
  );
};
export default Project;
