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
    "/soggettivarianti/soggettivariantisel/leggidomicili";

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

  const { onChangeSelected, onReset, onChangeForm } = useForm(
    "form_t",
    REACT_APP_SERVERAPI +
      "api/axo_sel/" +
      localStorage.getItem("axn_token") +
      cmd_getForm,
    nameTable
  );

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
    onChangeSelected(idobj_T);
  };
  const onChangeRow = (idobj) => {
    setIdobj_T(idobj);
    setFocusForm("form_t");
    setStatoGriglia("");
    onChangeSelected(idobj);
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
          onChangeValue={onChangeForm}
        >
          <FrameContainer id="frame_1">
            <Frame label="DATI DI PROVA 1">
              <FrameInRow width={[80, 10, 10]}>
                <Input
                  label="prova"
                  id="Soggetti_Nome1"
                  onChange={onChangeInput}
                  validate={[{ type: "obb", message: "Soggetto obbligatorio" }]}
                ></Input>
                <InputList
                  label="Tipo"
                  id="Soggetti_Tipo"
                  nameList="v_soggettitipo"
                  field_id="IDOBJ"
                  field_description={["SoggettiTipo_Descrizione"]}
                  defList={[
                    { IDOBJ: 1, SoggettiTipo_Descrizione: "Privato" },
                    { IDOBJ: 2, SoggettiTipo_Descrizione: "Società" },
                    { IDOBJ: 3, SoggettiTipo_Descrizione: "Ente" },
                  ]}
                  onChangeValue={onChangeForm}
                  onChange={onChangeInput}
                />
                <InputList
                  label="Esigibilità iva"
                  id="Soggetti_IVAEsigibilita"
                  nameList="ivaesigibilita"
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
                  onChangeValue={onChangeForm}
                  onChange={onChangeInput}
                />
                <InputCheckBox
                  label="Raggruppa bolle"
                  id="Soggetti_RaggruppaBolle"
                  onChangeValue={onChangeForm}
                  onChange={onChangeInput}
                />
                <Input
                  label="prova"
                  id="Ive_Valore"
                  type="textarea"
                  onChange={onChangeInput}
                ></Input>
                <InputData
                  label="Scadenza"
                  id="Soggetti_ScadenzaOBJ"
                  onChange={onChangeInput}
                  onChangeValue={onChangeForm}
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
                  onChangeValue={onChangeForm}
                  onChange={onChangeInput}
                  numerocaratteri={3}
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
              onDoubleClickRow={(IDOBJ, item) => {}}
              pidobj={idobj_T}
              onBtnDelete={() => {}}
              btn_insert={true}
              nameView={"v_soggettidomicili"}
              reload={domiciliReloadGriglia}
              itemSearch={domiciliItemsSearch}
              formTitle="Inserisci"
              dbForm="soggettivarianti"
            >
              <FrameInRow width={[50, 50]}>
                <Input label="Nome" id="SoggettiVarianti_Nome1" />
                <Input label="Cognome" id="SoggettiVarianti_Nome2" />
              </FrameInRow>
              <FrameInRow width={[100]}>
                <Input label="Indirizzo" id="SoggettiVarianti_Indirizzo" />
              </FrameInRow>
              <FrameInRow width={[100]}>
                <Citta
                  nazione={{ label: "Nazione", id: "SoggettiVarianti_Nazione" }}
                  citta={{ label: "Citta", id: "SoggettiVarianti_Citta" }}
                  provincia={{
                    label: "Provincia",
                    id: "SoggettiVarianti_Prov",
                  }}
                  cap={{ label: "CAP", id: "SoggettiVarianti_CAP" }}
                />
              </FrameInRow>
            </Grid>
          </FrameContainer>
          <FrameContainer id="frame_5">
            <Frame label="Condizioni">
              <FrameInRow width={[30, 20]}>
                <InputList
                  label={"Pagamento"}
                  id={"Soggetti_Pagamento"}
                  onChangeValue={onChangeForm}
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
                <Input
                  label="Margine"
                  id="Soggetti_Margine"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="Sc. Testata 1"
                  id="Soggetti_ScontoT1"
                  onChangeValue={onChangeForm}
                  type="number"
                  max="100"
                  decimali="3"
                />
                <Input
                  label="2"
                  id="Soggetti_ScontoT2"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="3"
                  id="Soggetti_ScontoT3"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="4"
                  id="Soggetti_ScontoT4"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="5"
                  id="Soggetti_ScontoT5"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="Sc. Dettaglio 1"
                  id="Soggetti_ScontoD1"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="2"
                  id="Soggetti_ScontoD2"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="3"
                  id="Soggetti_ScontoD3"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="4"
                  id="Soggetti_ScontoD4"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="5"
                  id="Soggetti_ScontoD5"
                  onChangeValue={onChangeForm}
                />
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
                  onChangeValue={onChangeForm}
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
                  onChangeValue={onChangeForm}
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
                  onChangeValue={onChangeForm}
                  onChange={onChangeInput}
                />
                <InputList
                  label={"Vettore"}
                  id={"Soggetti_Vettore"}
                  onChangeValue={onChangeForm}
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
                <Input
                  label="IBAN"
                  id="Soggetti_IBAN"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="Swift"
                  id="Soggetti_Swift"
                  onChangeValue={onChangeForm}
                />
                <Input label="Banca Azienda" />
              </FrameInRow>
              <FrameInRow width={[20, 20, 20]}>
                <Input
                  label="ABI"
                  id="Soggetti_ABI"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="CAB"
                  id="Soggetti_CAB"
                  onChangeValue={onChangeForm}
                />
              </FrameInRow>
            </Frame>
            <Frame label="Coordinate fiscali">
              <FrameInRow width={[20, 2, 10, 20]}>
                <Input
                  label="Cod. Fiscale"
                  id="Soggetti_CodFisc"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="PIVA"
                  id="Soggetti_PIVANaz"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="-"
                  id="Soggetti_PIVA"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="Cod. Destinazione SDI"
                  id="Soggetti_CodiceSDI"
                  onChangeValue={onChangeForm}
                />
                <Input
                  label="Cod. C.C.I.A.A."
                  id="Soggetti_CCIAA"
                  onChangeValue={onChangeForm}
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
