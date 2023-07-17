import { Filter, Grid, SideMenu, CssStruct, Folder } from "./lib";

function App() {
  return (
    <>
      <div className="App">Axona UI library</div>
      <CssStruct url="http://192.168.2.159:8011/css">
        {/* tenere per sviluppare il css */}

        <SideMenu />
      </CssStruct>
    </>
  );
}

export default App;
