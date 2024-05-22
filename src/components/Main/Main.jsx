/* eslint-disable react/prop-types */
import Appearence from "./Content/Appearence/Appearence";
import Password from "./Content/Password/Password";
import Messaging from "./Content/Messaging/Messaging";
import Notifications from "./Content/Notifications/Notifications";
import Profile from "./Content/Profile/Profile";
import Navigation from "./Navigation/Navigation";
import styles from "./main.module.scss";
function Main({ privacy, openTab, setOpenTab, userInfo, setUserInfo }) {
  const content = {
    Profile: (
      <Profile
        privacy={privacy}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    ),
    Password: <Password />,
    Messaging: <Messaging />,
    Appearence: <Appearence />,
    Notifications: <Notifications />,
  };
  return (
    <div className={styles["wrapper"]}>
      <Navigation privacy={privacy} openTab={openTab} setOpenTab={setOpenTab} />
      {content[openTab]}
    </div>
  );
}

export default Main;
