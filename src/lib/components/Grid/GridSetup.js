import MessageModal from "../MessageModal/MessageModal";

const GridSetup = ({ onClose }) => {
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
      ></MessageModal>
    </>
  );
};
export default GridSetup;
