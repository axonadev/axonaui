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

const Project = ({ request }) => {
  const { REACT_APP_SERVERAPI } = useEnv();

  const moduloForm = "soggetti";
  const nameView = "v_" + moduloForm;
  const nameTable = moduloForm;
  const cmd_getForm = "/" + moduloForm + "/" + moduloForm + "sel/getrow/";
  const cmd_getGrid = "/" + moduloForm + "/" + moduloForm + "sel/leggi";

  const [focusForm, setFocusForm] = useState("");
  const [statoGriglia, setStatoGriglia] = useState("");
  const [reloadGriglia, setReloadGriglia] = useState(0);
  const [idobj_T, setIdobj_T] = useState(0);
  const { onChangeSelected, onReset, formValue } = useForm();

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
        >
          <FrameContainer id="frame_1">
            <Frame label="DATI DI PROVA 1">
              <FrameInRow width={[80, 10, 10]}>
                <Input
                  label="prova"
                  id="Soggetti_Nome1"
                  val={formValue}
                ></Input>
                <Input
                  label="prova"
                  id="Soggetti_Nome2"
                  val={formValue}
                ></Input>
                <InputData
                  label="Scadenza"
                  id="Soggetti_ScadenzaOBJ"
                  val={formValue}
                />
              </FrameInRow>
              <FrameInRow width={[30, 30, 40]}>
                <InputCheckBox label="checkbox" val={formValue} />
                <InputList
                  label="Natura iva"
                  id="Ive_Natura"
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/" +
                    moduloForm +
                    "/" +
                    moduloForm +
                    "sel/legginaturaiva"
                  }
                  nameList="v_naturaiva"
                  field_id="IDOBJ"
                  field_description={[
                    "NaturaIVA_Codice",
                    "NaturaIVA_Descrizione",
                  ]}
                  val={formValue}
                />
              </FrameInRow>
            </Frame>
            <Frame label="DATI DI PROVA 2">
              <FrameInRow width={[80, 10, 10]}>
                <Input
                  label="prova"
                  id="Soggetti_Nome1"
                  val={formValue}
                ></Input>
                <Input
                  label="prova"
                  id="Soggetti_Nome2"
                  val={formValue}
                ></Input>
                <InputData
                  label="Scadenza"
                  id="Soggetti_ScadenzaOBJ"
                  val={formValue}
                />
              </FrameInRow>
              <FrameInRow width={[30, 30, 40]}>
                <InputCheckBox label="checkbox" val={formValue} />
                <InputList
                  label="Natura iva"
                  id="Ive_Natura"
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/" +
                    moduloForm +
                    "/" +
                    moduloForm +
                    "sel/legginaturaiva"
                  }
                  nameList="v_naturaiva"
                  field_id="IDOBJ"
                  field_description={[
                    "NaturaIVA_Codice",
                    "NaturaIVA_Descrizione",
                  ]}
                  val={formValue}
                />
              </FrameInRow>
            </Frame>
          </FrameContainer>
          <FrameContainer id="frame_4">
            <Frame label="DATI DI PROVA 4">
              <FrameInRow width={[80, 10, 10]}>
                <Input
                  label="prova"
                  id="Soggetti_Nome1"
                  val={formValue}
                ></Input>
                <Input
                  label="prova"
                  id="Soggetti_Nome2"
                  val={formValue}
                ></Input>
                <InputData
                  label="Scadenza"
                  id="Soggetti_ScadenzaOBJ"
                  val={formValue}
                />
              </FrameInRow>
              <FrameInRow width={[30, 30, 40]}>
                <InputCheckBox label="checkbox" val={formValue} />
                <InputList
                  label="Natura iva"
                  id="Ive_Natura"
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/" +
                    moduloForm +
                    "/" +
                    moduloForm +
                    "sel/legginaturaiva"
                  }
                  nameList="v_naturaiva"
                  field_id="IDOBJ"
                  field_description={[
                    "NaturaIVA_Codice",
                    "NaturaIVA_Descrizione",
                  ]}
                  val={formValue}
                />
              </FrameInRow>
            </Frame>
          </FrameContainer>
        </Form>
      )}
    </>
  );
};
export default Project;
