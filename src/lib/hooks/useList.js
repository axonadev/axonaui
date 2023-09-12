import React, { useState } from "react";
import { useEffect } from "react";
const useList = (obj, token, server) => {
  const [list, setList] = useState([]);

  const leggi = (command, nameView, token, server) => {
    const goUrl = server + "api/axo_sel/" + token + "/" + command;
    fetch(goUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const newList = { nameView: nameView, data: data.Itemset[nameView] };

        setList((prev) => {
          const updList = prev.filter((item) => item.nameView === nameView);

          if (updList.length > 0) {
            const toUpdate = {
              ...prev.find((item) => item.nameView === nameView),
              ...newList,
            };
            const updated = prev.map((item) =>
              item.nameView === nameView ? toUpdate : item
            );

            return updated;
          } else {
            const updated = prev.concat(newList);

            return updated;
          }
        });
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  useEffect(() => {
    obj.map((item) => {
      leggi(item.command, item.nameView, token, server);
    });
  }, []);

  return {
    list,
  };
};
export default useList;
