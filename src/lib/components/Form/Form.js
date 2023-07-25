import React, { useState } from "react";
import classes from "../style/Form.module.css";
import { postData } from "axonalib";
import MessageModal from "../MessageModal/MessageModal";
import Button from "../Button/Button";
import Img from "../Img/Img";
import SnackBar from "../SnackBar/SnackBar";

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
}) => {
  const [mex, setMex] = useState(null);
  const [isSnackBar, setSnackBar] = useState(null);
  const id_submit = "b_submit_" + id;

  const onConfirmhandler = () => {
    console.log("json passato:");
    let obj = JSON.parse(mex.obj);

    let data = {
      Token: token === "" ? localStorage.getItem("axn_token") : token,
      Idobj: idobj,
      Modulo: modulo,
      DB: db,
      Operazione: "",
      Item: "[{" + db + ":" + JSON.stringify(obj) + "}]",
    };
    console.log(JSON.stringify(data));

    postData(serverApi + "api/axo_sel", data).then((data) => {
      console.log(data.Errore);
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
  };
  const formSubmissionHandler = (evt, idb) => {
    console.log(evt);
    console.log(idb);

    evt.preventDefault();
    let obj = "";

    console.log(evt.target.elements);

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

    console.log(obj);

    setMex({
      title: idobj === 0 ? "Inserimento" : "Aggiornamento",
      label: "salvare il record selezionato?",
      icon: "",
      obj: obj,
    });
  };

  return (
    <React.Fragment>
      <form
        className={classes.form_content}
        onSubmit={formSubmissionHandler}
        id={id}
      >
        <Button className={classes.form_save} type="submit" id={id_submit}>
          <Img type="save" pathImg="getlocal" />
        </Button>
        {children}
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
              label: "Avanti",
              type: "run",
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
