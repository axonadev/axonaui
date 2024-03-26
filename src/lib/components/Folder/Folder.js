import React, { useState } from "react";
import FolderLabel from "./FolderLabel.prv";
import Card from "../Card/Card";
import classes from "../style/Folder.module.css";

const Folder = ({ items, onSelect, startSelect }) => {
  const [active, setActive] = useState(startSelect);

  const onClickHendler = (itemAttivo) => {
    setActive(itemAttivo);
    onSelect(itemAttivo);
  };

  return (
    <Card type="lg">
      <div className={classes.folder_content}>
        {items &&
          items.map((item) => {
            return (
              <div
                key={item.ConfigFolderProject_Key}
                className={
                  item.ConfigFolderProject_Target === active
                    ? classes.folder_active
                    : ""
                }
              >
                <FolderLabel
                  chiave={item.ConfigFolderProject_Key}
                  target={item.ConfigFolderProject_Target}
                  onClick={onClickHendler}
                  img={item.ConfigFolderProject_Immagine}
                >
                  {item.ConfigFolderProject_Label}
                </FolderLabel>
              </div>
            );
          })}
      </div>
    </Card>
  );
};
export default Folder;
