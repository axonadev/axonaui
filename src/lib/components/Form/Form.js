import React, { useState, useEffect } from "react";
import classes from "../style/Form.module.css";
import { postData } from "axonalib";
import MessageModal from "../MessageModal/MessageModal";
import Button from "../Button/Button";
import Img from "../Img/Img";
import SnackBar from "../SnackBar/SnackBar";
import Folder from "../Folder/Folder";

const Form = ({
  id,
  idobj,
  pidobj,
  modulo,
  db,
  afterSubmit,
  children,
  token = "",
  serverApi,
  onAnnulla,
  folders,
}) => {
  const idFolder1 = folders.filter((item) => item.key === 1);
  const [mex, setMex] = useState(null);
  const [mexAnnulla, setMexAnnulla] = useState(null);
  const [isSnackBar, setSnackBar] = useState(null);
  const [btnVisible, setBtnVisible] = useState(false);
  const [frameIdSelezionato, setFrameIdSelezionato] = useState(
    idFolder1[0].target
  );
  const id_submit = "b_submit_" + id;
  const [seconds, setSeconds] = useState(0);

  const onConfirmhandler = () => {
    localStorage.setItem("axn_form_change", "0");
    let obj = JSON.parse(mex.obj);

    let data = {
      Token: token === "" ? localStorage.getItem("axn_token") : token,
      Idobj: idobj,
      Modulo: modulo,
      DB: db,
      Operazione: "",
      Item: "[{" + db + ":" + JSON.stringify(obj) + "}]",
    };
    postData(serverApi + "api/axo_sel", data).then((data) => {
      setMex(null);
      if (data.Errore === "") {
        setSnackBar(() => {
          return {
            label: "Aggiornamento riuscito",
            img: "",
          };
        });
      } else {
        setSnackBar(() => {
          return {
            label: "Errore " + data.Errore,
            img: "",
          };
        });
      }
      afterSubmit();
    });
  };

  const onStophandler = () => {
    setMex(null);
    setMexAnnulla(null);
  };
  const formSubmissionHandler = (evt, idb) => {
    evt.preventDefault();
    let obj = "";

    if (pidobj) {
      obj = obj + ',"PIDOBJ":"' + pidobj + '"';
    }
    if (idobj) {
      obj = obj + ',"IDOBJ":"' + idobj + '"';
    }
    for (const item of evt.target.elements) {
      try {
        if (item.id === "") {
        } else {
          try {
            if (item.attributes.tipo === undefined) {
            } else {
              if (item.attributes.tipo.value === "list") {
                obj =
                  obj +
                  ',"' +
                  item.id +
                  '":"' +
                  item.attributes.list_value.value +
                  '"';
              } else if (item.attributes.tipo.value === "cbox") {
                if (item.checked) {
                  obj = obj + ',"' + item.id + '":"true"';
                } else {
                  obj = obj + ',"' + item.id + '":"false"';
                }
              } else if (item.attributes.tipo.value === "listbox") {
                obj =
                  obj +
                  ',"' +
                  item.attributes.db.value +
                  '":[' +
                  item.value +
                  "]";
              } else if (item.attributes.tipo.value === "cboxi") {
                //non devono andare nel form
              } else {
                obj = obj + ',"' + item.id + '":"' + item.value + '"';
              }
            }
          } catch (error) {}
        }
      } catch (error) {}
    }
    obj = "[{" + obj.substring(1) + "}]";

    setMex({
      title: idobj === 0 ? "Inserimento" : "Aggiornamento",
      label: "Salvare il record selezionato?",
      icon: "",
      obj: obj,
    });
  };

  const clickAnnulla = () => {
    setMexAnnulla({
      title: "Annulla",
      label: "Le tue modifiche verranno perse, continuare?",
      icon: "",
    });
  };
  const onConfirmAnnulla = () => {
    setMexAnnulla(null);
    localStorage.setItem("axn_form_change", "0");
    onAnnulla();
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (localStorage.getItem("axn_form_change") === "1") {
        setBtnVisible(true);
      } else {
        setBtnVisible(false);
      }
    }, 500);
    // clearing interval
    return () => clearInterval(timer);
  }, [seconds]);

  const folderSelect = (idFrameSelezionato) => {
    setFrameIdSelezionato(idFrameSelezionato);
  };

  return (
    <React.Fragment>
      <form
        className={classes.form_content}
        onSubmit={formSubmissionHandler}
        id={id}
      >
        {btnVisible && (
          <>
            <Button className={classes.form_save} type="submit" id={id_submit}>
              <Img type="save" pathImg="getlocal" />
            </Button>
            <Button
              className={classes.form_annulla}
              onClick={clickAnnulla}
              id={id_submit}
            >
              <Img type="annulla" pathImg="getlocal" />
            </Button>
          </>
        )}
        <div className={classes.form_folders}>
          <Folder
            items={folders}
            onSelect={folderSelect}
            startSelect={idFolder1[0].target}
          ></Folder>
        </div>
        <div className={classes.form_body}>
          {children &&
            children.map((item) => {
              return item.props.id === frameIdSelezionato ? item : <></>;
            })}
        </div>
      </form>
      {mex && (
        <MessageModal
          onClickBtn1={onConfirmhandler}
          onClickBtn2={onStophandler}
          onOut={onStophandler}
          title={mex.title}
          message={mex.label}
          buttons={[
            {
              key: 1,
              label: "Annulla",
              type: "stop",
              onClick: onStophandler,
            },
            {
              key: 2,
              label: "Salva",
              type: "run",
              onClick: onConfirmhandler,
            },
          ]}
        />
      )}
      {mexAnnulla && (
        <MessageModal
          onClickBtn1={onConfirmAnnulla}
          onClickBtn2={onStophandler}
          onOut={onStophandler}
          title={mexAnnulla.title}
          message={mexAnnulla.label}
          buttons={[
            {
              key: 1,
              label: "No",
              type: "stop",
              onClick: onStophandler,
            },
            {
              key: 2,
              label: "Si",
              type: "run",
              onClick: onConfirmAnnulla,
            },
          ]}
        />
      )}
      {isSnackBar && (
        <SnackBar
          label={isSnackBar.label}
          img={isSnackBar.img}
          onTimeOut={() => {
            setSnackBar(null);
          }}
        />
      )}
    </React.Fragment>
  );
};
export default Form;
