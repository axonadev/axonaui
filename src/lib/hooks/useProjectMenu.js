import React, { useState, useEffect } from "react";

const useProjectMenu = () => {
  const [items, setItems] = useState([]);
  const [answerReq, setAnserReq] = useState([]);

  const calendario = () => {
    // console.log("funzione esterna");
  };

  useEffect(() => {
    const itemspj = [
      {
        id: "anni",
        label: "Anni",
        img: "calendar",
        function: () => {
          calendario();
        },
      },
      {
        id: "conta",
        label: "Contabilizzazione",
        img: "faPrint",
        function: () => {
          // console.log("click stampa");
        },
      },
    ];

    setItems(itemspj);
  }, []);
  const getFormMenuPj = (idItem) => {
    return <input type='date' />;
  };
  const processRequest = (evt) => {
    setAnserReq([
      {
        id: 0,
        data: "",
        operazione: "tra",
      },
    ]);
  };
  return {
    items,
    answerReq,
    getFormMenuPj,
    processRequest,
  };
};
export default useProjectMenu;
