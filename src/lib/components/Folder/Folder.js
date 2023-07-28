import React, {useState} from "react";
import FolderLabel from "./FolderLabel.prv";
import classes from "../style/Folder.module.css";


const Folder = ({ items }) => {
 const [active,setActive]=useState("");

 const onClickHendler=(itemAttivo)=>{
  setActive(itemAttivo);
 }

  return (
    <React.Fragment>
      <div className={classes.folder_content}>
        {items &&
          items.map((item) => {
            return (
              <div className={(item.target===active?classes.folder_active:"")}>
              <FolderLabel
                key={item.key}
                target={item.target}
                onClick={onClickHendler}
            
              >
                {item.label}
              </FolderLabel>
              </div>
            );
          })}
      </div>

    </React.Fragment>
  );
};
export default Folder;
