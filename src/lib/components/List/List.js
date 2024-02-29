import React, { useEffect } from "react";
import classes from "./List.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const List = ({ items, title, element, onClick }) => {
  console.log(items);
  const itemHandler = (item) => {
    try {
      onClick(item);
    } catch (error) {
      console.log("Nessuna funzione passata come prop onClick");
    }
  };

  const onDelete = (id) => {
    console.log("onDelete", id);
  };

  return (
    <div>
      <h1 className={classes.listTitle}>{title}</h1>
      {items ? (
        <ul className={classes.list}>
          {items.map((item, i) => {
            return (
              <li
                key={i}
                className={classes.listItem}
                onClick={() => itemHandler(item)}
              >
                {item[element]}

                <FontAwesomeIcon
                  icon={faTrashCan}
                  className={classes.deleteIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(item);
                  }}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Non ci sono elementi</p>
      )}
    </div>
  );
};

export default List;
