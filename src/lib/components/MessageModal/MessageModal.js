import React from "react";
import Button from "../Button/Button.tsx";
import ImgFont from "../Img/ImgFont";
import classes from "../style/MessageModal.module.css";

const MessageModal = ({
  id,
  type,
  buttons,
  title,
  message,
  children,
  onOut,
}) => {
  const classContent = [
    classes.messagemodal_modal,
    classes["messagemodal_modal_" + (type ? type : "msg")],
  ];

  const c_buttons = buttons
    ? buttons
    : [
        {
          key: 1,
          onClick: "onSave",
          type: "success",
          label: "Salva",
          icon: "faFloppyDisk",
        },
        {
          key: 2,
          onClick: "onStop",
          type: "stop",
          label: "Annulla",
          icon: "faBan",
        },
      ];

  return (
    <div id={id}>
      <div className={classes.messagemodal_backdrop} onClick={onOut} />
      <div className={classContent.join(" ")}>
        <div className={classes.messagemodal_header}>
          <h2>{title}</h2>
          {message && <p>{message}</p>}
          {children && children}
        </div>
        <div className={classes.buttonContainer}>
          {c_buttons.map((item) => {
            return (
              <Button
                key={item.key}
                onClick={item.onClick}
                className={`${classes.messagemodal_minButton} ${
                  classes[item.type]
                }`}
              >
                <ImgFont icon={item.icon} />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
