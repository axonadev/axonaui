import React, { useState } from "react";
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
  folders,
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

  const onConfirmhandler = () => {
    let obj = JSON.parse(mex.obj);
    console.log(obj);

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
              if (item.attributes.tipo.value === "list") {
                /* obj =
                  obj +
                  ',"' +
                  item.id +
                  '":"' +
                  item.attributes.list_value.value +
                  '"'; */
              } else if (item.attributes.tipo.value === "cbox") {
                /* if (item.checked) {
                  obj = obj + ',"' + item.id + '":"true"';
                } else {
                  obj = obj + ',"' + item.id + '":"false"';
                } */
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
              } else if (item.attributes.tipo.value === "driverchecklist") {
                obj =
                  obj +
                  ',"' +
                  item.attributes.db_target.value +
                  '":"' +
                  item.value +
                  '"';
              } else {
                // obj = obj + ',"' + item.id + '":"' + item.value + '"';
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

  console.log(children.length, "children");
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
        <div className={classes.form_body}>
          {children.length > 1 &&
            children.map((item) => {
              return item.props.id === frameIdSelezionato ? (
                React.cloneElement(item, { form_id: id })
              ) : (
                <></>
              );
            })}
          {children.length === undefined &&
            React.cloneElement(children, { form_id: id })}
        </div>

        <Button
          className={classes.form_save_hidden}
          type="submit"
          id={id_submit}
        >
          <Img type="save" pathImg="getlocal" />
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
