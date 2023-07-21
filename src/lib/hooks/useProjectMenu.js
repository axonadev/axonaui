import React, { useState, useEffect } from "react";
const useProjectMenu = () => {
  const [items, setItems] = useState([]);

  const calendario = () => {
    console.log("funzione esterna");
  };

  useEffect(() => {
    const itemspj = [
      {
        id: 0,
        label: "Anni",
        img: "calendar",
        function: () => {
          calendario();
        },
      },
      {
        id: 1,
        label: "Contabilizzazione",
        img: "print",
        function: () => {
          console.log("click stampa");
        },
      },
    ];

    setItems(itemspj);
  }, []);

  return {
    items,
  };
};
export default useProjectMenu;
