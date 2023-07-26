import React from "react";
import Button from "../Button/Button";
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
        },
        {
          key: 2,
          onClick: "onStop",
          type: "stop",
          label: "Annulla",
        },
      ];

  return (
    <div id={id}>
      <div className={classes.messagemodal_backdrop} onClick={onOut} />
      <div className={classContent.join(" ")}>
        <header className={classes.messagemodal_header}>
          <h2>{title}</h2>
        </header>
        <div className={classes.messagemodal_content}>
          {message && <p>{message}</p>}
          {children && children}
        </div>
        <footer 
          className={`${classes.messagemodal_actions} ${classes.messagemodal_footer}`}
        >
          {c_buttons.map((item) => {
            return (
              
              <Button
                key={item.key}
                onClick={item.onClick}
                className={`${classes.messagemodal_minButton} ${
                  classes[item.type]
                }`}
              >
                
                {item.label}
              
              </Button>
              
            );
          })}
        </footer>
      </div>
    </div>
  );
};

export default MessageModal;
