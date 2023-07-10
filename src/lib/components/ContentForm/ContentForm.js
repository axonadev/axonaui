import classes from "../style/ContentForm.module.css";
const ContentForm = ({ children }) => {
  return <div className={classes.content_body}>{children}</div>;
};
export default ContentForm;
