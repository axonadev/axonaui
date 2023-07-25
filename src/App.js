import React, { useState } from "react";
import {
  Grid,
  SideMenu,
  CssStruct,
  Header,
  ContentForm,
  FrameInRow,
  Frame,
  Input,
  Form,
} from "./lib";

import ProjectMenu from "./lib/components/ProjectMenu/ProjectMenu";
import useProjectMenu from "./lib/hooks/useProjectMenu";
import useForm from "./lib/hooks/useForm";

const App = () => {
  const nameView = "v_soggetti";
  const nameTable = "soggetti";

  const [styleMenu, setStyleMenu] = useState(
    localStorage.getItem("axn_sidemenuswitch") === "true" ? true : false
  );

  const [idobj_T, setIdobj_T] = useState(0);

  const onSideMenuChangeHandler = (stmenu) => {
    setStyleMenu(stmenu);
  };

  const projectMenuClickHandler = (idProject) => {
    setFormPj(getFormMenuPj(idProject));
  };

  const projectMenuRequestSubmitHandler = (evt) => {
    processRequest(evt);
  };

  const [formPj, setFormPj] = useState(null);
  const {
    items: pjItems,
    getFormMenuPj,
    processRequest,
    answerReq,
  } = useProjectMenu();
  const { onChangeSelected } = useForm();

  const itemsSearch = ["Soggetti_Nome1", "Soggetti_Nome2"];
  return (
    <>
      <CssStruct url="http://192.168.2.159:8011/css">
        {/* tenere per sviluppare il css */}
        <Header
          logo={process.env.REACT_APP_IMGFOLDER + "/55555555550/logo.png"}
          titolo={"titolo"}
        />
        <SideMenu
          onSideMenuChange={onSideMenuChangeHandler}
          pathImg={"http://192.168.2.159:8011/img"}
        />
        <ContentForm sidemenuopen={styleMenu} request={answerReq}>
          <Frame label="TESTATA" type="form_t">
            <Grid
              itemSearch={itemsSearch}
              id="main_t"
              loadGrid={
                "http://192.168.2.159:8811/api/axo_sel/" +
                localStorage.getItem("axn_token") +
                "/soggetti/soggettisel/leggisoggetti"
              }
              nameView={nameView}
              onClickRow={(IDOBJ) => {
                setIdobj_T(IDOBJ);
                onChangeSelected(
                  "http://192.168.2.159:8811/api/axo_sel/" +
                    localStorage.getItem("axn_token") +
                    "/soggetti/soggettisel/getrow/" +
                    IDOBJ,
                  nameTable
                );
              }}
              btn_insert={true}
              onDoubleClickRow={() => {
                console.log("click");
              }}
            />
          </Frame>

          <Form
            id="form_t"
            idobj={idobj_T}
            modulo="soggetti"
            db="soggetti"
            serverApi="http://192.168.2.159:8811/"
          >
            <Frame label="DATI DI PROVA">
              <FrameInRow width={[80, 10, 10]}>
                <Input label="prova" id="Soggetti_Nome1"></Input>
                <Input label="prova" id="Soggetti_Nome2"></Input>
                <Input label="prova"></Input>
              </FrameInRow>
              <FrameInRow width={[30, 30, 40]}>
                <Input label="prova"></Input>
                <Input label="prova"></Input>
                <Input label="prova"></Input>
              </FrameInRow>
              <FrameInRow width={[20, 20]}>
                <Input label="prova"></Input>
                <Input label="prova"></Input>
              </FrameInRow>
            </Frame>
          </Form>
          <Frame label="Dati di prova">
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[20, 20]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
          </Frame>
          <Frame label="Dati di prova">
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[20, 20]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
          </Frame>
          <Frame label="Dati di prova">
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[30, 30, 40]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
            <FrameInRow width={[20, 20]}>
              <Input label="prova"></Input>
              <Input label="prova"></Input>
            </FrameInRow>
          </Frame>
        </ContentForm>
        <ProjectMenu
          items={pjItems}
          onClick={projectMenuClickHandler}
          onRequestSubmit={projectMenuRequestSubmitHandler}
        >
          {formPj}
        </ProjectMenu>
      </CssStruct>
    </>
  );
};

export default App;
