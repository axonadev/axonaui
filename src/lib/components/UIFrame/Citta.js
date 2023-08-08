import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import FrameInRow from "../Frame/FrameInRow";

const Citta = ({ nazione, citta, provincia, cap, val, onChange }) => {
  const cittaClickHandler = () => {
    alert("cosa clicchi? non va ancora");
  };
  return (
    <FrameInRow width={[20, 65, 5, 5, 5]}>
      <Input
        label={nazione.label}
        id={nazione.id}
        val={val}
        onChange={onChange}
      />
      <Input label={citta.label} id={citta.id} val={val} onChange={onChange} />
      <Button onClick={cittaClickHandler}>Cliccami</Button>
      <Input
        label={provincia.label}
        id={provincia.id}
        val={val}
        onChange={onChange}
      />
      <Input label={cap.label} id={cap.id} val={val} onChange={onChange} />
    </FrameInRow>
  );
};
export default Citta;
