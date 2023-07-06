import React, { Fragment, useEffect, useState } from "react";
import classes from "../style/SnackBar.module.css";

const SnackBar = ({ img, label, timer = 2800 }) => {
  const [visibile, setVisibile] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setVisibile(false);
    }, timer);
  }, []);
  return (
    <Fragment>
      {visibile && (
        <div className={classes.snackbar_content}>
          <div className={classes.snackbar_body}>
            <img className={classes.snackbar_img} src={img} alt="" />
            <label className={classes.snackbar_label}>{label}</label>
          </div>
          <div className={classes.snackbar_progress}></div>
        </div>
      )}
    </Fragment>
  );
};
export default SnackBar;
