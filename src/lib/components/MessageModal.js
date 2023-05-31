import React from "react";
import Button from "./Button";
import classes from "./style/MessageModal.module.css";

const MessageModal = (
  { type, buttons, onOut, title, message, children },
  props
) => {
  const classContent = [
    classes.modal,
    classes["modal_" + (type ? type : "msg")],
  ];

  const c_buttons = buttons
    ? buttons
    : [
        {
          key: 1,
          onClick: "onConfirmed",
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
    <div>
      <div className={classes.backdrop} onClick={onOut} />
      <div className={classContent.join(" ")}>
        <header className={classes.header}>
          <h2>{title}</h2>
        </header>
        <div className={classes.content}>
          {message && <p>{message}</p>}
          {children && children}
        </div>
        <footer className={classes.actions}>
          {c_buttons.map((item) => {
            return (
              <Button
                key={item.key}
                onClick={props[item.onClick]}
                className={`${classes.minButton} ${classes[item.type]}`}
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
