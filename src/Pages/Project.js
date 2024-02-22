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
  Button,
} from "../lib";
import { useEnv } from "axonalib";
import FormButton from "../lib/components/Form/FormButton";
import TextEditor from "../lib/components/TextEditor/TextEditor";
import { Card } from "axonaui";
import ChartBar from "../lib/components/Chart/ChartBar";
import Citta from "../lib/components/UIFrame/Citta";
import InputCheckList from "../lib/components/Input/InputCheckList";

const Project = ({ request, list, help }) => {
  const { REACT_APP_SERVERAPI } = useEnv();
  const moduloForm = "soggetti";
  const nameView = "v_" + moduloForm;
  const nameTable = moduloForm;
  const cmd_getForm = "/" + moduloForm + "/" + moduloForm + "sel/getrow/";
  const cmd_getGrid = "/" + moduloForm + "/" + moduloForm + "sel/leggi";
  const cmd_getDomiciliGrid =
    "/soggettivarianti/soggettivariantisel/leggidomicili";
  const cmd_getContattiGrid =
    "/soggettivarianti/soggettivariantisel/leggicontatti";
  const cmd_getCRMGrid = "/soggetticrm/soggetticrmsel/leggi";
  const cmd_getFattureAutomaticheGrid =
    "/soggettifattureautomatiche/soggettifattureautomatichesel/leggi";
  const cmd_getDotazioniGrid = "/soggettidotazioni/soggettidotazionisel/leggi";
  const cmd_getDotazioniEsterneGrid =
    "/soggettidotazioni/soggettidotazionisel/leggidotazioniesterne";
  const cmd_getNoteGrid = "/soggettinote/soggettinotesel/leggi";
  const cmd_getStoricoPrevGrid = "/soggetti/soggettisel/leggistoricoprev";
  const cmd_getStoricoOrdiniGrid = "/soggetti/soggettisel/leggistoricoordini";
  const cmd_getStoricoDDTGrid = "/soggetti/soggettisel/leggistoricoddt";
  const cmd_getStoricoFattureGrid = "/soggetti/soggettisel/leggistoricofatt";
  const cmd_getLetteraIntentoIvaGrid =
    "/soggettiletteraintentoiva/soggettiletteraintentoivasel/leggi";
  const cmd_getAltriDatiGestionaliGrid =
    "/soggettialtridatigestionali/soggettialtridatigestionalisel/leggi";

  const itemFolders = [
    { key: 1, label: "Anagrafica", img: "anagrafica", target: "anagrafica" },
    { key: 2, label: "Domicili", img: "home", target: "domicili" },
    { key: 3, label: "Contabilità", img: "contabilita", target: "contabilita" },
    { key: 4, label: "CRM", img: "crm", target: "crm" },
    {
      key: 5,
      label: "Fatture Automatiche",
      img: "fattura",
      target: "fattureautomatiche",
    },
    { key: 6, label: "Dotazioni", img: "list", target: "dotazioni" },
    { key: 7, label: "Note", img: "note", target: "note" },
    { key: 8, label: "GDPR", img: "gdpr", target: "gdpr" },
    { key: 9, label: "Storico", img: "pergamena", target: "pergamenta" },
    {
      key: 10,
      label: "Altri dati gestionali",
      img: "anagrafica",
      target: "altridati",
    },
  ];

  const itemsSearch = ["Soggetti_Nome1", "Soggetti_Nome2"];

  const domiciliItemsSearch = ["Nome", "Cognome"];

  const [focusForm, setFocusForm] = useState("");
  const [statoGriglia, setStatoGriglia] = useState("");
  const [reloadGriglia, setReloadGriglia] = useState(0);

  const [idobj_T, setIdobj_T] = useState(0);
  const [idobj_Famiglie, setIdobj_Famiglie] = useState(0);

  const { onChangeSelected, onReset, onChangeForm } = useForm(
    "form_t",
    REACT_APP_SERVERAPI +
      "api/axo_sel/" +
      localStorage.getItem("axn_token") +
      cmd_getForm,
    nameTable
  );

  const listPagamenti = list.filter((item) => item.nameView === "v_pagamenti");

  const listDivisa = list.filter((item) => item.nameView === "v_divise");

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

  const onChangeInput = () => {};

  useEffect(() => {
    const loadRequest = () => {};

    loadRequest();
  }, [request]);

  return (
    <>
      <Frame
        label='TESTATA'
        type='form_t'
        stato={statoGriglia}
        ridimensiona={true}
        setup={true}
      >
        <Grid
          id='maint_t'
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
          btn_insert={true}
          nameView={nameView}
          reload={reloadGriglia}
          itemSearch={itemsSearch}
        />
      </Frame>
      <FormButton onAnnulla={onLoadRow} id_submit='form_t' />
      {focusForm === "form_t" && (
        <Form
          id='form_t'
          idobj={idobj_T}
          modulo={moduloForm}
          db={nameTable}
          serverApi={REACT_APP_SERVERAPI}
          folders={itemFolders}
          afterSubmit={onLoadRow}
          onAnnulla={onLoadRow}
          onChangeValue={onChangeForm}
        >
          <FrameContainer id='anagrafica' help={help}>
            <Frame label='ANAGRAFICA'>
              <FrameInRow width={[90, 10]}>
                <Frame type='noborder'>
                  <FrameInRow width={[10, 10, 10, 70]}>
                    <Input label='Codice' id='Soggetti_Codice'></Input>
                    <InputList
                      label='Tipo'
                      id='Soggetti_Tipo'
                      nameList='soggettitipo'
                      field_id='IDOBJ'
                      field_description={["SoggettiTipo_Descrizione"]}
                      defList={[
                        { IDOBJ: 1, SoggettiTipo_Descrizione: "Privato" },
                        { IDOBJ: 2, SoggettiTipo_Descrizione: "Società" },
                        { IDOBJ: 3, SoggettiTipo_Descrizione: "Ente" },
                      ]}
                      onChange={onChangeInput}
                    />
                    <InputData
                      label='Scadenza'
                      id='Soggetti_ScadenzaOBJ'
                      onChange={onChangeInput}
                    />
                    <Input
                      label='Holding'
                      id='Soggetti_Holding'
                      onChange={onChangeInput}
                    ></Input>
                  </FrameInRow>
                  <FrameInRow width={[100]}>
                    <Input
                      label='Nome'
                      id='Soggetti_Nome1'
                      validate={[
                        { type: "obb" },
                        { type: "maxlenght", value: 10 },
                      ]}
                    />
                  </FrameInRow>
                  <FrameInRow width={[100]}>
                    <Input
                      label='Cognome'
                      id='Soggetti_Nome2'
                      onChange={onChangeInput}
                    />
                  </FrameInRow>
                  <FrameInRow width={[100]}>
                    <Input
                      label='Indirizzo'
                      id='Soggetti_Indirizzo'
                      onChange={onChangeInput}
                    />
                  </FrameInRow>
                  <FrameInRow width={[70, 10, 20]}>
                    <Citta
                      nazione={{ label: "Nazione", id: "Soggetti_Nazione" }}
                      citta={{ label: "Citta", id: "Soggetti_Citta" }}
                      provincia={{ label: "Provincia", id: "Soggetti_Prov" }}
                      cap={{ label: "CAP", id: "Soggetti_CAP" }}
                      onChange={onChangeInput}
                    />
                    <Input
                      label='Regione'
                      id='Soggetti_Regione'
                      onChange={onChangeInput}
                    />
                    <Input
                      label='Zona'
                      id='Soggetti_Zona'
                      onChange={onChangeInput}
                    />
                  </FrameInRow>
                  <FrameInRow width={[20, 20, 20]}>
                    <Input
                      label='Telefono'
                      id='Soggetti_Tel'
                      onChange={onChangeInput}
                    />
                    <Input
                      label='Telefono'
                      id='Soggetti_Tel'
                      onChange={onChangeInput}
                    />

                    <Input
                      label='Rif. amministrativo'
                      id='Soggetti_Tel'
                      onChange={onChangeInput}
                    />
                  </FrameInRow>
                  <FrameInRow width={[20, 20, 20]}>
                    <Input
                      label='Fax'
                      id='Soggetti_Tel'
                      onChange={onChangeInput}
                    />
                    <Input
                      label='PEC'
                      id='Soggetti_Tel'
                      onChange={onChangeInput}
                    />
                  </FrameInRow>
                  <FrameInRow width={[20, 20, 20]}>
                    <Input
                      label='www'
                      id='Soggetti_Tel'
                      onChange={onChangeInput}
                    />
                    <Input
                      label='email'
                      id='Soggetti_Tel'
                      onChange={onChangeInput}
                    />
                  </FrameInRow>
                </Frame>
                <Frame type='noborder'>
                  <InputCheckList
                    label='tipisoggetto'
                    id='tipisoggetto'
                    url={
                      REACT_APP_SERVERAPI +
                      "api/axo_sel/" +
                      localStorage.getItem("axn_token") +
                      "/" +
                      moduloForm +
                      "/" +
                      moduloForm +
                      "sel/leggitipisoggetto/" +
                      idobj_T
                    }
                    nameList='v_tipisoggetto'
                    field_id='IDOBJ'
                    field_description='TipiSoggetto_Descrizione'
                    field_value='valore'
                    field_target='SoggettiTipi_Tipo'
                    db_target='SoggettiTipi'
                    pidobj={idobj_T}
                    onChange={onChangeInput}
                  />
                </Frame>
              </FrameInRow>
            </Frame>
            <Frame label='Condizioni'>
              <FrameInRow width={[15, 15, 15, 15, 15]}>
                <InputCheckBox
                  label='Raggruppa bolle'
                  id='Soggetti_RaggruppaBolle'
                />
                <InputCheckBox label='Raggruppa bolle per Destinazione/Cantiere' />
                <InputCheckBox label='Blocco Amministrativo' />
                <InputCheckBox label='Visualizza articolo per cliente in fattura' />
                <InputCheckBox label='Fatturazione automatica' />
              </FrameInRow>
              <FrameInRow width={[15, 15, 15, 15, 15]}>
                <InputCheckBox label='Non inviare progetto tessera sanitaria' />
                <InputCheckBox label='Prezzo articoli preso da ultima fattura' />
                <InputCheckBox label='Raggruppa preventivi' />
              </FrameInRow>
            </Frame>
          </FrameContainer>
          <FrameContainer id='domicili' help={help}>
            <Frame label='DOMICILI' ridimensiona={true} setup={true}>
              <Grid
                id='grid_domicili'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getDomiciliGrid
                }
                pidobj={idobj_T}
                btn_insert={true}
                onClickRow={() => {}}
                nameView={"v_soggettidomicili"}
                itemSearch={domiciliItemsSearch}
                formTitle='Inserisci'
                dbForm='soggettivarianti'
              >
                <FrameInRow width={["hidden"]}>
                  <Input label='Tipo' id='SoggettiVarianti_Tipo' value='1' />
                </FrameInRow>
                <FrameInRow width={[50, 50]}>
                  <Input label='Nome' id='SoggettiVarianti_Nome1' />
                  <Input label='Cognome' id='SoggettiVarianti_Nome2' />
                </FrameInRow>
                <FrameInRow width={[100]}>
                  <Input label='Indirizzo' id='SoggettiVarianti_Indirizzo' />
                </FrameInRow>
                <FrameInRow width={[100]}>
                  <Citta
                    nazione={{
                      label: "Nazione",
                      id: "SoggettiVarianti_Nazione",
                    }}
                    citta={{ label: "Citta", id: "SoggettiVarianti_Citta" }}
                    provincia={{
                      label: "Provincia",
                      id: "SoggettiVarianti_Prov",
                    }}
                    cap={{ label: "CAP", id: "SoggettiVarianti_CAP" }}
                  />
                </FrameInRow>
              </Grid>
            </Frame>
          </FrameContainer>
          <FrameContainer id='contabilita' help={help}>
            <Frame label='Condizioni'>
              <FrameInRow width={[30, 20]}>
                <InputList
                  label={"Pagamento"}
                  id={"Soggetti_Pagamento"}
                  onChange={() => {}}
                  field_id='IDOBJ'
                  field_description={["Pagamenti_Descrizione"]}
                  nameList='v_pagamenti'
                  defList={listPagamenti}
                />
                <InputList
                  label={"Divisa"}
                  id={"Soggetti_Divisa"}
                  onChange={() => {}}
                  field_id='IDOBJ'
                  field_description={["Divise_Descrizione"]}
                  nameList='v_divise'
                  defList={listDivisa}
                />
              </FrameInRow>
              <FrameInRow width={[10, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]}>
                <Input label='Margine' id='Soggetti_Margine' />
                <Input label='Sc. Testata 1' id='Soggetti_ScontoT1' />
                <Input label='2' id='Soggetti_ScontoT2' />
                <Input label='3' id='Soggetti_ScontoT3' />
                <Input label='4' id='Soggetti_ScontoT4' />
                <Input label='5' id='Soggetti_ScontoT5' />
                <Input label='Sc. Dettaglio 1' id='Soggetti_ScontoD1' />
                <Input label='2' id='Soggetti_ScontoD2' />
                <Input label='3' id='Soggetti_ScontoD3' />
                <Input label='4' id='Soggetti_ScontoD4' />
                <Input label='5' id='Soggetti_ScontoD5' />
              </FrameInRow>
              <FrameInRow width={[20, 60, 20]}>
                <InputList
                  label={"Iva"}
                  id={"Soggetti_Iva"}
                  onChange={() => {}}
                  field_id='IDOBJ'
                  field_description={["Ive_Descrizione"]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/ive/ivesel/leggicombo"
                  }
                  nameList='v_ive'
                />
                <Input
                  label='Lettera di Intento'
                  id='Soggetti_LetteraIntento'
                  onChange={onChangeInput}
                />

                <InputList
                  label='Esigibilità iva'
                  id='Soggetti_IVAEsigibilita'
                  nameList='esigibilitaiva'
                  field_id='IDOBJ'
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
                  onChange={onChangeInput}
                />
              </FrameInRow>
              <FrameInRow width={[20, 20, 20, 20]}>
                <InputList
                  label='Tipo Trasporto'
                  id='Soggetti_TipoTrasporto'
                  nameList='v_tipotrasporto'
                  field_id='IDOBJ'
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
                  onChange={onChangeInput}
                />
                <InputList
                  label='Porto'
                  id='Soggetti_Porto'
                  nameList='v_porto'
                  field_id='IDOBJ'
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
                  onChange={onChangeInput}
                />
                <InputList
                  label={"Vettore"}
                  id={"Soggetti_Vettore"}
                  onChange={() => {}}
                  field_id='IDOBJ'
                  field_description={["Nome", "Cognome"]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/soggetti/soggettisel/leggivettori"
                  }
                  nameList='v_soggetti'
                />
              </FrameInRow>
            </Frame>
            <Frame label='Banca per ricevute bancarie'>
              <FrameInRow width={[20, 20, 20]}>
                <Input label='IBAN' id='Soggetti_IBAN' />
                <Input label='Swift' id='Soggetti_Swift' />
                <Input label='Banca Azienda' />
              </FrameInRow>
              <FrameInRow width={[20, 20, 20]}>
                <Input label='ABI' id='Soggetti_ABI' />
                <Input label='CAB' id='Soggetti_CAB' />
              </FrameInRow>
            </Frame>
            <Frame label='Coordinate fiscali'>
              <FrameInRow width={[20, 2, 10, 20]}>
                <Input label='Cod. Fiscale' id='Soggetti_CodFisc' />
                <Input label='PIVA' id='Soggetti_PIVANaz' />
                <Input label='-' id='Soggetti_PIVA' />
                <Input label='Cod. Destinazione SDI' id='Soggetti_CodiceSDI' />
                <Input label='Cod. C.C.I.A.A.' id='Soggetti_CCIAA' />
              </FrameInRow>
            </Frame>
            <Frame label='Lettera intento iva' ridimensiona={true} setup={true}>
              <Grid
                id='grid_letteraintentoiva'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getLetteraIntentoIvaGrid
                }
                onClickRow={(IDOBJ) => {}}
                pidobj={idobj_T}
                onDoubleClickRow={() => {}}
                onBtnInsert={() => {}}
                onBtnDelete={() => {}}
                btn_insert={true}
                nameView={"v_soggettiletteraintentoiva"}
                itemSearch={domiciliItemsSearch}
                formTitle='Inserisci'
                dbForm='soggettiletteraintentoiva'
              >
                <FrameInRow width={[70, 10, 10, 10]}>
                  <Input
                    label='Numero di protocollo'
                    id='SoggettiLetteraIntentoIva_Protocollo'
                  />
                  <InputData
                    label='Data di protocollo'
                    id='SoggettiLetteraIntentoIva_DataProtocollo'
                  />
                  <InputData
                    label='Data inizio'
                    id='SoggettiLetteraIntentoIva_DataInizio'
                  />
                  <InputData
                    label='Data fine'
                    id='SoggettiLetteraIntentoIva_DataFine'
                  />
                </FrameInRow>
                <FrameInRow width={[30, 30]}>
                  <Input
                    label='Importo'
                    id='SoggettiLetteraIntentoIva_Importo'
                    type='number'
                    decimali='2'
                  />
                  <InputCheckBox
                    label='Abilitato'
                    id='SoggettiLetteraIntentoIva_Abilitato'
                  />
                </FrameInRow>
              </Grid>
            </Frame>
          </FrameContainer>
          <FrameContainer id='crm' help={help}>
            <Frame label='Classificazione'>
              <FrameInRow width={[30, 30]}>
                <InputList
                  label={"Famiglia"}
                  id={"Soggetti_Famiglia"}
                  onChange={(id) => {
                    setIdobj_Famiglie(id);
                  }}
                  field_id='IDOBJ'
                  field_description={["Descrizione"]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/famiglie/famigliesel/leggicombo"
                  }
                  nameList='v_famiglie'
                />
                <InputList
                  label={"Micro Famiglia"}
                  id={"Soggetti_MicroFamiglia"}
                  onChange={() => {}}
                  field_id='IDOBJ'
                  field_description={["Descrizione"]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/famiglie/famigliesel/leggicombomicrofamiglie/" +
                    idobj_Famiglie
                  }
                  nameList='v_microfamiglie'
                />
              </FrameInRow>
              <FrameInRow width={[100]}>
                <Input label='Descrizione attività' />
              </FrameInRow>
              <FrameInRow width={[20, 20]}>
                <InputData
                  label='inizio rapporto'
                  id='Soggetti_InizioRapporto'
                />
                <InputList
                  label='Relazione'
                  id='Soggetti_TipoRelazione'
                  nameList='v_soggettitiporelazione'
                  field_id='IDOBJ'
                  field_description={["SoggettiTipoRelazione_Descrizione"]}
                  defList={[
                    {
                      IDOBJ: 1,
                      SoggettiTipoRelazione_Descrizione: "Censito",
                    },
                    {
                      IDOBJ: 2,
                      SoggettiTipoRelazione_Descrizione: "Potenziale",
                    },
                    {
                      IDOBJ: 3,
                      SoggettiTipoRelazione_Descrizione: "Effettivo",
                    },
                    {
                      IDOBJ: 4,
                      SoggettiTipoRelazione_Descrizione: "Lasciato",
                    },
                    {
                      IDOBJ: 5,
                      SoggettiTipoRelazione_Descrizione: "Perso",
                    },
                  ]}
                  onChange={onChangeInput}
                />
              </FrameInRow>
            </Frame>
            <Frame label='Agente'>
              <FrameInRow width={[20, 10, 40]}>
                <InputList
                  label={"Agente"}
                  id={"Soggetti_Agente"}
                  onChange={() => {}}
                  field_id='IDOBJ'
                  field_description={["Soggetti_Nome1", "Soggetti_Nome2"]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/soggetti/soggettisel/leggiagenti"
                  }
                  nameList='v_agenti'
                />
                <Input
                  label='Provvigione'
                  id='Soggetti_AgenteProvv'
                  type='number'
                  max='100'
                  decimali='2'
                />
              </FrameInRow>
            </Frame>
            <Frame label='Contatti' ridimensiona={true} setup={true}>
              <Grid
                id='grid_contatti'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getContattiGrid
                }
                onClickRow={(IDOBJ) => {}}
                pidobj={idobj_T}
                onDoubleClickRow={() => {}}
                onBtnInsert={() => {}}
                onBtnDelete={() => {}}
                btn_insert={true}
                nameView={"v_soggetticontatti"}
                itemSearch={domiciliItemsSearch}
                formTitle='Inserisci'
                dbForm='soggettivarianti'
              >
                <FrameInRow width={["hidden"]}>
                  <Input label='Tipo' id='SoggettiVarianti_Tipo' value='2' />
                </FrameInRow>
                <FrameInRow width={[50, 50]}>
                  <Input label='Nome' id='SoggettiVarianti_Nome1' />
                  <Input label='Cognome' id='SoggettiVarianti_Nome2' />
                </FrameInRow>
                <FrameInRow width={[30, 30]}>
                  <Input label='Telefono' id='SoggettiVarianti_Tel1' />
                  <Input label='Mail' id='SoggettiVarianti_Email' />
                </FrameInRow>
              </Grid>
            </Frame>
            <Frame
              label='Eventi relativi al soggetto'
              ridimensiona={true}
              setup={true}
            >
              <Grid
                id='grid_crm'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getCRMGrid
                }
                onClickRow={(IDOBJ) => {}}
                pidobj={idobj_T}
                onDoubleClickRow={() => {}}
                onBtnInsert={() => {}}
                onBtnDelete={() => {}}
                btn_insert={true}
                nameView={"v_soggetticrm"}
                itemSearch={domiciliItemsSearch}
                formTitle='Inserisci'
                dbForm='soggetticrm'
              >
                <FrameInRow width={[40, 30, 30]}>
                  <Input label='Riferimento' id='SoggettiCRM_Rif' />
                  <InputData label='Data' id='SoggettiCRM_Data' />
                  <InputData label='Data fine' id='SoggettiCRM_DataFine' />
                </FrameInRow>
                <FrameInRow width={[100]}>
                  <Input
                    type='textarea'
                    label='Descrizione'
                    id='SoggettiCRM_Descrizione'
                  />
                </FrameInRow>
                <FrameInRow width={[40, 30, 30]}>
                  <InputList
                    label='Tipo'
                    id='SoggettiCRM_Tipo'
                    nameList='v_tipo'
                    field_id='IDOBJ'
                    field_description={["SoggettiCRM_TipoDescrizione"]}
                    defList={[
                      {
                        IDOBJ: 1,
                        SoggettiCRM_TipoDescrizione: "Telefono",
                      },
                      {
                        IDOBJ: 2,
                        SoggettiCRM_TipoDescrizione: "Whatsapp",
                      },
                      {
                        IDOBJ: 3,
                        SoggettiCRM_TipoDescrizione: "Mail",
                      },
                      {
                        IDOBJ: 4,
                        SoggettiCRM_TipoDescrizione: "A faccia",
                      },
                      {
                        IDOBJ: 5,
                        SoggettiCRM_TipoDescrizione: "Interno",
                      },
                      {
                        IDOBJ: 6,
                        SoggettiCRM_TipoDescrizione: "Pgm Teleassistenza",
                      },
                    ]}
                  />
                </FrameInRow>
              </Grid>
            </Frame>
          </FrameContainer>
          <FrameContainer id='fattureautomatiche' help={help}>
            <Frame
              label='Articoli che verranno fatturati in modo automatico'
              ridimensiona={true}
              setup={true}
            >
              <Grid
                id='grid_soggettifattureautomatiche'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getFattureAutomaticheGrid
                }
                onClickRow={(IDOBJ) => {}}
                pidobj={idobj_T}
                onDoubleClickRow={() => {}}
                onBtnInsert={() => {}}
                onBtnDelete={() => {}}
                btn_insert={true}
                nameView={"v_soggettifattureautomatiche"}
                itemSearch={domiciliItemsSearch}
                dbForm='soggettifattureautomatiche'
              >
                <FrameInRow width={[40, 30, 20]}>
                  <InputList
                    label='Prodotto/Servizio'
                    id='SoggettiFattureAutomatiche_Prodotto'
                  />
                  <Input
                    label='Prezzo'
                    id='SoggettiFattureAutomatiche_Prezzo'
                    type='number'
                    min='0'
                    decimali='2'
                  />
                  <Input
                    label='Quantità'
                    id='SoggettiFattureAutomatiche_Qta'
                    type='number'
                    min='0'
                  />
                </FrameInRow>
                <FrameInRow width={[50, 10, 10]}>
                  <Input label='Nota' id='SoggettiFattureAutomatiche_Nota' />
                  <Input
                    label='Numero mesi'
                    id='SoggettiFattureAutomatiche_NumeroMesi'
                    type='number'
                    min='0'
                    max='12'
                  />
                  <Input
                    label='Mese'
                    id='SoggettiFattureAutomatiche_Mese'
                    type='number'
                    min='0'
                    max='12'
                  />
                </FrameInRow>
                <FrameInRow width={[30, 30, 30]}>
                  <Input
                    label='Titolo'
                    id='SoggettiFattureAutomatiche_Titolo'
                  />
                  <InputData
                    label='Data Fine'
                    id='SoggettiFattureAutomatiche_DataFine'
                  />
                  <InputList
                    label='Tipo Documento'
                    id='SoggettiFattureAutomatiche_TipoDocumento'
                    defList={[
                      {
                        IDOBJ: 1,
                        Descrizione: "Preventivo",
                      },
                      {
                        IDOBJ: 2,
                        Descrizione: "Ordine Cliente",
                      },
                      {
                        IDOBJ: 3,
                        Descrizione: "DDT",
                      },
                      {
                        IDOBJ: 4,
                        Descrizione: "Fattura",
                      },
                    ]}
                  />
                </FrameInRow>
              </Grid>
            </Frame>
          </FrameContainer>
          <FrameContainer id='dotazioni' help={help}>
            <Frame label='Dotazioni fornite' ridimensiona={true} setup={true}>
              <Grid
                id='grid_dotazioni'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getDotazioniGrid
                }
                onClickRow={(IDOBJ) => {}}
                pidobj={idobj_T}
                onDoubleClickRow={() => {}}
                onBtnInsert={() => {}}
                onBtnDelete={() => {}}
                btn_insert={true}
                nameView={"v_soggettifattureautomatiche"}
                itemSearch={domiciliItemsSearch}
              />
            </Frame>
            <Frame
              label='Dotazioni fornite da ditte esterne'
              ridimensiona={true}
              setup={true}
            >
              <Grid
                id='grid_dotazioniesterne'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getDotazioniEsterneGrid
                }
                pidobj={idobj_T}
                btn_insert={true}
                nameView={"v_soggettifattureautomatiche"}
                itemSearch={domiciliItemsSearch}
              />
            </Frame>
          </FrameContainer>
          <FrameContainer id='note' help={help}>
            <Frame label='Note' ridimensiona={true} setup={true}>
              <Grid
                id='grid_soggettinote'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getNoteGrid
                }
                pidobj={idobj_T}
                onClickRow={() => {}}
                btn_insert={true}
                nameView={"v_soggettinote"}
                itemSearch={domiciliItemsSearch}
                dbForm='soggettinote'
              >
                <FrameInRow width={[100]}>
                  <Input
                    type='textarea'
                    label='Nota'
                    id='SoggettiNote_Descrizione'
                  />
                </FrameInRow>
                <FrameInRow width={[20, 20]}>
                  <Input
                    label='Progressivo'
                    type='number'
                    min='0'
                    id='SoggettiNote_Progressivo'
                  />
                  <InputList
                    label='Tipo Documento'
                    id='SoggettiNote_TipoDocumento'
                    defList={[
                      {
                        IDOBJ: 1,
                        Descrizione: "Preventivo",
                      },
                      {
                        IDOBJ: 2,
                        Descrizione: "Ordine Cliente",
                      },
                      {
                        IDOBJ: 3,
                        Descrizione: "DDT",
                      },
                      {
                        IDOBJ: 4,
                        Descrizione: "Fattura",
                      },
                    ]}
                  />
                </FrameInRow>
              </Grid>
            </Frame>
          </FrameContainer>
          <FrameContainer id='gdpr' help={help}>
            <Frame label='Dati per normativa GDPR'>
              <FrameInRow width={[20, 20, 20]}>
                <InputList
                  label='Tipologia di dato'
                  id='Soggetti_TipoDatiGDPR'
                  nameList='v_soggettitipogdpr'
                  field_id='IDOBJ'
                  field_description={["SoggettiTipoGDPR_Descrizione"]}
                  defList={[
                    {
                      IDOBJ: 1,
                      SoggettiTipoGDPR_Descrizione: "Dati Personali",
                    },
                    {
                      IDOBJ: 2,
                      SoggettiTipoGDPR_Descrizione: "Dati Sensibili",
                    },
                  ]}
                  onChange={onChangeInput}
                />
                <InputData
                  label='Prima Raccolta'
                  id='Soggetti_PrimaRaccoltaGDPR'
                  onChange={onChangeInput}
                />
                <InputData
                  label='Ultimo ultilizzo'
                  id='Soggetti_UltimoUtilizzoGDPR'
                  onChange={onChangeInput}
                />
              </FrameInRow>
              <FrameInRow width={[100]}>
                <InputList
                  label='Privacy'
                  id='Soggetti_Privacy'
                  nameList='v_soggettiprivacy'
                  field_id='IDOBJ'
                  field_description={["SoggettiTipo_Descrizione"]}
                  defList={[
                    { IDOBJ: 1, SoggettiTipo_Descrizione: "Non Richiesto" },
                    {
                      IDOBJ: 2,
                      SoggettiTipo_Descrizione: "Richiesto Consenso",
                    },
                    { IDOBJ: 3, SoggettiTipo_Descrizione: "Dato Consenso" },
                    { IDOBJ: 4, SoggettiTipo_Descrizione: "Negato Consenso" },
                  ]}
                  onChange={onChangeInput}
                />
              </FrameInRow>
            </Frame>
          </FrameContainer>
          <FrameContainer id='storico' help={help}>
            <Frame label='Preventivi' ridimensiona={true} setup={true}>
              <Grid
                id='grid_soggettistoricoprev'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getStoricoPrevGrid
                }
                pidobj={idobj_T}
                nameView={"v_soggettistorico"}
                itemSearch={domiciliItemsSearch}
              />
            </Frame>
            <Frame label='Ordini' ridimensiona={true} setup={true}>
              <Grid
                id='grid_soggettistoricoordini'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getStoricoOrdiniGrid
                }
                pidobj={idobj_T}
                nameView={"v_soggettistorico"}
                itemSearch={domiciliItemsSearch}
              />
            </Frame>
            <Frame label='DDT' ridimensiona={true} setup={true}>
              <Grid
                id='grid_soggettistoricoddt'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getStoricoDDTGrid
                }
                pidobj={idobj_T}
                nameView={"v_soggettistorico"}
                itemSearch={domiciliItemsSearch}
              />
            </Frame>
            <Frame label='Fatture' ridimensiona={true} setup={true}>
              <Grid
                id='grid_soggettistoricofatture'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getStoricoFattureGrid
                }
                pidobj={idobj_T}
                nameView={"v_soggettistorico"}
                itemSearch={domiciliItemsSearch}
              />
            </Frame>
          </FrameContainer>
          <FrameContainer id='altridati' help={help}>
            <Frame
              label='Altri dati gestionali'
              ridimensiona={true}
              setup={true}
            >
              <Grid
                id='grid_soggettialtridatigestionali'
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getAltriDatiGestionaliGrid
                }
                onClickRow={(IDOBJ) => {}}
                pidobj={idobj_T}
                btn_insert={true}
                formTitle='Inserisci'
                nameView={"v_soggettialtridatigestionali"}
                itemSearch={domiciliItemsSearch}
                dbForm='soggettialtridatigestionali'
              >
                <FrameInRow width={[50, 50]}>
                  <Input
                    label='Tipo Dato'
                    id='SoggettiAltriDatiGestionali_TipoDato'
                  />
                  <Input
                    label='Riferimento Testo'
                    id='SoggettiAltriDatiGestionali_RiferimentoTesto'
                  />
                </FrameInRow>
                <FrameInRow width={[50, 50]}>
                  <Input
                    label='Riferimento Numerico'
                    id='SoggettiAltriDatiGestionali_RiferimentoNumerico'
                    type='number'
                  />
                  <InputData
                    label='Riferimento Data'
                    id='SoggettiAltriDatiGestionali_RiferimentoData'
                  />
                </FrameInRow>
              </Grid>
            </Frame>
          </FrameContainer>
        </Form>
      )}
    </>
  );
};
export default Project;
