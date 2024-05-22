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
  return (
    <div className="mainbody">
      <Header privacy={privacy} setPrivacy={setPrivacy} />
      <Main
        privacy={privacy}
        openTab={openTab}
        setOpenTab={setOpenTab}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </div>
  );
}

export default App;
