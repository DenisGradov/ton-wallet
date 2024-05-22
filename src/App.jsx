import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

function App() {
  const [privacy, setPrivacy] = useState(false);
  const [openTab, setOpenTab] = useState("Profile");
  const [userInfo, setUserInfo] = useState({
    avatar: null, //путь к дефолт фотке "./assets/userAvatar.png"
    name: "",
    bio: "",
  });

  const [toggleState, setToggleState] = useState({
    //настройки тумблеров
    allowNewContact: true,
    alwaysAsk: true,
    alwaysShowPreview: false,
    neverShowPreview: false,
  });
  return (
    <div className="mainbody">
      <Header privacy={privacy} setPrivacy={setPrivacy} />
      <Main
        privacy={privacy}
        openTab={openTab}
        setOpenTab={setOpenTab}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        toggleState={toggleState}
        setToggleState={setToggleState}
      />
    </div>
  );
}

export default App;
