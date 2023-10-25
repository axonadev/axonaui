import React from "react";
import MessageModal from "../MessageModal/MessageModal";
import GridSetupItem from "./GridSetupItem";
import FrameContainer from "../Frame/FrameContainer";

const GridSetup = ({ onClose, loadGrid, modulo, idGriglia }) => {
  return (
    <>
      <MessageModal
        title="Setup griglia"
        buttons={[
          {
            key: 1,
            onClick: onClose,
            type: "stop",
            label: "Esci",
          },
        ]}
      >
        <FrameContainer>
          <GridSetupItem
            loadGrid={loadGrid}
            modulo={modulo}
            idGriglia={idGriglia}
          />
        </FrameContainer>
      </MessageModal>
    </>
  );
};
export default GridSetup;
