import React from "react";
import classes from "../style/List.module.css";
import ImgFont from "../Img/ImgFont";

const ListItem = ({
  item,
  keyID,
  element,
  icon1,
  icon2,
  icon1Size,
  icon2Size,
  icon1Color,
  icon2Color,
  onClickIcon1,
  onClickIcon2,
  onClick,
}) => {
  //* Click dell'elemento
  const itemHandler = (item) => {
    try {
      onClick(item);
    } catch (error) {
      console.log("Nessuna funzione passata come prop onClick");
    }
  };
  //* Click di icona1
  const onIcon1ClickHandler = (item) => {
    try {
      onClickIcon1(item);
    } catch (error) {
      console.log("Nessuna funzione passata come prop ad onClickIcon1();");
    }
  };

  //* Click di icona2
  const onIcon2ClickHandler = (item) => {
    try {
      onClickIcon2(item);
    } catch (error) {
      console.log("Nessuna funzione passata come prop ad onClickIcon2();");
    }
  };

  return (
    <li
      key={keyID}
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
            color={icon1Color}
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
            color={icon2Color}
          />
        )}
      </div>
    </li>
  );
};

export default ListItem;
