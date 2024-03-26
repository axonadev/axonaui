import React, { useEffect, useState } from "react";
import classes from "../style/List.module.css";
import ListItem from "./ListItem";
import { ImgFont, Input } from "axonaui";

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
  icon1Color = "primary",
  icon2Color = "primary",
  children,
  filter = true,
  filterElement = element,
}) => {
  //* UseStates
  const [parolaRicerca, setParolaRicerca] = useState("");
  const [listaFiltrata, setListaFiltrata] = useState(items);

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

  //* Filtro
  const filtro = () => {
    if (parolaRicerca.length > 0) {
      const filteredList = items.filter((item) =>
        item[filterElement].toLowerCase().includes(parolaRicerca.toLowerCase())
      );
      setListaFiltrata(filteredList);
    } else {
      setListaFiltrata(items);
    }
  };

  //* UseEffects
  useEffect(() => {
    setListaFiltrata(items);
  }, [items]);
  useEffect(() => {
    filtro();
  }, [parolaRicerca]);

  return (
    <>
      {/* TITOLO */}
      {title && <h1 className={classes.listTitle}>{title}</h1>}

      {/* FILTRO */}
      {filter && (
        <div className={classes.filterDiv}>
          <ImgFont
            className={classes.filterIcona}
            size='medium'
            icon={"faMagnifyingGlass"}
            cursor={true}
          />
          <Input
            className={classes.filter_search}
            onChange={(e) => setParolaRicerca(e.target.value)}
          />
        </div>
      )}

      {/* Se c'è un children passa quello, in caso contrario cicla su listaFiltrata */}
      {children ? (
        children
      ) : listaFiltrata && listaFiltrata.length > 0 ? (
        <ul className={classes.list}>
          {listaFiltrata.map((item, i) => {
            return (
              <ListItem
                key={i}
                item={item}
                element={element}
                onClick={itemHandler}
                icon1={icon1}
                icon2={icon2}
                icon1Size={icon1Size}
                icon2Size={icon2Size}
                icon1Color={icon1Color}
                icon2Color={icon2Color}
                onClickIcon1={onIcon1ClickHandler}
                onClickIcon2={onIcon2ClickHandler}
              />
            );
          })}
        </ul>
      ) : (
        <li className={classes.singleElement}>Nessun elemento</li>
      )}
    </>
  );
};

export default List;
