import React, { useEffect } from "react";
import Grid from "./Grid";
import FrameInRow from "../Frame/FrameInRow";
import Input from "../Input/Input";

const GridSetupItem = ({ loadGrid, modulo, idGriglia }) => {
  const pathmodulo =
    loadGrid.substring(
      0,
      loadGrid.length -
        (loadGrid.split("/")[loadGrid.split("/").length - 1].length + 1)
    ) + "/ConfigGriglia";

  return (
    <>
      <Grid
        id="grid_setup"
        loadGrid={pathmodulo}
        onClickRow={(IDOBJ) => {}}
        btn_insert={false}
        formTitle="Modifica Griglia"
        nameView={"v_gridsetup"}
        dbForm="configgriglie"
        testata={false}
        modulosecondario={modulo + "_f_" + idGriglia}
      >
        <FrameInRow width={[30, 30, 30]}>
          <Input label="Modulo" id="ConfigGriglie_Modulo" />
          <Input label="idGriglia" id="ConfigGriglie_IdGriglia" />
        </FrameInRow>
        <FrameInRow width={[50, 50]}>
          <Input label="label" id="ConfigGriglie_Label" />
          <Input label="dimensione" id="ConfigGriglie_Dimensione" />
        </FrameInRow>
        <FrameInRow width={[50, 50]}>
          <Input label="ordinamento" id="ConfigGriglie_Ordinamento" />
        </FrameInRow>
      </Grid>
    </>
  );
};
export default GridSetupItem;
