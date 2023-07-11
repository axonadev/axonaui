import { Filter, Grid, CssStruct, Folder } from "./lib";
import Form from "./lib/components/Form/Form";

function App() {
  return (
    <>
      <div className="App">Axona UI library</div>
      <CssStruct url="http://192.168.2.159:8011/css">
        {/* tenere per sviluppare il css */}

        <Folder
          onClick={(id) => {
            console.log(id);
          }}
          items={[
            {
              key: 1,
              label: "Destinazioni",
              target: "soggettidestinazioni",
              active: true,
            },
            { key: 2, label: "CRM", target: "soggetticrm", active: false },
          ]}
        ></Folder>
      </CssStruct>
    </>
  );
}

export default App;
