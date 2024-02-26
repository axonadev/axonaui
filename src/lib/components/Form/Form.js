import React, { useState } from "react";
import classes from "../style/Form.module.css";
import { formatDate, postData } from "axonalib";
import MessageModal from "../MessageModal/MessageModal";
import Button from "../Button/Button";
import Img from "../Img/Img";
import ImgFont from "../Img/ImgFont";
import SnackBar from "../SnackBar/SnackBar";
import Folder from "../Folder/Folder";
import { useEffect } from "react";

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
  folders,
  onChangeValue,
  isFormSubmit,
  deleteid,
  isScaduto = false,
  numberGrid = 1,
}) => {
  const idFolder1 = folders
    ? folders.filter((item) => item.key === 1)
    : [{ key: 1, target: "info" }];
  const [mex, setMex] = useState(null);
  const [isSnackBar, setSnackBar] = useState(null);
  const [frameIdSelezionato, setFrameIdSelezionato] = useState(() => {
    try {
      return idFolder1[0].target;
    } catch (error) {
      return 0;
    }
  });
  const id_submit = "b_submit_" + id;

  let argpost;

  if (onChangeValue !== undefined) {
    argpost = {
      form_id: id,
      onChangeValue: onChangeValue,
    };
  } else {
    argpost = {
      form_id: id,
    };
  }

  const classesBody = [classes.form_body, classes["form_ngrid_" + numberGrid]];

  const onScadhandler = (obj) => {
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
      if (data.Errore === "" || data.Errore === "\r\n") {
        setSnackBar(() => {
          return {
            label: "Aggiornamento riuscito",
            img: "",
          };
        });
      } else {
        setSnackBar(() => {
          return {
            label: "X " + data.Errore,
            img: "",
          };
        });
      }
      afterSubmit();
    });
  };

  const onConfirmhandler = () => {
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
      if (data.Errore === "" || data.Errore === "\r\n") {
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
  };
  const formSubmissionHandler = (evt, idb) => {
    evt.preventDefault();
    let obj = "";

    for (const item of evt.target.elements) {
      try {
        if (item.id === "") {
        } else {
          try {
            if (item.attributes.tipo === undefined) {
            } else {
              if (item.attributes.tipo.value === "listbox") {
                obj =
                  obj +
                  ',"' +
                  item.attributes.db.value +
                  '":[' +
                  item.value +
                  "]";
              } else if (item.attributes.tipo.value === "driverchecklist") {
                obj =
                  obj +
                  ',"' +
                  item.attributes.db_target.value +
                  '":"' +
                  item.value +
                  '"';
              }
            }
          } catch (error) {}
        }
      } catch (error) {}
    }
    try {
      obj = obj.substring(1);
    } catch (error) {}

    if (obj !== "") {
      obj =
        localStorage
          .getItem("axn_record_" + id)
          .substring(0, localStorage.getItem("axn_record_" + id).length - 2) +
        "," +
        obj +
        "}]";
    } else {
      obj = localStorage.getItem("axn_record_" + id);
    }

    setMex({
      title: idobj === 0 ? "Inserimento" : "Aggiornamento",
      label: "Salvare il record selezionato?",
      icon: "",
      obj: obj,
    });
  };

  const folderSelect = (idFrameSelezionato) => {
    setFrameIdSelezionato(idFrameSelezionato);
  };

  useEffect(() => {
    let obj = "";
    if (isScaduto) {
      obj = [{ IDOBJ: idobj, [db + "_ScadenzaOBJ"]: formatDate(Date.now()) }];

      onScadhandler(obj);
    } else {
      if (isFormSubmit > 0) {
        obj = localStorage.getItem("axn_record_" + id);

        setMex({
          title: idobj === 0 ? "Inserimento" : "Aggiornamento",
          label: "Salvare il record selezionato?",
          icon: "",
          obj: obj,
        });
      }
    }
  }, [isFormSubmit]);

  useEffect(() => {
    if (deleteid > 0) {
      let objJs;
      objJs = JSON.parse(localStorage.getItem("axn_record_" + id));

      objJs[0][db + "_ScadenzaOBJ"] = Date.now - 1;

      let obj = JSON.stringify(objJs);

      setMex({
        title: "Elimina",
        label: "Eliminare il record selezionato?",
        icon: "",
        obj: obj,
      });
    }
  }, [deleteid]);

  return (
    <React.Fragment>
      <form
        className={classes.form_content}
        onSubmit={formSubmissionHandler}
        id={id}
      >
        <div className={classes.form_folders}>
          <Folder
            items={folders}
            onSelect={folderSelect}
            startSelect={idFolder1[0].target}
          ></Folder>
        </div>
        <div className={classesBody.join(" ")}>
          {children.length > 1 &&
            children.map((item) => {
              return item.props.id === frameIdSelezionato ? (
                <React.Fragment key={item.props.id}>
                  {React.cloneElement(item, argpost)}
                </React.Fragment>
              ) : (
                <></>
              );
            })}
          {children.length === undefined &&
            React.cloneElement(children, argpost)}
        </div>

        <Button
          className={classes.form_save_hidden}
          type='submit'
          id={id_submit}
        >
          <ImgFont icon='faFloppyDisk' />
        </Button>
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
              icon: "faBan",
              onClick: onStophandler,
            },
            {
              key: 2,
              label: "Salva",
              type: "run",
              icon: "faFloppyDisk",
              onClick: onConfirmhandler,
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
