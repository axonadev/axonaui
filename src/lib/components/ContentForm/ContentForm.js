import React from "react";
import classes from "../style/ContentForm.module.css";
const ContentForm = ({ children, sidemenuopen }) => {
  const stylecontent = [
    classes.content_body,
    sidemenuopen
      ? classes.content_body_sidemenuopen
      : classes.content_body_sidemenuclose,
  ];

  return <div className={stylecontent.join(" ")}>{children}</div>;
};
export default ContentForm;
