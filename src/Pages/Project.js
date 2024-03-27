import React, { useState, useEffect } from "react";
import {
  useForm,
  Input,
  InputList,
  Form,
  FormButton,
  FrameContainer,
  Frame,
  FrameInRow,
  Grid,
} from "../lib/index";
import { useEnv } from "axonalib";

const Project = ({ request, list }) => {
  const { REACT_APP_SERVERAPI } = useEnv();
  // const urlPost = "https://svil.axonasrl.com:4411/api/axo_sel";
  const moduloForm = "contratti";
  const nameView = "v_" + moduloForm;
  const nameTable = moduloForm;
  const cmd_getForm = "/" + moduloForm + "/" + moduloForm + "sel/getrow/";
  const cmd_getGrid = "/" + moduloForm + "/" + moduloForm + "sel/leggi";
  const cmd_getFormCartelli = "/" + moduloForm + "/cartellisel/getrow/";
  const cmd_getFormEventi = "/" + moduloForm + "/contrattieventisel/getrow/";
  const cmd_getCartelliGrid = "/contratti/cartellisel/leggi";
  const cmd_getCartelliEventiGrid = "/contratti/contrattieventisel/leggi";

  const itemsSearch = ["Soggetti_Nome1", "Soggetti_Nome2"];
  const [focusForm, setFocusForm] = useState("");
  const [statoGriglia, setStatoGriglia] = useState("");
  const [reloadGriglia, setReloadGriglia] = useState(0);
  const [idobj_T, setIdobj_T] = useState(0);
  const [idobj_Cartelli, setIdobj_Cartelli] = useState(0);
  const [idobj_Eventi, setIdobj_Eventi] = useState(0);

  const { onChangeSelected, onReset, onChangeForm } = useForm(
    "form_t",
    REACT_APP_SERVERAPI +
      "api/axo_sel/" +
      localStorage.getItem("axn_token") +
      cmd_getForm,
    nameTable
  );

  const insertClickHandler = (idGriglia) => {
    const idform = "form_" + idGriglia.split("_")[1];
    onReset();
    setFocusForm(idform);
    setIdobj_T(0);
  };
  const deleteClickHandler = (idGriglia) => {};

  const onLoadRow = () => {
    setReloadGriglia((item) => {
      return item + 1;
    });
    onChangeSelected(idobj_T);
  };
  const onChangeRow = (idobj, items) => {
    setIdobj_T(idobj);
    setFocusForm("form_t");
    onChangeSelected(idobj);
  };

  const onChangeRowCartelli = (idobj, items) => {
    setIdobj_Cartelli(idobj);
  };
  const onChangeRowEventi = (idobj, items) => {
    setIdobj_Eventi(idobj);
  };
  const onChangeInput = () => {};

  const generaInvioMail = (
    idobj,
    blob,
    destinatario = "marcocareddulavoro@gmail.com",
    ccn = "",
    oggetto = "Nuovo Contratto",
    corpoMail = "refCorpoMail.current.value"
  ) => {
    const b64appoggio = {
      idobj: idobj,
      b64: blob,
      destinatario: destinatario,
      ccn: ccn,
      oggetto: oggetto,
      corpoMail: corpoMail,
    };
    return b64appoggio;
  };

  useEffect(() => {
    const loadRequest = () => {};
    loadRequest();
  }, [request]);

  const itemFolders = list.filter((item) => item.nameView === "v_configfolder");
  const listaImpianti = list.filter((item) => item.nameView === "v_impianti");
  const listaAgenti = list.filter((item) => item.nameView === "v_agenti");
  const listaClienti = list.filter((item) => item.nameView === "v_clienti");

  return (
    <>
      <Frame
        label='CONTRATTI'
        type='form_t'
        stato={statoGriglia}
        onActive={() => {
          setFocusForm("form_t");
        }}
        ridimensiona={true}
        setup={true}
        icon={"faFileSignature"}
        frameSize={2}
      >
        <Grid
          id='maint_t'
          loadGrid={
            REACT_APP_SERVERAPI +
            "api/axo_sel/" +
            localStorage.getItem("axn_token") +
            cmd_getGrid
          }
          onClickRow={(IDOBJ, items) => {
            onChangeRow(IDOBJ, items);
          }}
          onDoubleClickRow={() => {}}
          onBtnInsert={insertClickHandler}
          onBtnDelete={deleteClickHandler}
          btn_insert={false}
          nameView={nameView}
          reload={reloadGriglia}
          itemSearch={itemsSearch}
          selezionato={focusForm === "form_t" ? true : false}
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
          <FrameContainer id='terget_folder'>
            <Frame
              label='ANAGRAFICA'
              icon={"faAddressCard"}
              ridimensiona={true}
            >
              {/* RIGA 1*/}
              <FrameInRow width={[5, 10, 5, 10, 20]}>
                <Input
                  label='N° Contratto'
                  id='Contratti_Numero'
                  onChange={onChangeInput}
                  type='number'
                  disabled={true}
                  align='right'
                />

                <Input
                  label='Data Stipula'
                  id='Contratti_DataStipula'
                  onChange={onChangeInput}
                  type='date'
                  disabled={true}
                />

                <Input
                  label='Durata Mesi'
                  onChange={onChangeInput}
                  id='Contratti_Pre_Durata'
                  disabled={true}
                  align={"right"}
                />

                <Input
                  label='Data Scadenza'
                  id='Contratti_ScadenzaObj'
                  onChange={onChangeInput}
                  type='date'
                  disabled={true}
                />
                <InputList
                  label='Stato Contratto'
                  id='Contratti_Stato'
                  nameList='contrattitipo'
                  field_id='IDOBJ'
                  field_description={["Contratti_StatoDescrizione"]}
                  defList={[
                    {
                      data: [
                        { IDOBJ: 0, Contratti_StatoDescrizione: "Bozza" },
                        { IDOBJ: 1, Contratti_StatoDescrizione: "Attivo" },
                        {
                          IDOBJ: 2,
                          Contratti_StatoDescrizione: "Scaduto",
                        },
                        {
                          IDOBJ: 3,
                          Contratti_StatoDescrizione: "Cessato",
                        },
                        {
                          IDOBJ: 10,
                          Contratti_StatoDescrizione: "Da rinnovare",
                        },
                      ],
                    },
                  ]}
                  onChange={onChangeInput}
                />
              </FrameInRow>

              {/* RIGA 2*/}
              <FrameInRow width={[100]}>
                <InputList
                  label='Cliente'
                  id='Contratti_Cliente'
                  nameList='v_clienti'
                  field_id='IDOBJ'
                  field_description={["Soggetti_Nome1", "Soggetti_Nome2"]}
                  defList={listaClienti}
                  onChange={onChangeInput}
                />
              </FrameInRow>

              {/* RIGA 3*/}
              <FrameInRow width={[100]}>
                <InputList
                  label='Agente'
                  id='Contratti_Agente'
                  nameList='contrattitipo'
                  field_id='IDOBJ'
                  field_description={["Soggetti_Nome1", "Soggetti_Nome2"]}
                  defList={listaAgenti}
                  onChange={onChangeInput}
                />
              </FrameInRow>

              {/* RIGA 4*/}
              <FrameInRow width={[20]}>
                <div
                  style={{
                    width: "50%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "end",
                  }}
                >
                  {/* <span style={{ marginRight: "5px" }}>€</span> */}
                  <Input
                    label='Canone Mensile'
                    type='number'
                    onChange={onChangeInput}
                    id='Contratti_Pre_Canone'
                    align={"right"}
                  />
                  ,00
                </div>
              </FrameInRow>

              {/* RIGA 5*/}
              <FrameInRow width={[100]}>
                <Input
                  label='Ragione Sociale'
                  id='Contratti_Pre_RagioneSociale'
                  onChange={onChangeInput}
                  disabled={true}
                />
              </FrameInRow>

              {/* RIGA 6*/}
              <FrameInRow width={[100]}>
                <Input
                  disabled={true}
                  label='Indirizzo'
                  onChange={onChangeInput}
                  id='Contratti_Pre_ClienteIndirizzo'
                />
              </FrameInRow>

              {/* RIGA 7*/}
              <FrameInRow width={[100]}>
                <Input
                  disabled={true}
                  label='Modalità di pagamento comunicata'
                  id='Contratti_Pre_Iban'
                  onChange={onChangeInput}
                />
              </FrameInRow>

              {/*  RIGA 8*/}
              <FrameInRow width={[30, 30, 20, 20]}>
                <Input
                  disabled={true}
                  label='Email'
                  onChange={onChangeInput}
                  id='Contratti_Pre_ClienteMail'
                />

                <Input
                  disabled={true}
                  label='Contatto'
                  onChange={onChangeInput}
                  id='Contratti_Pre_ClienteContatto'
                />

                <Input
                  label='Partita IVA'
                  id='Contratti_Pre_ClientePiva'
                  onChange={onChangeInput}
                  disabled={true}
                />
                <Input
                  label='Cod. Univ.'
                  id='Contratti_Pre_ClienteCodiceUnivoco'
                  onChange={onChangeInput}
                  disabled={true}
                />
              </FrameInRow>

              {/*  RIGA 9*/}
              <FrameInRow width={[100]}>
                <Input
                  disabled={true}
                  label='Nota Contratto'
                  id='Contratti_Pre_NotaCorpo'
                  onChange={onChangeInput}
                />
              </FrameInRow>

              {/* RIGA 10*/}
              <FrameInRow width={[100]}>
                <Input
                  disabled={true}
                  label='Note Specifiche'
                  id='Contratti_Pre_NotaBene'
                  onChange={onChangeInput}
                />
              </FrameInRow>

              {/*  RIGA 11*/}
              <FrameInRow width={[100]}>
                <Input
                  disabled={true}
                  type='input'
                  label='Nota Interna'
                  onChange={onChangeInput}
                  id='Contratti_NotaInterna'
                />
              </FrameInRow>
            </Frame>

            {/* ************CARTELLI************ */}
            <Frame
              label={"CARTELLI"}
              icon={"faSignHanging"}
              ridimensiona={true}
            >
              <Grid
                formTitle={"Cartello"}
                icon={"faSignHanging"}
                id='grid_cartelli'
                pidobj={idobj_T}
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getCartelliGrid
                }
                onClickRow={(IDOBJ) => {
                  onChangeRowCartelli(IDOBJ);
                }}
                onDoubleClickRow={() => {}}
                onBtnInsert={insertClickHandler}
                onBtnDelete={deleteClickHandler}
                btn_insert={true}
                nameView={"v_contratticartelli"}
                reload={reloadGriglia}
                itemSearch={itemsSearch}
                selezionato={focusForm === "form_t" ? true : false}
                dbForm='ContrattiCartelli'
                onActive={() => {}}
              >
                {/* Cartello singolo */}
                {/* RIGA 1 */}
                <FrameInRow width={[30, 70]}>
                  <Input
                    label='Cartello N°'
                    id='ContrattiCartelli_Numero'
                    onChange={onChangeInput}
                    align='right'
                  />

                  <InputList
                    label='Impianto'
                    id='ContrattiCartelli_Impianto'
                    nameList='v_impianti'
                    field_id='IDOBJ'
                    field_description={["Impianti_Descrizione"]}
                    defList={listaImpianti}
                    onChange={onChangeInput}
                  />
                </FrameInRow>

                {/* RIGA 2 */}
                <FrameInRow width={[30, 30, 30]}>
                  <Input
                    label='Data Installazione'
                    type='date'
                    id='ContrattiCartelli_DataInstallazione'
                    onChange={onChangeInput}
                  />
                  <Input
                    label='Durata Mesi'
                    id='ContrattiCartelli_NumeroMesi'
                    onChange={onChangeInput}
                    align='right'
                  />
                  <Input
                    label='Data Scadenza'
                    type='date'
                    id='ContrattiCartelli_ScadenzaObj'
                    onChange={onChangeInput}
                  />
                </FrameInRow>

                {/* RIGA 3 */}
                <FrameInRow width={[30, 30]}>
                  <Input
                    label='Data Rimozione'
                    id='ContrattiCartelli_DataDisdetta'
                    onChange={onChangeInput}
                    type='date'
                  />
                  <Input
                    label='Data Disdetta'
                    type='date'
                    id='ContrattiCartelli_DataDisdetta'
                    onChange={onChangeInput}
                  />
                </FrameInRow>

                {/* RIGA 4 */}
                <FrameInRow width={[100]}>
                  <Input
                    id='ContrattiCartelli_Testo'
                    label='Testo cartello'
                    type='text'
                    onChange={onChangeInput}
                  />
                </FrameInRow>

                {/* RIGA 5 */}
                <FrameInRow width={[100]}>
                  <Input
                    id='ContrattiCartelli_Descrizione'
                    label='Nota Aggiuntiva'
                    type='text'
                    onChange={onChangeInput}
                  />
                </FrameInRow>
              </Grid>
            </Frame>

            {/* ************EVENTI************ */}
            <Frame label={"EVENTI"} icon={"faCalendarDays"} ridimensiona={true}>
              <Grid
                icon={"faCalendarDays"}
                formTitle={"Evento"}
                id='grid_eventi'
                pidobj={idobj_Cartelli}
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getCartelliEventiGrid
                }
                onClickRow={(IDOBJ) => {
                  onChangeRowEventi(IDOBJ);
                }}
                onDoubleClickRow={() => {}}
                onBtnInsert={insertClickHandler}
                onBtnDelete={deleteClickHandler}
                btn_insert={true}
                nameView={"v_contrattieventi"}
                reload={reloadGriglia}
                itemSearch={itemsSearch}
                selezionato={focusForm === "form_t" ? true : false}
                dbForm='ContrattiEventi'
              >
                {/* Singolo Evento */}
                {/* PRIMA RIGA */}
                <FrameInRow width={[20, 30]}>
                  <InputList
                    label='Tipo'
                    id='ContrattiEventi_Tipo'
                    nameList='v_impianti'
                    field_id='IDOBJ'
                    field_description={["Eventi_Tipo"]}
                    defList={[
                      {
                        data: [
                          {
                            IDOBJ: 1,
                            Eventi_Tipo: "Rinnovo",
                          },
                          {
                            IDOBJ: 2,
                            Eventi_Tipo: "Disdetta",
                          },
                        ],
                      },
                    ]}
                    onChange={onChangeInput}
                  />

                  <Input
                    label='Scadenza Evento'
                    type='date'
                    id='ContrattiEventi_ScadenzaObj'
                    onChange={onChangeInput}
                  />
                </FrameInRow>

                {/* SECONDA RIGA */}
                <FrameInRow width={[30, 20]}>
                  <Input
                    label='Data Inizio'
                    type='date'
                    id='ContrattiEventi_DataInizio'
                    onChange={onChangeInput}
                  />
                  <Input
                    type={"number"}
                    label='Importo Iscrizione'
                    id='ContrattiEventi_Importo'
                    onChange={onChangeInput}
                    placeholder={"€"}
                  />
                </FrameInRow>

                {/* TERZO RIGA */}
                <FrameInRow width={[100]}>
                  <Input
                    id='ContrattiEventi_Nota'
                    label='Note Aggiuntive'
                    type='text'
                    onChange={onChangeInput}
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
