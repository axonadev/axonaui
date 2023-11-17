import React from "react";
import classes from "../style/Frame.module.css";
const FrameInRow = ({ width, children, form_id, onChangeValue, help=false }) => {
  const isList = Array.isArray(children);

  const classsplit = String(width[0]).split(" ");
  let classesname = [];
  classsplit.forEach((element) => {
    classesname.push(classes["frameinrow_" + element]);
  });

  let argpost;

  if (onChangeValue !== undefined) {
    argpost = {
      form_id: form_id,
      onChangeValue: onChangeValue,
      help: help,
    };
  } else {
    argpost = {
      form_id: form_id,
      help: help,
    };
  }

  return (
    <React.Fragment>
      <div className={classes.frameinrow}>
        {width &&
          isList &&
          children.map((item, count) => {
            const classsplit = String(width[count]).split(" ");
            let classesname = [];
            classsplit.forEach((element) => {
              classesname.push(classes["frameinrow_" + element]);
            });

            return (
              <div
                key={count + "_" + Math.random()}
                className={classesname.join(" ")}
              >
                {React.cloneElement(item, argpost)}
              </div>
            );
          })}
        {width && !isList && (
          <div key={0 + "_" + Math.random()} className={classesname.join(" ")}>
            {children.length > 1 &&
              children.map((item) => {
                return React.cloneElement(item, argpost);
              })}
            {children.length === undefined &&
              React.cloneElement(children, {
                form_id: form_id,
                onChangeValue: onChangeValue,
              })}
          </div>
        )}
        {!width && (
          <div
            key={0 + "_" + Math.random()}
            className={classes["frameinrownowidth"]}
          >
            {children.length > 1 &&
              children.map((item) => {
                return React.cloneElement(item, {
                  form_id: form_id,
                  onChangeValue: onChangeValue,
                });
              })}
            {children.length === undefined &&
              React.cloneElement(children, {
                form_id: form_id,
                onChangeValue: onChangeValue,
              })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default FrameInRow;
