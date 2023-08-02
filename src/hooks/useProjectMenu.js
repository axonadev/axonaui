import { ProjectMenuForm, getProjectMenuItem } from "axonaform";
import React, { useState, useEffect } from "react";

const useProjectMenu = () => {
  const [items, setItems] = useState([]);
  const [answerReq, setAnserReq] = useState([]);

  useEffect(() => {
    const itemspj = getProjectMenuItem();

    setItems(itemspj);
  }, []);

  const getFormMenuPj = (idItem) => {
    return (
      <>
        <ProjectMenuForm idItem={idItem} />
      </>
    );
  };
  const processRequest = (evt) => {
    console.log(evt, "processRequest");

    console.log(evt.target[0].id, "processRequest");

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
