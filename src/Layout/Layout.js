import React, { useState, useEffect, useRef } from "react";
import { useEnv } from "axonalib";
import {
  Header,
  SideMenu,
  ContentForm,
  ProjectMenu,
  MessageModal,
  ImgFont,
  Input,
  TextEditor,
  FrameInRow,
  Frame,
  ListItem,
  SnackBar,
} from "../lib/index";
import Project from "../Pages/Project";
import useList from "../lib/hooks/useList";
import List from "../lib/components/List/List";
import ProjectMenuButton from "../lib/components/ProjectMenu/ProjectMenuButton.prv";
import useProjectMenu from "../hooks/useProjectMenu";
// import classes from "./Layout2.module.css";

const Layout = () => {
  const { REACT_APP_IMGFOLDER, REACT_APP_SERVERAPI } = useEnv();
  const [styleMenu, setStyleMenu] = useState(
    localStorage.getItem("axn_sidemenuswitch") === "true" ? true : false
  );
  const [isNotifiche, setIsNotifiche] = useState(true);
  const { list } = useList(
    [
      {
        command: "soggetti/soggettisel/leggicomboclienti",
        nameView: "v_clienti",
      },
      {
        command: "soggetti/soggettisel/leggicomboagenti",
        nameView: "v_agenti",
      },
      {
        command: "contratti/contrattisel/legginotifiche",
        nameView: "v_notifiche",
      },
      {
        command: "impianti/impiantisel/leggicombo",
        nameView: "v_impianti",
      },
      {
        command: "contratti/general/configfolder/contratti",
        nameView: "v_configfolder",
      },
    ],
    localStorage.getItem("axn_token"),
    REACT_APP_SERVERAPI
  );

  const refCorpoMail = useRef("");
  const refDestinatarioMail = useRef("");
  const refOggettoMail = useRef("");

  const creaDataUmanaGMA = (data) => {
    const partiData = data.split("T")[0].split("-");
    const anno = partiData[0];
    const mese = partiData[1];
    const giorno = partiData[2];
    return giorno + "-" + mese + "-" + anno;
  };

  // PROJECTMENU DATA
  const [idOpen, setIdOpen] = useState("");
  const notifichelist = list.filter((item) => item.nameView === "v_notifiche");
  const notifiche = notifichelist[0] ? notifichelist[0].data : [];
  const [isHelp, setIsHelp] = useState(false);

  const { items: pjItems, processRequest, answerReq } = useProjectMenu();

  const onSideMenuChangeHandler = (stmenu) => {
    setStyleMenu(stmenu);
  };
  const projectMenuRequestSubmitHandler = (evt) => {
    processRequest(evt);
  };

  const onHelpstato = (valore) => {
    setIsHelp(valore);
  };

  const cambiaStatoNotifiche = () => {
    setIsNotifiche(false);
  };

  const [isMail, setIsMail] = useState(false);
  const [isRinnovo, setIsRinnovo] = useState(false);
  //* Controllo modale
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemAttivo, setItemAttivo] = useState({});
  const [dataRinnovo, setDataRinnovo] = useState(itemAttivo.Notifica_Rinnovo);
  const [dataSbloccata, setDataSbloccata] = useState(false);
  const urlPost = REACT_APP_SERVERAPI + "api/axo_sel";

  const chiudiMail = () => {
    setIsMail(false);
    setIsModalOpen(false);
    setDataSbloccata(false);
    setItemAttivo({});
  };
  const chiudiRinnovo = () => {
    setIsRinnovo(false);
    setIsModalOpen(false);
    setDataSbloccata(false);
    setItemAttivo({});
  };
  // * Notifiche
  const setTipoNotifica = (tipo, item) => {
    setItemAttivo(item);
    if (tipo === "cartello" || tipo === "contratto") {
      setIsRinnovo(true);
      setIsModalOpen(true);
    } else if (tipo === "evento") {
      setIsMail(true);
      setIsModalOpen(true);
    }
  };
  //* Viene modificata al cambio della data sbloccata
  const cambiaDataRinnovo = (value) => {
    setDataRinnovo(value.target.value);
  };
  // # POST********************************************************
  const fetchIscrizioneRuolo = async (item) => {
    const oggettoJSON = {
      idCartello: item.idCartello,
      idContratto: item.idContratto,
      idEvento: item.idEvento,
      destinatario: refDestinatarioMail.current.value,
      corpoMail: refCorpoMail.current.editor.editor.innerHTML,
      oggetto: refOggettoMail.current.value,
    };

    const formData = {
      Token: localStorage.axn_token,
      Modulo: "IscrizioneARuolo",
      Classe: "contrattiSel",
      Funzione: "IscrizioneRuolo",
      Parametri: "[" + JSON.stringify(oggettoJSON) + "]",
      DB: "contratti",
    };

    try {
      const response = await fetch(urlPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error("Dati errati o utente non registrato", error);
    }

    setIsModalOpen(false);
  };
  const fetchRinnovaScadenza = async (item) => {
    const oggettoJSON = {
      idContratto: item.idContratto,
      idCartello: item.idCartello,
      dataRinnovo: dataRinnovo,
    };

    const formData = {
      Token: localStorage.axn_token,
      Modulo: "RinnovaScadenza",
      Classe: "contrattiSel",
      Funzione: "RinnovaScadenza",
      Parametri: "[" + JSON.stringify(oggettoJSON) + "]",
      DB: "contratti",
    };

    try {
      const response = await fetch(urlPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error("Dati errati o utente non registrato", error);
    }

    setIsModalOpen(false);
  };
  const fetchTerminaContratto = async (item) => {
    const oggettoJSON = {
      idContratto: item.idContratto,
      idCartello: item.idCartello,
    };

    const formData = {
      Token: localStorage.axn_token,
      Modulo: "TerminaContratto",
      Classe: "contrattiSel",
      Funzione: "TerminaContratto",
      Parametri: "[" + JSON.stringify(oggettoJSON) + "]",
      DB: "contratti",
    };

    try {
      const response = await fetch(urlPost, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error("Dati errati o utente non registrato", error);
    }

    setIsModalOpen(false);
  };
  const iscrizioneRuolo = () => {
    fetchIscrizioneRuolo(itemAttivo);
    chiudiRinnovo();
    chiudiMail();
  };
  const rinnovaScadenza = () => {
    fetchRinnovaScadenza(itemAttivo);
    chiudiRinnovo();
    chiudiMail();
  };
  const terminaContratto = () => {
    fetchTerminaContratto(itemAttivo);
    chiudiRinnovo();
    chiudiMail();
  };
  const onConfirmhandler = () => {
    console.log("fare post per rinnovo cartello o contratto");
  };

  const [isConfermaMail, setIsConfermaMail] = useState(false);
  const [isConfermaTermina, setIsConfermaTermina] = useState(false);
  const [isConfermaRinnovo, setIsConfermaRinnovo] = useState(false);

  const apriRinnovo = () => {
    apriModaleConfermaMail();
    setIsConfermaRinnovo(true);
  };

  const apriTermina = () => {
    apriModaleConfermaMail();
    setIsConfermaTermina(true);
  };

  const apriModaleConfermaMail = () => {
    setIsConfermaMail(true);
  };

  const chiudiModaleConfermaMail = () => {
    setIsConfermaMail(false);
  };

  //* Bottoni Modale
  const bottoniModaleMail = [
    {
      key: 1,
      onClick: apriModaleConfermaMail,
      type: "success",
      label: "Invia",
      icon: "faEnvelope",
    },
    {
      key: 2,
      onClick: chiudiMail,
      type: "stop",
      label: "Annulla",
      icon: "faBan",
    },
  ];
  const bottoniModaleRinnovo = [
    {
      key: 1,
      onClick: apriRinnovo,
      type: "success",
      label: "Rinnova",
      icon: "faFloppyDisk",
    },
    {
      key: 2,
      onClick: apriTermina,
      type: "stop",
      label: "Termina",
      icon: "faClose",
    },
    {
      key: 3,
      onClick: chiudiRinnovo,
      type: "stop",
      label: "Annulla",
      icon: "faBan",
    },
  ];
  const bottoniConfermaModaleMail = [
    {
      key: 1,
      onClick: iscrizioneRuolo,
      type: "success",
      label: "Conferma Rinnovo",
      icon: "faEnvelope",
    },
    {
      key: 2,
      onClick: chiudiModaleConfermaMail,
      type: "stop",
      label: "Annulla",
      icon: "faBan",
    },
  ];
  const bottoniConfermaModaleRinnovo = [
    {
      key: 1,
      onClick: rinnovaScadenza,
      type: "success",
      label: "Invia",
      icon: "faEnvelope",
    },
    {
      key: 2,
      onClick: chiudiModaleConfermaMail,
      type: "stop",
      label: "Annulla",
      icon: "faBan",
    },
  ];
  const bottoniConfermaModaleTermina = [
    {
      key: 1,
      onClick: terminaContratto,
      type: "success",
      label: "Termina Contratto",
      icon: "faEnvelope",
    },
    {
      key: 2,
      onClick: chiudiModaleConfermaMail,
      type: "stop",
      label: "Annulla",
      icon: "faBan",
    },
  ];

  useEffect(() => {
    var key;
    for (var i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
      if (key.indexOf("axn_list_") > -1 || key.indexOf("axn_record_") > -1) {
        localStorage.removeItem(key);
      }
    }
  }, []);
  useEffect(() => {}, [dataSbloccata]);

  const notificheCritiche = notifiche.filter(
    (item) => item.Notifica_Criticita === "Critica"
  );
  const notificheUrgenti = notifiche.filter(
    (item) => item.Notifica_Criticita === "Urgente"
  );
  const notificheNonUrgenti = notifiche.filter(
    (item) => item.Notifica_Criticita === "Non Urgente"
  );
  const notificheScadute = notifiche.filter(
    (item) => item.Notifica_Criticita === "Scaduta"
  );

  return (
    <>
      <Header
        titolo={"CONTRATTI"}
        logo={
          REACT_APP_IMGFOLDER +
          "/" +
          localStorage.getItem("axn_piva") +
          "/logo.png"
        }
      />
      <SideMenu
        onSideMenuChange={onSideMenuChangeHandler}
        pathImg={REACT_APP_IMGFOLDER}
      />
      <ContentForm sidemenuopen={styleMenu}>
        {isNotifiche ? (
          <MessageModal onOut={cambiaStatoNotifiche} buttons={[]}>
            {isModalOpen && (
              <MessageModal
                onOut={isMail ? chiudiMail : chiudiRinnovo}
                buttons={isMail ? bottoniModaleMail : bottoniModaleRinnovo}
                onClickBtn1={onConfirmhandler}
                onClickBtn2={() => setIsModalOpen(false)}
              >
                {/* MODALE PER CONFERMA ISCRIZIONE A RUOLO */}
                {isMail && (
                  <>
                    {isConfermaMail && (
                      <MessageModal
                        onOut={chiudiModaleConfermaMail}
                        buttons={bottoniConfermaModaleMail}
                      >
                        "Confermi di voler inviare la mail per il rinnovo
                        dell'iscrizione a ruolo?"
                      </MessageModal>
                    )}

                    <h1>
                      <span>
                        <ImgFont icon='faEnvelope' />
                      </span>{" "}
                      Invio contratto via mail
                    </h1>
                    <div>
                      <Input
                        type='email'
                        label='Indirizzo Mail'
                        value={itemAttivo.Notifica_MailInoltro}
                        ref={refDestinatarioMail}
                        required={true}
                      />
                    </div>
                    <div>
                      <Input
                        label='Oggetto'
                        value='Bozza Contratto Gruppo comunicare'
                        ref={refOggettoMail}
                        required={true}
                      />
                    </div>
                    <TextEditor
                      ref={refCorpoMail}
                      size={"250px"}
                      testoPredefinito={`Buongiorno, 
                      <p>Vi preghiamo, voler inviare, al seguente</p>
                      <p>mail: ${itemAttivo.Notifica_MailInoltro}</p>
                      <p>relativo PAGO PA al fine consentire alla Ditta: ${
                        itemAttivo.Notifica_NomeCliente
                      }, che ci legge in copia, il versamento di quanto dovuto.</p>
                      <h4>LA PRESENTE PER DICHIARARE QUANTO SOTTO ESPOSTO:</h4>
                      <p>OGGETTO: CANONE UNICO PATRIMONIALE TEMPORANEO NEL COMUNE DI ${
                        itemAttivo.Notifica_Citta
                      } DAL ${creaDataUmanaGMA(
                        itemAttivo.Notifica_Data
                      )} AL ${creaDataUmanaGMA(
                        itemAttivo.ContrattiEventi_ScadenzaObj
                      )} INTESTATO A:</p>
                      <h4>${itemAttivo.Notifica_NomeCliente}</h4>
                      <bold>INTESTATARIO CHE PROVVEDERÀ AL PAGAMENTO DEL CANONE:</bold>
                      <p>${itemAttivo.Notifica_NomeCliente}</p>
                      <p>${itemAttivo.Notifica_Indirizzo}</p>
                      <p>${itemAttivo.Notifica_Piva}</p>
                      <p>NS. ${
                        itemAttivo.Contratti_Numero
                      } N.1 CARTELLO CM 585X285 IN *CITTÀ* SP, VIA GIOVANNI DA CERMENATE DI FRONTE ALL'AUTOLAVAGGIO</p>
                      <h6>SOGGETTO ESPOSITIVO: </h6>
                      <h6>CENTRO ESTETICO: </h6>
                      <p>Restiamo a disposizione per utleriori chiarimenti e con l'occasione porgiamo distinti saluti.</p>
                      <p>COMUNICARE SRLS</p>`}
                    />
                  </>
                )}

                {/* MODALE PER RINNOVO/TERMINA CARTELLO/CONTRATTO */}
                {isRinnovo && (
                  <>
                    {/* DATI PER RINNOVO CARTELLO/CONTRATTO */}
                    {isConfermaMail && isConfermaRinnovo && (
                      <MessageModal
                        onOut={chiudiModaleConfermaMail}
                        buttons={bottoniConfermaModaleRinnovo}
                      >
                        "Confermi di voler rinnovare?"
                      </MessageModal>
                    )}

                    {/* DATI PER TERMINARE CARTELLO/CONTRATTO */}
                    {isConfermaMail && isConfermaTermina && (
                      <MessageModal
                        onOut={chiudiModaleConfermaMail}
                        buttons={bottoniConfermaModaleTermina}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          "Vuoi davvero Terminare?"
                        </div>
                      </MessageModal>
                    )}

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "Column",
                      }}
                    >
                      <h1>
                        Rinnovo {itemAttivo.Notifica_Tipo} N°
                        {itemAttivo.Contratti_Numero}
                      </h1>
                      <p>
                        Vuoi rinnovare o terminare il contratto{" "}
                        {itemAttivo.Notifica_Descrizione} ?
                      </p>
                      <FrameInRow width={10}>
                        {/* <div className={classes.buttonWrapper}>
                          <button
                            className={
                              dataSbloccata
                                ? classes.buttonSuccess
                                : classes.buttonDanger
                            }
                            onClick={() => setDataSbloccata(!dataSbloccata)}
                          >
                            <ImgFont
                              icon={dataSbloccata ? "faLockOpen" : "faLock"}
                            />
                          </button>
                          {dataSbloccata ? (
                            <Input
                              label='Data Rinnovo: '
                              type='date'
                              value={dataRinnovo}
                              onChange={cambiaDataRinnovo}
                            />
                          ) : (
                            <Input
                              disabled
                              label='Data Rinnovo: '
                              type='date'
                              value={itemAttivo.Notifica_Rinnovo}
                            />
                          )}
                        </div> */}
                      </FrameInRow>
                    </div>
                  </>
                )}
              </MessageModal>
            )}
            {/* NOTIFICHE SCADUTE */}
            <Frame
              label={`NOTIFICHE SCADUTE ${notificheScadute.length}`}
              type='form_t'
              stato={"over"}
              ridimensiona={true}
              setup={true}
              icon={"faSkull"}
              frameSize={2}
            >
              <List filter={false}>
                {notificheScadute.map((item, i) => {
                  return (
                    <ListItem
                      item={item}
                      key={i}
                      keyID={i}
                      element={"Notifica_Descrizione"}
                      icon1={
                        item.Notifica_Tipo === "cartello" ||
                        item.Notifica_Tipo === "contratto"
                          ? "faClock"
                          : "faEnvelope"
                      }
                      icon1Color={"white"}
                      onClickIcon1={() =>
                        setTipoNotifica(item.Notifica_Tipo, item)
                      }
                    />
                  );
                })}
              </List>
            </Frame>

            {/* NOTIFICHE CRITICHE */}
            <Frame
              label={`NOTIFICHE CRITICHE ${notificheCritiche.length}`}
              type='form_t'
              stato={"danger"}
              ridimensiona={true}
              setup={true}
              icon={"faFire"}
              frameSize={notificheCritiche.length > 0 ? 2 : 1}
            >
              <List filter={false}>
                {notificheCritiche.map((item, i) => {
                  return (
                    <ListItem
                      item={item}
                      key={i}
                      keyID={i}
                      element={"Notifica_NomeCliente"}
                      icon1={
                        item.Notifica_Tipo === "cartello" ||
                        item.Notifica_Tipo === "contratto"
                          ? "faClock"
                          : "faEnvelope"
                      }
                      icon1Color={"primary"}
                      onClickIcon1={() =>
                        setTipoNotifica(item.Notifica_Tipo, item)
                      }
                    />
                  );
                })}
              </List>
            </Frame>

            {/* NOTIFICHE URGENTI */}
            <Frame
              label={`NOTIFICHE URGENTI ${notificheUrgenti.length}`}
              type='form_t'
              stato={"warning"}
              ridimensiona={true}
              setup={true}
              icon={"faTriangleExclamation"}
              frameSize={notificheUrgenti.length > 0 ? 2 : 1}
            >
              <List filter={false}>
                {notificheUrgenti.map((item, i) => {
                  return (
                    <ListItem
                      item={item}
                      key={i}
                      keyID={i}
                      element={"Notifica_NomeCliente"}
                      icon1={
                        item.tipo === "cartello" || item.tipo === "contratto"
                          ? "faClock"
                          : "faEnvelope"
                      }
                      icon1Color={"primary"}
                      onClickIcon1={() =>
                        setTipoNotifica(item.Notifica_Tipo, item)
                      }
                    />
                  );
                })}
              </List>
            </Frame>

            {/* NOTIFICHE NON URGENTI */}
            <Frame
              label={`NOTIFICHE NON URGENTI ${notificheNonUrgenti.length}`}
              type='form_t'
              stato={"success"}
              ridimensiona={true}
              setup={true}
              icon={"faLeaf"}
              frameSize={notificheNonUrgenti.length > 0 ? 2 : 1}
            >
              <List filter={false}>
                {notificheNonUrgenti.map((item, i) => {
                  return (
                    <ListItem
                      item={item}
                      key={i}
                      keyID={i}
                      element={"Notifica_NomeCliente"}
                      icon1={
                        item.Notifica_Tipo === "cartello" ||
                        item.Notifica_Tipo === "contratto"
                          ? "faClock"
                          : "faEnvelope"
                      }
                      icon1Color={"primary"}
                      onClickIcon1={() =>
                        setTipoNotifica(item.Notifica_Tipo, item)
                      }
                    />
                  );
                })}
              </List>
            </Frame>
          </MessageModal>
        ) : (
          <Project
            request={answerReq}
            list={list}
            help={isHelp}
            notifiche={[]}
          />
        )}
      </ContentForm>

      {/* MENU A DESTRA */}
      <ProjectMenu
        items={pjItems}
        pathImg={REACT_APP_IMGFOLDER}
        onRequestSubmit={projectMenuRequestSubmitHandler}
        onHelp={onHelpstato}
      >
        <ProjectMenuButton
          id={"lista"}
          idOpen={idOpen}
          icon='faBell'
          label={"Notifiche"}
          notify={true}
          notifyAmount={notifiche.length}
          onOpen={(id) => setIdOpen(id)}
          onClose={() => setIdOpen("")}
        >
          <List
            items={notifiche}
            title={"Notifiche"}
            element={"Notifica_Descrizione"}
            onClick
          />
        </ProjectMenuButton>
      </ProjectMenu>
    </>
  );
};
export default Layout;
