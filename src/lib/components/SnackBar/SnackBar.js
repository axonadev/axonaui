import React, { Fragment, useEffect, useState } from "react";
import classes from "../style/SnackBar.module.css";

const SnackBar = ({ img, label, onTimeOut, timer = 2800 }) => {
  const [visibile, setVisibile] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisibile(false);
      onTimeOut();
    }, timer);
  }, []);
  return (
    <div className={classes.snackbarOld}>
      {visibile && (
        <div className={classes.snackbar_content}>
          <div className={classes.snackbar_body}>
            <img className={classes.snackbar_img} src={img} alt='' />
            <label className={classes.snackbar_label}>{label}</label>
          </div>
          <div className={classes.snackbar_progress}></div>
        </div>
      )}
    </div>
  );
};
export default SnackBar;
