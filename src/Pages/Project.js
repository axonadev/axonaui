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

const Project = ({ request, list, help }) => {
  const { REACT_APP_SERVERAPI } = useEnv();
  const numberGrid = 2;
  const moduloForm = "articoli";
  const nameView = "v_" + moduloForm;
  const nameTable = moduloForm;
  const cmd_getForm = "/" + moduloForm + "/" + moduloForm + "sel/getrow/";
  const cmd_getGrid = "/" + moduloForm + "/" + moduloForm + "sel/leggi";
  const cmd_getArticoliVariantiGrid =
    "/articolivarianti/articolivariantisel/leggi";
    console.log(help,"help project");

  const itemFolders = [
    { key: 1, label: "info", img: "info", target: "info" },
    { key: 2, label: "alternativi", img: "info", target: "alternativi" },
    { key: 3, label: "opzioni", img: "info", target: "opzioni" },
  ];
  const itemsSearch = ["Articoli_Codice", "Articoli_Descrizione"];

  const [focusForm, setFocusForm] = useState("");
  const [statoGriglia, setStatoGriglia] = useState("");
  const [reloadGriglia, setReloadGriglia] = useState(0);
  const [idobj_T, setIdobj_T] = useState(0);

  const { onChangeSelected, onReset, onChangeForm } = useForm(
    "form_t",
    REACT_APP_SERVERAPI +
      "api/axo_sel/" +
      localStorage.getItem("axn_token") +
      cmd_getForm,
    nameTable
  );

  const listTipiArticolo = list.filter(
    (item) => item.nameView === "v_tipiarticolo"
  );

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
  useEffect(() => {
    const loadRequest = () => {};

    loadRequest();
  }, [request]);
  return (
    <>
      <Frame
        label="TESTATA"
        type="form_t"
        stato={statoGriglia}
        ridimensiona={true}
        selezionato={focusForm === "form_t" ? true : false}
        onActive={() => {
          setFocusForm("form_t");
        }}
        setup={true}
      >
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
          onActive={() => {
            setFocusForm("form_t");
          }}
          onDoubleClickRow={() => {}}
          onBtnInsert={insertClickHandler}
          onBtnDelete={deleteClickHandler}
          btn_insert={true}
          nameView={nameView}
          reload={reloadGriglia}
          itemSearch={itemsSearch}
          dbForm="articoli"
          selezionato={focusForm === "form_t" ? true : false}
        />
      </Frame>
      <Frame
        label="DETTAGLIO"
        ridimensiona={true}
        setup={true}
        type="form_d"
        stato={statoGriglia}
        selezionato={focusForm === "form_d" ? true : false}
        onActive={() => {
          setFocusForm("form_d");
        }}
      >
        <Grid
          id="maint_d"
          loadGrid={
            REACT_APP_SERVERAPI +
            "api/axo_sel/" +
            localStorage.getItem("axn_token") +
            cmd_getGrid
          }
          onActive={() => {
            setFocusForm("form_d");
          }}
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
          dbForm="articoli"
          selezionato={focusForm === "form_d" ? true : false}
        />
      </Frame>
      <div className="salvachiudi">
      <FormButton
        onAnnulla={onLoadRow}
        id_submit="form_t"
        numberGrid={numberGrid}
      />
      </div>



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
          numberGrid={numberGrid}
        >
           

          <FrameContainer id="info" help={help}>

          
            <Frame label="Anagrafica" >
              <FrameInRow width={[10, 10, 10, 10, 10]}>
              <Input label="Codice" id="Articoli_Codice" helpMessage="sss"></Input>

                <InputList
                  helpMessage="TIPO"
                  label={"Tipo"}
                  id={"Articoli_Tipo"}
                  onChangeValue={() => {}}
                  onChange={() => {}}
                  field_id="IDOBJ"
                  field_description={["TipiArticolo_Descrizione"]}
                  defList={listTipiArticolo}
                  nameList="v_tipiarticolo"
                  numerocaratteri={3}
                  
                />
              </FrameInRow>
              <FrameInRow width={[100]}>
             
              <Input label="Descrizione" id="Articoli_Descrizione" helpMessage="DESCRIZIONE: Questa è la descrizione degli articoli" />
              </FrameInRow>
            </Frame>
            <Frame label="Classificazione">
              <FrameInRow width={[20, 20]}>
                <InputList
                  label={"Marca"}
                  id={"Articoli_Marca"}
                  onChangeValue={() => {}}
                  onChange={() => {}}
                  field_id="IDOBJ"
                  field_description={["Marche_Descrizione"]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/marche/marchesel/leggicombo"
                  }
                  nameList="v_marche"
                  numerocaratteri={3}
               
                />
                <Input label="Modello" id="Articoli_Modello" helpMessage="aaaa"></Input>
              </FrameInRow>
              <FrameInRow width={[20, 20]}>
                <InputList
                  label={"Categoria"}
                  id={"Articoli_Categoria"}
                  onChangeValue={() => {}}
                  onChange={() => {}}
                  field_id="IDOBJ"
                  field_description={["Categorie_Descrizione"]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/categorie/categoriesel/leggicombo"
                  }
                  nameList="v_categorie"
                  numerocaratteri={3}
                />
                <InputList
                  label={"Specialità"}
                  id={"Articoli_Specialita"}
                  onChangeValue={() => {}}
                  onChange={() => {}}
                  field_id="IDOBJ"
                  field_description={["Specialita_Descrizione"]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/specialita/specialitasel/leggicombo"
                  }
                  nameList="v_specialita"
                  numerocaratteri={3}
                />
              </FrameInRow>
            </Frame>
            <Frame label="Parametri quantitativi">
              <FrameInRow width={[20, 20]}>
                <InputList
                  label={"Unità misura"}
                  id={"Articoli_UnitaMisura1"}
                  onChangeValue={() => {}}
                  onChange={() => {}}
                  field_id="IDOBJ"
                  field_description={[
                    "UnitaMisura_Simbolo",
                    "UnitaMisura_Descrizione",
                  ]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/unitamisura/unitamisurasel/leggicombo"
                  }
                  nameList="v_unitamisura"
                  numerocaratteri={3}
                />

                <Input
                  label="Conversione"
                  id="Articoli_UM_Conversione1"
                  type="number"
                ></Input>
              </FrameInRow>
              <FrameInRow width={[20, 20]}>
                <InputList
                  label={"Unità misura"}
                  id={"Articoli_UnitaMisura2"}
                  onChangeValue={() => {}}
                  onChange={() => {}}
                  field_id="IDOBJ"
                  field_description={[
                    "UnitaMisura_Simbolo",
                    "UnitaMisura_Descrizione",
                  ]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/unitamisura/unitamisurasel/leggicombo"
                  }
                  nameList="v_unitamisura"
                  numerocaratteri={3}
                />
                <Input
                  label="Conversione"
                  id="Articoli_UM_Conversione2"
                  type="number"
                ></Input>
              </FrameInRow>
              <FrameInRow width={[20, 20]}>
                <InputList
                  label={"Unità misura"}
                  id={"Articoli_UnitaMisura3"}
                  onChangeValue={() => {}}
                  onChange={() => {}}
                  field_id="IDOBJ"
                  field_description={[
                    "UnitaMisura_Simbolo",
                    "UnitaMisura_Descrizione",
                  ]}
                  url={
                    REACT_APP_SERVERAPI +
                    "api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/unitamisura/unitamisurasel/leggicombo"
                  }
                  nameList="v_unitamisura"
                  numerocaratteri={3}
                />
                <Input
                  label="Conversione"
                  id="Articoli_UM_Conversione3"
                  type="number"
                ></Input>
              </FrameInRow>
              <FrameInRow width={[20, 20, 20]}>
                <Input
                  label="Scorta minima"
                  id="Articoli_ScortaMinima"
                  type="number"
                ></Input>
                <Input
                  label="Scorta massima"
                  id="Articoli_ScortaMassima"
                  type="number"
                ></Input>
                <Input
                  label="Riordino"
                  id="Articoli_Riordino"
                  type="number"
                ></Input>
              </FrameInRow>
              <FrameInRow width={[20, 20, 20, 20, 20, 20]}>
                <Input
                  label="Peso netto"
                  id="Articoli_PesoNetto"
                  type="number"
                ></Input>
                <Input
                  label="Peso lordo"
                  id="Articoli_PesoLordo"
                  type="number"
                ></Input>
                <Input
                  label="Larghezza"
                  id="Articoli_Larghezza"
                  type="number"
                ></Input>
                <Input
                  label="Altezza"
                  id="Articoli_Altezza"
                  type="number"
                ></Input>
                <Input
                  label="Profondità"
                  id="Articoli_Profondita"
                  type="number"
                ></Input>
                <Input
                  label="Volume"
                  id="Articoli_Volume"
                  type="number"
                ></Input>
              </FrameInRow>
            </Frame>
          </FrameContainer>
          <FrameContainer id="alternativi" help={help}>
            <Frame label="Alternativi">
              <Grid
                id="grid_articolivarianti"
                loadGrid={
                  REACT_APP_SERVERAPI +
                  "api/axo_sel/" +
                  localStorage.getItem("axn_token") +
                  cmd_getArticoliVariantiGrid
                }
                onClickRow={(IDOBJ) => {}}
                pidobj={idobj_T}
                btn_insert={true}
                formTitle="Inserisci"
                nameView={"v_articolivarianti"}
                itemSearch={[]}
                dbForm="articolivarianti"
              >
                <FrameInRow width={[20, 20, 20]}>
                  <Input label="Codice" id="ArticoliVarianti_Codice" />
                  <Input label="Barcode" id="ArticoliVarianti_BarCode" />
                  <Input label="Tipo" id="ArticoliVarianti_Tipo" />
                </FrameInRow>
                <FrameInRow width={[100]}>
                  <Input
                    label="Descrizione"
                    id="ArticoliVarianti_Descrizione"
                  />
                </FrameInRow>
                <FrameInRow width={[20, 20, 20]}>
                  <Input
                    label="Qta scorta minima"
                    id="ArticoliVarianti_QtaScortaMinima"
                    type="number"
                  />
                  <Input
                    label="Qta scorta massima"
                    id="ArticoliVarianti_QtaScortaMassima"
                    type="number"
                  />
                  <Input
                    label="Rank"
                    id="ArticoliVarianti_Rank"
                    type="number"
                  />
                </FrameInRow>
                <FrameInRow width={[80, 20]}>
                  <Input label="Lotto" id="ArticoliVarianti_Lotto" />
                  <InputData
                    label="Scadenza lotto"
                    id="ArticoliVarianti_LottoScadenza"
                  />
                </FrameInRow>
              </Grid>
            </Frame>
          </FrameContainer>
          <FrameContainer id="opzioni" help={help}>
            <Frame label="Opzioni">
              <FrameInRow width={[20, 20, 20, 20]}>
                <InputCheckBox label="Non calcolare nella ritenuta d'acconto" />
                <InputCheckBox label="Non calcolare le giacenza" />
                <InputCheckBox label="Non ordinare a fornitore" />
                <InputCheckBox label="Non considerare per sconto testata" />
              </FrameInRow>
              <FrameInRow width={[20, 20, 20, 20, 20]}>
                <InputCheckBox label="Non costificare dai figli ma dai movimenti" />
                <InputCheckBox label="Non calcolato nella cassa di categoria" />
                <InputCheckBox label="Considera spedito l'articolo" />
                <InputCheckBox label="Sfrido" />
                <InputCheckBox label="Chiedi il seriale" />
              </FrameInRow>
              <FrameInRow width={[20, 20, 20, 20]}>
                <InputCheckBox label="Non stampare nell'ordine" />
                <InputCheckBox label="Non stampare nei ddt" />
                <InputCheckBox label="Non stampare nei ddt se l'articolo è inserito da gestione vendite" />
              </FrameInRow>
            </Frame>
          </FrameContainer>
        </Form>
      )}
    </>
  );
};
export default Project;
