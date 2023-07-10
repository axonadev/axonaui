import { Filter, Grid, CssStruct } from "./lib";

function App() {
  return (
    <>
      <div className="App">Axona UI library</div>
      <CssStruct url="http://192.168.2.159:8011/css">
        {/* tenere per sviluppare il css */}
        <Grid
          id={"id"}
          onDoubleClickRow={() => {
            console.log("doubleclick");
          }}
          onClickRow={() => {
            console.log("click");
          }}
          items={[
            { id: 1, Soggetti_Nome1: "nome1" },
            { id: 2, Soggetti_Nome1: "nome2" },
          ]}
          columns={[
            {
              key: 1,
              Label: "ID",
              dbField: "IDOBJ",
              order: 0,
            },
            {
              key: 2,
              Label: "Cliente",
              dbField: "Soggetti_Nome1",
              nullVal: "-",
              order: 2,
            },
          ]}
          itemSearch={["Soggetti_Nome1"]}
          itemInsert={true}
          onFilter={() => {
            console.log("filter");
          }}
          onBtnInsert={() => {
            console.log("click insert");
          }}
        />
      </CssStruct>
    </>
  );
}

export default App;
