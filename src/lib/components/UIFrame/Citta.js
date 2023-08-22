import React, { useState } from "react";
import Input from "../Input/Input";
import Grid from "../Grid/Grid";
import Button from "../Button/Button";
import FrameInRow from "../Frame/FrameInRow";
import MessageModal from "../MessageModal/MessageModal";
import { useEnv } from "axonalib";
import Img from "../Img/Img";

const Citta = ({ nazione, citta, provincia, cap, val, onChange }) => {
  console.log(val, "valore citta");
  const [getCitta, setGetCitta] = useState(val);
  const [idobj, setIdobj] = useState(0);
  const [selItem, setSelItem] = useState();
  const [formIsVisible, setFormIsVisible] = useState(false);

  const { REACT_APP_SERVERAPI } = useEnv();

  const cmd_getGrid = "/citta/cittasel/leggi";

  const cittaClickHandler = () => {
    setFormIsVisible(true);
  };

  const selCitta = (id, items) => {
    console.log(items);
    setIdobj(id);
    setSelItem(items);
  };

  const onSelectCitta = () => {
    setGetCitta(() => [
      { id: citta.id, value: selItem.Descrizione },
      { id: provincia.id, value: selItem.Provincia },
      { id: cap.id, value: selItem.CAP },
      { id: nazione.id, value: "Italia" },
    ]);
    setFormIsVisible(false);
  };
  const onStophandler = () => {
    setFormIsVisible(false);
  };

  const itemsSearch = ["CAP", "Descrizione"];
  return (
    <>
      <FrameInRow
        width={[
          "nopaddingleft 20",
          "65 nopaddingright",
          "1 flexend flexcolumn nopaddingleft",
          5,
          5,
        ]}
      >
        <Input
          label={nazione.label}
          id={nazione.id}
          val={getCitta}
          onChange={onChange}
        />
        <Input
          label={citta.label}
          id={citta.id}
          val={getCitta}
          onChange={onChange}
        />
        <Button onClick={cittaClickHandler} type="sm">
          <Img type="trepuntini" pathImg="getlocal" />
        </Button>
        <Input
          label={provincia.label}
          id={provincia.id}
          val={getCitta}
          onChange={onChange}
        />
        <Input
          label={cap.label}
          id={cap.id}
          val={getCitta}
          onChange={onChange}
        />
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
            onClickRow={selCitta}
            onDoubleClickRow={selCitta}
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
