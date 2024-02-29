import React, { useState, useEffect } from "react";
import { Header, SideMenu, ContentForm, ProjectMenu } from "../lib/index";
import { useEnv } from "axonalib";
import Project from "../Pages/Project";
import useProjectMenu from "../hooks/useProjectMenu";
import useList from "../lib/hooks/useList";

const Layout = () => {
  const titolo = "titolo";
  const versione = "00.00.00";
  const { REACT_APP_IMGFOLDER, REACT_APP_SERVERAPI } = useEnv();

  const [styleMenu, setStyleMenu] = useState(
    localStorage.getItem("axn_sidemenuswitch") === "true" ? true : false
  );
  const [formPj, setFormPj] = useState(null);

  const { list } = useList(
    [
      {
        command: "articoli/articolisel/leggicombotipi",
        nameView: "v_tipiarticolo",
      },
      {
        command: "pagamenti/pagamentisel/leggicombo",
        nameView: "v_pagamenti",
      },
      {
        command: "divise/divisesel/leggicombo",
        nameView: "v_divise",
      },
    ],
    localStorage.getItem("axn_token"),
    REACT_APP_SERVERAPI
  );

  const [isHelp, setIsHelp] = useState(false);

  const {
    items: pjItems,
    getFormMenuPj,
    processRequest,
    answerReq,
  } = useProjectMenu();

  const onSideMenuChangeHandler = (stmenu) => {
    setStyleMenu(stmenu);
  };
  const projectMenuClickHandler = (idProject) => {
    setFormPj(getFormMenuPj(idProject));
  };

  const projectMenuRequestSubmitHandler = (evt) => {
    processRequest(evt);
  };

  useEffect(() => {
    var key;
    for (var i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i);
      if (key.indexOf("axn_list_") > -1 || key.indexOf("axn_record_") > -1) {
        localStorage.removeItem(key);
      }
    }
  }, []);

  const onHelpstato = (valore) => {
    setIsHelp(valore);
  };

  return (
    <>
      <Header
        titolo={titolo}
        logo={
          REACT_APP_IMGFOLDER +
          "/" +
          localStorage.getItem("axn_piva") +
          "/logo.png"
        }
      />
      <SideMenu
        onSideMenuChange={onSideMenuChangeHandler}
        pathImg={REACT_APP_IMGFOLDER}
      />
      <ContentForm sidemenuopen={styleMenu}>
        <Project request={answerReq} list={list} help={isHelp} />
      </ContentForm>
      <ProjectMenu
        items={pjItems}
        title='Prova'
        onClick={projectMenuClickHandler}
        pathImg={REACT_APP_IMGFOLDER}
        onRequestSubmit={projectMenuRequestSubmitHandler}
        versione={versione}
        onHelp={onHelpstato}
      >
        {formPj}
      </ProjectMenu>
    </>
  );
};
export default Layout;
