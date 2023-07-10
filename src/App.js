import { Filter, MessageModal } from "./lib";

function App() {
  return (
    <>
      <div className="App">Axona UI library</div>

      <MessageModal title="questo è il titolo" message="questo è un messaggio">
        <label>label in children</label>
        <p>
          <input type="date" />
        </p>
      </MessageModal>
    </>
  );
}

export default App;
