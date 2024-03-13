import React from "react";
import classes from "../style/List.module.css";
import ImgFont from "../Img/ImgFont";

const List = ({
  items,
  title,
  element,
  onClick,
  onClickIcon1,
  onClickIcon2,
  icon1 = "",
  icon2 = "",
  icon1Size = "medium",
  icon2Size = "medium",
}) => {
  const itemHandler = (item) => {
    try {
      onClick(item);
    } catch (error) {
      console.log("Nessuna funzione passata come prop onClick");
    }
  };

  const onIcon1ClickHandler = (item) => {
    try {
      onClickIcon1(item);
    } catch (error) {
      console.log("Nessuna funzione passata come prop ad onClickIcon1();");
    }
  };

  const onIcon2ClickHandler = (item) => {
    try {
      onClickIcon2(item);
    } catch (error) {
      console.log("Nessuna funzione passata come prop ad onClickIcon2();");
    }
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
                <div>
                  {/* ICONA1 */}
                  {icon1 && icon1.length > 0 && (
                    <ImgFont
                      icon={icon1}
                      className={classes.icon}
                      size={icon1Size}
                      onClick={(e) => {
                        e.stopPropagation();
                        onIcon1ClickHandler(item);
                      }}
                    />
                  )}
                  {/* ICONA2 */}
                  {icon2 && icon2.length > 0 && (
                    <ImgFont
                      icon={icon2}
                      className={classes.icon}
                      size={icon2Size}
                      onClick={(e) => {
                        e.stopPropagation();
                        onIcon2ClickHandler(item);
                      }}
                    />
                  )}
                </div>
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
