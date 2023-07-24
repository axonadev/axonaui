import React from "react";
import classes from "../style/ContentForm.module.css";
import Form from "../Form/Form";

const ContentForm = ({ children, sidemenuopen }) => {
  const stylecontent = [
    classes.content_body,
    sidemenuopen
      ? classes.content_body_sidemenuopen
      : classes.content_body_sidemenuclose,
  ];

  return (
    <Form>
      <div className={stylecontent.join(" ")}>{children}</div>
    </Form>
  );
};
export default ContentForm;
