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
        {" "}
        <ProjectMenuForm idItem={idItem} />{" "}
      </>
    );
  };
  const processRequest = (evt) => {
    let arr = [];
    for (const item of evt.target.elements) {
      console.log(item.id, "id item");
      arr = [...{ id: item.id, data: item.value }];
    }

    setAnserReq([arr]);
  };
  return {
    items,
    answerReq,
    getFormMenuPj,
    processRequest,
  };
};
export default useProjectMenu;
