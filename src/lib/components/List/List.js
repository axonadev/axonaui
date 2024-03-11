import React from "react";
import classes from "../style/List.module.css";
import ImgFont from "../Img/ImgFont";

const List = ({ items, title, element, onClick, onDelete, icon = "" }) => {
  const itemHandler = (item) => {
    try {
      onClick(item);
    } catch (error) {
      console.log("Nessuna funzione passata come prop onClick");
    }
  };

  const deleteItemHandler = (item) => {
    onDelete(item);
  };

  return (
    <>
      {/* TITOLO */}
      {title && <h1 className={classes.listTitle}>{title}</h1>}
      {items && items.length > 0 ? (
        <ul className={classes.list}>
          {items.map((item, i) => {
            return (
              <li
                key={i}
                className={classes.listItem}
                onClick={() => itemHandler(item)}
              >
                {/* ELEMENTO */}
                {element ? item[element] : item}

                {/* ICONA */}
                <ImgFont
                  icon={icon}
                  className={classes.deleteIcon}
                  size='medium'
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItemHandler(item);
                  }}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <li className={classes.singleElement}>Non ci sono elementi</li>
      )}
    </>
  );
};

export default List;
