import React from "react";
import classes from "../style/Frame.module.css";
const FrameInRow = ({ width, children }) => {
  const isList = Array.isArray(children);

  const classsplit = String(width[0]).split(" ");
  let classesname = [];
  classsplit.forEach((element) => {
    classesname.push(classes["frameinrow_" + element]);
  });

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
                {item}
              </div>
            );
          })}
        {width && !isList && (
          <div key={0 + "_" + Math.random()} className={classesname.join(" ")}>
            {children}
          </div>
        )}
        {!width && (
          <div
            key={0 + "_" + Math.random()}
            className={classes["frameinrownowidth"]}
          >
            {children}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default FrameInRow;
