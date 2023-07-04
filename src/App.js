import { Button, LoadingSpinner } from "./lib";

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
    </>
  );
}

export default App;
