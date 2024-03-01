import React, { useState, useEffect } from "react";
import { Header, SideMenu, ContentForm, ProjectMenu } from "../lib/index";
import { useEnv } from "axonalib";
import Project from "../Pages/Project";
import useProjectMenu from "../hooks/useProjectMenu";
import useList from "../lib/hooks/useList";

import List from "../lib/components/List/List";
import ProjectMenuButton from "../lib/components/ProjectMenu/ProjectMenuButton.prv";

const Layout = () => {
  //# LISTA DICHIARATA SOLO PER PASSARE UNA LISTA AL COMPONENTE LIST
  const [itemFolders, setItemFolders] = useState([
    { key: 1, label: "Anagrafica", img: "faAddressCard", target: "anagrafica" },
    { key: 2, label: "Domicili", img: "faHouseUser", target: "domicili" },
    {
      key: 3,
      label: "Contabilità",
      img: "faFileInvoice",
      target: "contabilita",
    },
    { key: 4, label: "CRM", img: "faUsersGear", target: "crm" },
    {
      key: 5,
      label: "Fatture Automatiche",
      img: "faFileSignature",
      target: "fattureautomatiche",
    },
    { key: 6, label: "Dotazioni", img: "faListUl", target: "dotazioni" },
    { key: 7, label: "Note", img: "faFilePen", target: "note" },
    { key: 8, label: "GDPR", img: "faFileShield", target: "gdpr" },
    { key: 9, label: "Storico", img: "faScroll", target: "pergamenta" },
    {
      key: 10,
      label: "Altri dati gestionali",
      img: "faDatabase",
      target: "altridati",
    },
  ]);
  //# ******************* FINE LISTA *******************************

  const titolo = "titolo";
  const versione = "00.00.00";
  const { REACT_APP_IMGFOLDER, REACT_APP_SERVERAPI } = useEnv();

  const [styleMenu, setStyleMenu] = useState(
    localStorage.getItem("axn_sidemenuswitch") === "true" ? true : false
  );

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

  const onSideMenuChangeHandler = (stmenu) => {
    setStyleMenu(stmenu);
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

  const deleteFromList = (element) => {
    setItemFolders(itemFolders.filter((item) => item !== element));
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
        <Project list={list} help={isHelp} />
      </ContentForm>

      <ProjectMenu
        title='Prova'
        pathImg={REACT_APP_IMGFOLDER}
        versione={versione}
        onHelp={onHelpstato}
      >
        <ProjectMenuButton id={"lista"} icon='faBan' label={"ban"}>
          <List
            items={itemFolders}
            title={"Lista di prova"}
            element={"label"}
            onClick
            onDelete={deleteFromList}
          />
        </ProjectMenuButton>
        <ProjectMenuButton id={"floppy"} icon='faFloppyDisk' label={"2ban"}>
          <input type='color'></input>
        </ProjectMenuButton>
      </ProjectMenu>
    </>
  );
};
export default Layout;
