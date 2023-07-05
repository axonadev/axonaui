import { Button, CssStruct, LoadingSpinner } from "./lib";

function App() {
  return (
    <>
      <div className="App">Axona UI library</div>
      <Button
        onClick={() => {
          console.log("click");
        }}
      >
        clicca
      </Button>
      <LoadingSpinner></LoadingSpinner>

      <CssStruct url="http://192.168.2.159:8866/css" piva="55555555550">
        <Button
          id="btntest"
          onClick={() => {
            console.log("click");
          }}
        >
          test
        </Button>
      </CssStruct>
    </>
  );
}

export default App;
