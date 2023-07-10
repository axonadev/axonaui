import React from "react";
import classes from "../style/Frame.module.css";
const FrameInRow = ({ width, children }) => {
  const isList = Array.isArray(children);
  return (
    <React.Fragment>
      <div className={classes.frameinrow}>
        {width &&
          isList &&
          children.map((item, count) => {
            return (
              <div
                key={count + "_" + Math.random()}
                className={classes["frameinrow" + width[count]]}
              >
                {item}
              </div>
            );
          })}
        {width && !isList && (
          <div
            key={0 + "_" + Math.random()}
            className={classes["frameinrow" + width[0]]}
          >
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
