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
    <Card type='lg'>
      <div className={classes.folder_content}>
        {items &&
          items.map((item) => {
            return (
              <div
                className={item.target === active ? classes.folder_active : ""}
              >
                <FolderLabel
                  key={item.key}
                  target={item.target}
                  onClick={onClickHendler}
                  img={item.img}
                >
                  {item.label}
                </FolderLabel>
              </div>
            );
          })}
      </div>
    </Card>
  );
};
export default Folder;
