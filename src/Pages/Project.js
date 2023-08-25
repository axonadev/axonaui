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
import GridForm from "../lib/components/Grid/GridForm";

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
  const [showDomicili, setShowDomicili] = useState(false);

  const { onChangeSelected, onReset, onChangeForm, formValue } =
    useForm("form_t");

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
  const domiciliInsertClickHandler = (idGriglia) => {
    setIdobj_Domicili(0);
    setShowDomicili(true);
  };
  const domiciliModClickHandler = (idGriglia) => {
    setShowDomicili(true);
  };
  const domiciliDeleteClickHandler = (idGriglia) => {
    setShowDomicili(false);
  };
  const domiciliSaveClickHandler = () => {
    console.log("sroooooo");
    setShowDomicili(false);
  };
  const domiciliStopClickHandler = () => {
    setShowDomicili(false);
    console.log("sroooooo");
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
                  id="Soggetti_Nome1"
                  onChange={onChangeInput}
                  onChangeValue={onChangeForm}
                ></Input>
                <Input
                  label="prova"
                  id="Ive_Valore"
                  onChange={onChangeInput}
                ></Input>
                <InputData
                  label="Scadenza"
                  id="Soggetti_ScadenzaOBJ"
                  onChange={onChangeInput}
                />
              </FrameInRow>
              <FrameInRow width={[5, 25, 20, 10]}>
                <InputCheckBox label="checkbox" onChange={onChangeInput} />
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
                  db_target="SoggettiTipi"
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
                  onChangeValue={onChangeForm}
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
              onDoubleClickRow={domiciliModClickHandler}
              onBtnInsert={domiciliInsertClickHandler}
              onBtnDelete={domiciliDeleteClickHandler}
              btn_insert={true}
              nameView={"v_soggettidomicili"}
              reload={domiciliReloadGriglia}
              itemSearch={domiciliItemsSearch}
            />
          </FrameContainer>
          <FrameContainer id="frame_5">
            <Frame label="Condizioni">
              <FrameInRow width={[30, 20]}>
                <InputList
                  label={"Pagamento"}
                  id={"Soggetti_Pagamento"}
                  val={formValue}
                  onChange={() => {}}
                  field_id="IDOBJ"
                  field_description={["Pagamenti_Descrizione"]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/pagamenti/pagamentisel/leggicombo"
                  }
                  nameList="v_pagamenti"
                />
                <InputList
                  label={"Divisa"}
                  id={"Soggetti_Divisa"}
                  onChangeValue={onChangeForm}
                  onChange={() => {}}
                  field_id="IDOBJ"
                  field_description={["Divise_Descrizione"]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/divise/divisesel/leggicombo"
                  }
                  nameList="v_divise"
                />
              </FrameInRow>
              <FrameInRow width={[10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]}>
                <Input label="Margine" id="Soggetti_Margine" val={formValue} />
                <Input
                  label="Sc. Testata 1"
                  id="Soggetti_ScontoT1"
                  val={formValue}
                  type="number"
                  max="100"
                  decimali="3"
                />
                <Input
                  label="2"
                  id="Soggetti_ScontoT2"
                  val={formValue}
                  onChangeValue={onChangeForm}
                />
                <Input label="3" id="Soggetti_ScontoT3" val={formValue} />
                <Input label="4" id="Soggetti_ScontoT4" val={formValue} />
                <Input label="5" id="Soggetti_ScontoT5" val={formValue} />
                <Input
                  label="Sc. Dettaglio 1"
                  id="Soggetti_ScontoD1"
                  val={formValue}
                />
                <Input label="2" id="Soggetti_ScontoD2" val={formValue} />
                <Input label="3" id="Soggetti_ScontoD3" val={formValue} />
                <Input label="4" id="Soggetti_ScontoD4" val={formValue} />
                <Input label="5" id="Soggetti_ScontoD5" val={formValue} />
              </FrameInRow>
              <FrameInRow width={[20, 60, 20]}>
                <InputList
                  label={"Iva"}
                  id={"Soggetti_Iva"}
                  onChangeValue={onChangeForm}
                  onChange={() => {}}
                  field_id="IDOBJ"
                  field_description={["Ive_Descrizione"]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/ive/ivesel/leggicombo"
                  }
                  nameList="v_ive"
                />
                <Input
                  label="Lettera di Intento"
                  id="Soggetti_LetteraIntento"
                  val={formValue}
                />

                <InputList
                  label="Esigibilità iva"
                  id="Soggetti_IVAEsigibilita"
                  nameList="v_esigibilitaiva"
                  field_id="IDOBJ"
                  field_description={["IVAEsigibilita_Descrizione"]}
                  defList={[
                    {
                      IDOBJ: 1,
                      IVAEsigibilita_Descrizione:
                        "IVA ad esigibilità immediata",
                    },
                    {
                      IDOBJ: 2,
                      IVAEsigibilita_Descrizione:
                        "IVA ad esigibilità differita",
                    },
                    {
                      IDOBJ: 3,
                      IVAEsigibilita_Descrizione: "Scissione dei pagamenti",
                    },
                  ]}
                  val={formValue}
                  onChange={onChangeInput}
                />
              </FrameInRow>
              <FrameInRow width={[20, 20, 20, 20]}>
                <InputList
                  label="Tipo Trasporto"
                  id="Soggetti_TipoTrasporto"
                  nameList="v_tipotrasporto"
                  field_id="IDOBJ"
                  field_description={["TipoTrasporto_Descrizione"]}
                  defList={[
                    {
                      IDOBJ: 1,
                      TipoTrasporto_Descrizione: "Mittente",
                    },
                    {
                      IDOBJ: 2,
                      TipoTrasporto_Descrizione: "Destinatario",
                    },
                    {
                      IDOBJ: 3,
                      TipoTrasporto_Descrizione: "Vettore",
                    },
                  ]}
                  onChangeValue={onChangeForm}
                  onChange={onChangeInput}
                />
                <InputList
                  label="Porto"
                  id="Soggetti_Porto"
                  nameList="v_porto"
                  field_id="IDOBJ"
                  field_description={["Porto_Descrizione"]}
                  defList={[
                    {
                      IDOBJ: 1,
                      Porto_Descrizione: "Franco",
                    },
                    {
                      IDOBJ: 2,
                      Porto_Descrizione: "Assegnato",
                    },
                  ]}
                  val={formValue}
                  onChange={onChangeInput}
                />
                <InputList
                  label={"Vettore"}
                  id={"Soggetti_Vettore"}
                  val={formValue}
                  onChange={() => {}}
                  field_id="IDOBJ"
                  field_description={["Nome", "Cognome"]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/soggetti/soggettisel/leggivettori"
                  }
                  nameList="v_soggetti"
                />
              </FrameInRow>
            </Frame>
            <Frame label="Banca per ricevute bancarie">
              <FrameInRow width={[20, 20, 20]}>
                <Input label="IBAN" id="Soggetti_IBAN" val={formValue} />
                <Input label="Swift" id="Soggetti_Swift" val={formValue} />
                <Input label="Banca Azienda" />
              </FrameInRow>
              <FrameInRow width={[20, 20, 20]}>
                <Input label="ABI" id="Soggetti_ABI" val={formValue} />
                <Input label="CAB" id="Soggetti_CAB" val={formValue} />
              </FrameInRow>
            </Frame>
            <Frame label="Coordinate fiscali">
              <FrameInRow width={[20, 2, 10, 20]}>
                <Input
                  label="Cod. Fiscale"
                  id="Soggetti_CodFisc"
                  val={formValue}
                />
                <Input label="PIVA" id="Soggetti_PIVANaz" val={formValue} />
                <Input label="-" id="Soggetti_PIVA" val={formValue} />
                <Input
                  label="Cod. Destinazione SDI"
                  id="Soggetti_CodiceSDI"
                  val={formValue}
                />
                <Input
                  label="Cod. C.C.I.A.A."
                  id="Soggetti_CCIAA"
                  val={formValue}
                />
              </FrameInRow>
            </Frame>
          </FrameContainer>
        </Form>
      )}
      {showDomicili && (
        <GridForm
          onSave={domiciliSaveClickHandler}
          onStop={domiciliStopClickHandler}
          pidobj={idobj_T}
          idobj={idobj_Domicili}
          id="form_domicili"
          modulo="soggetti"
          db="soggettivarianti"
        >
          <FrameContainer>
            <FrameInRow width={[50, 50]}>
              <Input label="IDOBJ" id="IDOBJ" val={formValue} />
              <Input label="PIDOBJ" id="PIDOBJ" val={formValue} />
            </FrameInRow>
            <FrameInRow width={[50, 50]}>
              <Input label="Nome" id="SoggettiVarianti_Nome1" val={formValue} />
              <Input
                label="Cognome"
                id="SoggettiVarianti_Nome2"
                val={formValue}
              />
            </FrameInRow>
            <FrameInRow width={[100]}>
              <Citta
                nazione={{ label: "Nazione", id: "SoggettiVarianti_Nazione" }}
                citta={{ label: "Citta", id: "SoggettiVarianti_Citta" }}
                provincia={{ label: "Provincia", id: "SoggettiVarianti_Prov" }}
                cap={{ label: "CAP", id: "SoggettiVarianti_CAP" }}
                val={formValue}
                onChangeValue={onChangeForm}
              />
            </FrameInRow>
          </FrameContainer>
        </GridForm>
      )}
    </>
  );
};
export default Project;
