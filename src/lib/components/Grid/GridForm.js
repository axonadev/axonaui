import React, { useEffect } from "react";
import useForm from "../../hooks/useForm";
import Form from "../Form/Form";
import MessageModal from "../MessageModal/MessageModal";
import { useEnv } from "axonalib";

const GridForm = ({
  id,
  modulo,
  db,
  onSave,
  onStop,
  idobj,
  pidobj,
  children,
}) => {
  const { REACT_APP_SERVERAPI } = useEnv();
  const { onChangeSelected, onReset, formValue } = useForm();

  const onSavehandler = () => {
    document.getElementById("b_submit_" + id).click();
  };
  const onStophandler = () => {
    try {
      onStop();
    } catch (error) {}
  };

  useEffect(() => {
    const loadList = () => {
      onChangeSelected(
        REACT_APP_SERVERAPI +
          "api/axo_sel/" +
          localStorage.getItem("axn_token") +
          "/" +
          modulo +
          "/general/leggirow/" +
          db +
          "_f_" +
          idobj,
        "v_" + db
      );
    };

    if (idobj !== 0) {
      loadList();
    }
  }, []);

  return (
    <MessageModal
      onOut={onStophandler}
      title={"Domicilio"}
      message={""}
      buttons={[
        {
          key: 1,
          label: "Annulla",
          type: "stop",
          onClick: onStophandler,
        },
        {
          key: 2,
          label: "Salvaaa",
          type: "run",
          onClick: onSavehandler,
        },
      ]}
    >
      <Form
        id={id}
        idobj={idobj}
        modulo={modulo}
        db={db}
        serverApi={REACT_APP_SERVERAPI}
        afterSubmit={onSave}
        onAnnulla={onStophandler}
      >
        {children}
      </Form>
    </MessageModal>
  );
};
export default GridForm;
