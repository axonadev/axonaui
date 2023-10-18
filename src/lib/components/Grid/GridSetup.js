import MessageModal from "../MessageModal/MessageModal";
import GridSetupItem from "./GridSetupItem";
import FrameContainer from "../Frame/FrameContainer";

const GridSetup = ({ onClose, loadGrid }) => {
  return (
    <>
      <MessageModal
        title="Setup griglia"
        buttons={[
          {
            key: 1,
            onClick: "onSave",
            type: "success",
            label: "Salva",
          },
          {
            key: 2,
            onClick: onClose,
            type: "stop",
            label: "Annulla",
          },
        ]}
      >
        <FrameContainer>
          <GridSetupItem loadGrid={loadGrid} />
        </FrameContainer>
      </MessageModal>
    </>
  );
};
export default GridSetup;
