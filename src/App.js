import { Filter, Grid, CssStruct } from "./lib";
import Form from "./lib/components/Form/Form";

function App() {
  return (
    <>
      <div className="App">Axona UI library</div>
      <CssStruct url="http://192.168.2.159:8011/css">
        {/* tenere per sviluppare il css */}
        <Form
          idobj={1}
          modulo={"soggetti"}
          db={"soggetti"}
          afterSubmit={() => {
            console.log("after");
          }}
          token={localStorage.getItem("axn_token")}
          serverApi={"http://192.168.2.159:8811/"}
        >
          <input id="Soggetti_Nome1" tipo="text"></input>
          <button type="submit">invia</button>
        </Form>
      </CssStruct>
    </>
  );
}

export default App;
