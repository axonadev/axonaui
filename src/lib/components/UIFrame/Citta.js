import React, { useState } from "react";
import Input from "../Input/Input";
import InputList from "../Input/InputList";
import Grid from "../Grid/Grid";
import FrameInRow from "../Frame/FrameInRow";
import MessageModal from "../MessageModal/MessageModal";
import { useEnv } from "axonalib";

const Citta = ({
  nazione,
  citta,
  provincia,
  cap,
  form_id,
  onChange,
  onChangeValue,
}) => {
  const [idobj, setIdobj] = useState(0);
  const [selItem, setSelItem] = useState();
  const [formIsVisible, setFormIsVisible] = useState(false);

  const { REACT_APP_SERVERAPI } = useEnv();

  const cmd_getGrid = "/citta/cittasel/leggi";

  const cittaClickHandler = () => {
    setFormIsVisible(true);
  };

  const selCitta = (id, items) => {
    setIdobj(id);
    setSelItem(items);
  };

  const onSelectCitta = () => {
    onChangeValue(citta.id, selItem.Descrizione);
    onChangeValue(provincia.id, selItem.Provincia);
    onChangeValue(cap.id, selItem.CAP);
    onChangeValue(nazione.id, 118);
    setFormIsVisible(false);
  };
  const onStophandler = () => {
    setFormIsVisible(false);
  };

  const itemsSearch = ["CAP", "Descrizione"];
  return (
    <>
      <FrameInRow
        width={["nowidth", "nowidth ciccio", "nowidth"]}
        // width={["nopaddingleft 20", "65 nopaddingright", 5, 10]}
        form_id={form_id}
      >
        <InputList
          className={"input_width_100"}
          label={nazione.label}
          id={nazione.id}
          onChange={onChange}
          onChangeValue={onChangeValue}
          field_id='IDOBJ'
          field_description={["Nazioni_Descrizione"]}
          url={
            REACT_APP_SERVERAPI +
            "api/axo_sel/" +
            localStorage.getItem("axn_token") +
            "/citta/cittasel/legginazioni"
          }
          nameList='v_nazioni'
        />
        <Input
          className={"input_flex"}
          label={citta.label}
          id={citta.id}
          onChangeValue={onChangeValue}
          onChange={onChange}
          icon='faEllipsis'
          onIconClick={cittaClickHandler}
        />
        <Input
          className='input_width_50'
          label={cap.label}
          id={cap.id}
          onChangeValue={onChangeValue}
          onChange={onChange}
        />
        <Input
          className='input_width_50'
          label={provincia.label}
          id={provincia.id}
          onChangeValue={onChangeValue}
          onChange={onChange}
          validate={[
            {
              type: "maxlenght",
              value: 2,
            },
          ]}
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
            id='grid_citta'
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
