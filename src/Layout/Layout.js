import React, { useState } from "react";
import { Header, SideMenu, ContentForm, ProjectMenu } from "../lib/index";
import { useEnv } from "axonalib";
import Project from "../Pages/Project";
import useProjectMenu from "../hooks/useProjectMenu";

const Layout = () => {
  const { REACT_APP_IMGFOLDER } = useEnv();
  const [styleMenu, setStyleMenu] = useState(
    localStorage.getItem("axn_sidemenuswitch") === "true" ? true : false
  );
  const [formPj, setFormPj] = useState(null);

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
  return (
    <>
      <Header
        titolo={"titolo"}
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
      <ContentForm sidemenuopen={styleMenu} request={answerReq}>
        <Project />
      </ContentForm>
      <ProjectMenu
        items={pjItems}
        onClick={projectMenuClickHandler}
        pathImg={REACT_APP_IMGFOLDER}
        onRequestSubmit={projectMenuRequestSubmitHandler}
      >
        {formPj}
      </ProjectMenu>
    </>
  );
};
export default Layout;
