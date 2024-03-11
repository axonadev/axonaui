import React, { useState } from "react";
import classes from "../style/Frame.module.css";
import Card from "../Card/Card";
import Button from "../Button/Button";
import ImgFont from "../Img/ImgFont";

const Frame = ({
  label,
  children,
  form_id,
  type = "form",
  id,
  stato = "",
  ridimensiona = false,
  onChangeValue,
  selezionato = false,
  onActive,
  setup = false,
  help = false,
  icon,
}) => {
  const [dimFrame, setDimFrame] = useState(2);
  const [isSetup, setIsSetup] = useState(false);
  const [openSetup, setOpenSetup] = useState(false);

  const classStyle = ["frame_label", classes.frame_label];
  const classStyleStato = ["frame_label", classes.frame_stato];
  const classStyleRidimensiona = ["frame_label", classes.frame_ridimensiona];
  const classStyleMeno = ["frame_label", classes.frame_meno];
  const classCard = [
    classes["frame_" + stato.toLowerCase()],
    classes["frame_selezionato_" + selezionato],
    classes["frame_dimensione_" + dimFrame],
  ];

  let argpost;

  const closeSetup = () => {
    setOpenSetup(false);
  };

  if (onChangeValue !== undefined) {
    argpost = {
      form_id: form_id,
      onChangeValue: onChangeValue,
      openSetup: openSetup,
      closeSetup: closeSetup,
      help: help,
      key: id,
    };
  } else {
    argpost = {
      form_id: form_id,
      openSetup: openSetup,
      closeSetup: closeSetup,
      help: help,
      key: id,
    };
  }

  const clickHandler = () => {
    try {
      onActive();
    } catch (error) {}
  };
  const keyUpHandler = (evt) => {
    if (setup) {
      if (evt.keyCode === 18) {
        //alt
        setIsSetup((prec) => {
          return !prec;
        });
      }
    }
  };

  return (
    <Card
      type={type}
      id={id}
      className={classCard.join(" ")}
      onClick={clickHandler}
      onKeyUp={keyUpHandler}
    >
      {label && (
        <div className={classes.frame_header}>
          {label && (
            <div className={classStyle.join(" ")}>
              {icon && <ImgFont icon={icon} size='medium' />} {label}
            </div>
          )}
          {ridimensiona && (
            <div className={classStyleRidimensiona.join(" ")}>
              <Button
                className={classes.ridimensionaico}
                onClick={() => {
                  dimFrame === 1 ? setDimFrame(2) : setDimFrame(1);
                }}
              >
                {dimFrame === 1 ? (
                  <ImgFont icon='faChevronDown' size='medium' />
                ) : (
                  <ImgFont icon='faChevronUp' size='medium' />
                )}
              </Button>
              <Button
                className={classes.ridimensionaico}
                onClick={() => {
                  setDimFrame(3);
                }}
              >
                <ImgFont icon='faUpRightAndDownLeftFromCenter' size='medium' />
              </Button>
              {isSetup && (
                <Button
                  className={classes.ridimensionaico}
                  onClick={() => {
                    setOpenSetup(true);
                  }}
                >
                  <ImgFont icon='faGears' size='medium' />
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      <div className={classes.framecontent}>
        {children.length > 1 &&
          children.map((item, i) => {
            return (
              <React.Fragment key={i}>
                {React.cloneElement(item, argpost)}
              </React.Fragment>
            );
          })}
        {children.length === undefined && React.cloneElement(children, argpost)}
      </div>
    </Card>
  );
};

export default Frame;
