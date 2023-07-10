import { Frame, FrameInRow, SideMenu } from "./lib";

function App() {
  return (
    <>
      <div className="App">Axona UI library</div>
      <Frame label={"test frame"}>
        <FrameInRow width={[20]}>
          <label>test frame</label>
        </FrameInRow>
        <FrameInRow width={[80]}>
          <label>test frame</label>
        </FrameInRow>
        <FrameInRow width={[20, 20, 40, 20]}>
          <label>test frame</label>
          <label>test frame</label>
          <label>test frame</label>
          <label>test frame</label>
        </FrameInRow>

        <label>test frame</label>
      </Frame>
    </>
  );
}

export default App;
