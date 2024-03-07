import React, { useState } from "react";
import Button from "../Button/Button";
import Img from "../Img/Img";
import ImgFont from "../Img/ImgFont";
import MessageModal from "../MessageModal/MessageModal";
import classes from "../style/Form.module.css";
const FormButton = ({ id_submit, onAnnulla, numberGrid }) => {
  const [mexAnnulla, setMexAnnulla] = useState(null);
  const [mex, setMex] = useState(null);

  const classBSave = [
    classes.form_save,
    classes["form_btn_downgrid_" + numberGrid],
  ];
  const classBAnnulla = [
    classes.form_annulla,
    classes["form_btn_downgrid_" + numberGrid],
  ];
  const clickAnnulla = () => {
    setMexAnnulla({
      title: "Annulla",
      label: "Le tue modifiche verranno perse, continuare?",
      icon: "",
    });
  };
  const onConfirmAnnulla = () => {
    setMexAnnulla(null);
    onAnnulla();
  };
  const onStophandler = () => {
    setMex(null);
    setMexAnnulla(null);
  };
  const formSubmit = () => {
    document.getElementById("b_submit_" + id_submit).click();
  };

  return (
    <>
      <>
        <Button className={classBSave.join(" ")} onClick={formSubmit}>
          <ImgFont icon='faFloppyDisk' />
        </Button>
        <Button className={classBAnnulla.join(" ")} onClick={clickAnnulla}>
          <ImgFont icon='faXmark' />
        </Button>
      </>

      {mexAnnulla && (
        <MessageModal
          onOut={onStophandler}
          title={mexAnnulla.title}
          message={mexAnnulla.label}
        >
          <Button onClick={onConfirmAnnulla}>
            <ImgFont icon='faCheck' />
          </Button>
          <Button onClick={onStophandler}>
            <ImgFont icon='faXmark' />
          </Button>
        </MessageModal>
      )}
    </>
  );
};
export default FormButton;
