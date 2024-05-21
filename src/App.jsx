import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";

function App() {
  const [privacy, setPrivacy] = useState(false);
  return (
    <>
      <Header privacy={privacy} setPrivacy={setPrivacy} />
    </>
  );
}

export default App;
