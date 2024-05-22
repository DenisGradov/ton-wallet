import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import { themas } from "./themas/themas";

function App() {
  const [privacy, setPrivacy] = useState(false);
  const [openTab, setOpenTab] = useState("Profile");
  const [userInfo, setUserInfo] = useState({
    avatar: null, //путь к дефолт фотке "./assets/userAvatar.png"
    name: "",
    bio: "",
  });

  const [userThema, setUserThema] = useState(Object.keys(themas)[0]);

  const currentTheme = themas[userThema];
  const [toggleState, setToggleState] = useState({
    //настройки тумблеров
    allowNewContact: true,
    alwaysAsk: true,
    alwaysShowPreview: false,
    neverShowPreview: false,
  });
  return (
    <div
      className="mainbody"
      style={{
        "--colour1": currentTheme.color1,
        "--colour2": currentTheme.color2,
        "--colour3": currentTheme.color3,
        "--colour4": currentTheme.color4,
        "--colour5": currentTheme.color5,
        "--colour6": currentTheme.color6,
        "--colour7": currentTheme.color7,
        "--colour8": currentTheme.color8,
      }}
    >
      <Header privacy={privacy} setPrivacy={setPrivacy} userThema={userThema} />
      <Main
        privacy={privacy}
        openTab={openTab}
        setOpenTab={setOpenTab}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        toggleState={toggleState}
        setToggleState={setToggleState}
        userThema={userThema}
        setUserThema={setUserThema}
      />
    </div>
  );
}

export default App;
