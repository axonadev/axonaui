import React, { useState } from "react";
import Input from "../Input/Input";
import Grid from "../Grid/Grid";
import Button from "../Button/Button";
import FrameInRow from "../Frame/FrameInRow";
import MessageModal from "../MessageModal/MessageModal";
import { useEnv } from "axonalib";

const Citta = ({ nazione, citta, provincia, cap, val, onChange }) => {
  const [getCitta, setGetCitta] = useState([]);
  const [idobj, setIdobj] = useState(0);
  const [formIsVisible, setFormIsVisible] = useState(false);

  const { REACT_APP_SERVERAPI } = useEnv();

  const cmd_getGrid = "/citta/cittasel/leggi";

  const cittaClickHandler = () => {
    setFormIsVisible(true);
  };
  const onSelectCitta = () => {
    alert(idobj);
    setFormIsVisible(false);
  };
  const onStophandler = () => {
    setFormIsVisible(false);
  };

  const itemsSearch = ["CAP", "Descrizione"];
  return (
    <>
      <FrameInRow width={[20, 65, 5, 5, 5]}>
        <Input
          label={nazione.label}
          id={nazione.id}
          val={val}
          onChange={onChange}
        />
        <Input
          label={citta.label}
          id={citta.id}
          val={val}
          onChange={onChange}
        />
        <Button onClick={cittaClickHandler}>Cliccami</Button>
        <Input
          label={provincia.label}
          id={provincia.id}
          val={val}
          onChange={onChange}
        />
        <Input label={cap.label} id={cap.id} val={val} onChange={onChange} />
      </FrameInRow>
      {formIsVisible && (
        <MessageModal
          onClickBtn1={onSelectCitta}
          onClickBtn2={onStophandler}
          onOut={onStophandler}
          title={"Scegli la città"}
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
              label: "Salva",
              type: "run",
              onClick: onSelectCitta,
            },
          ]}
        >
          <Grid
            id="grid_citta"
            loadGrid={
              REACT_APP_SERVERAPI +
              "api/axo_sel/" +
              localStorage.getItem("axn_token") +
              cmd_getGrid
            }
            onClickRow={() => {}}
            onDoubleClickRow={onSelectCitta}
            onBtnInsert={() => {}}
            onBtnDelete={() => {}}
            nameView={"v_citta"}
            reload={() => {}}
            itemSearch={itemsSearch}
            btn_insert={false}
          />
        </MessageModal>
      )}
    </>
  );
};
export default Citta;
