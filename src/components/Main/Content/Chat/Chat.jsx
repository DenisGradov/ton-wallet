/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { users } from "../../../../users/users";
import styles from "./chat.module.scss";
import Blur from "../../Blur/Blur";
import linkify from "linkify-it";
import Warning from "../../Warning/Warning";

const linkifyInstance = linkify();

function Chat({
  search,
  setSearch,
  userOpen,
  setUserOpen,
  privacy,
  toggleState,
}) {
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [userOpen, users.find((user) => user.id === userOpen)?.messages]);

  const [warning, setWarning] = useState({
    state: false,
    link: "",
  });
  function handleUpdateInput(e) {
    setSearch(e.target.value);
  }

  function handleUpdateUserOpen(user) {
    setUserOpen(user.id);
  }
  console.log(warning);
  function formatTime(unixTime) {
    const currentTime = Math.floor(Date.now() / 1000);
    const timeDifference = currentTime - unixTime;
    const secondsInMinute = 60;
    const secondsInHour = 3600;
    const secondsInDay = 86400;

    if (timeDifference < secondsInMinute) {
      return `${timeDifference}с назад`;
    } else if (timeDifference < secondsInHour) {
      const minutes = Math.floor(timeDifference / secondsInMinute);
      return `${minutes}м назад`;
    } else if (timeDifference < secondsInDay) {
      const hours = Math.floor(timeDifference / secondsInHour);
      return `${hours}ч назад`;
    } else {
      const date = new Date(unixTime * 1000);
      const options = { day: "numeric", month: "long" };
      return date.toLocaleDateString("ru-RU", options);
    }
  }

  function handleClickOnText(e) {
    const text = e.target.innerText;
    const matches = linkifyInstance.match(text);

    if (matches) {
      matches.forEach((match) => {
        if (match.url) {
          e.preventDefault();
          console.log(match.url);
          setWarning({ state: true, link: match.url });
        }
      });
    }
  }

  const user = users.find((user) => user.id === userOpen);

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["chat"]}>
        <div className={styles["chat-users"]}>
          <div className={styles["inputBlock"]}>
            <input
              value={search}
              onChange={(e) => handleUpdateInput(e)}
              className={styles["inputBlock__input"]}
              placeholder="Search..."
            ></input>
          </div>
          <div className={styles["usersList"]}>
            {users
              .filter((user) =>
                user.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((user, index) => {
                return (
                  <div
                    onClick={() => handleUpdateUserOpen(user)}
                    className={styles["user"]}
                    key={`Юзер $${index}`}
                  >
                    <img
                      alt={`${user.name}'s avatar`}
                      src={`./assets/usersAvatars/${user.logo}`}
                      className={styles["user__avatar"]}
                    />
                    <h2 className={styles["user__name"]}>{user.name}</h2>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles["chatMessages"]}>
          <div
            className={
              userOpen === false
                ? styles["chat-dialog-empty"]
                : styles["chat-dialog"]
            }
            ref={chatHistoryRef}
          >
            <div className={styles["chat-dialog-top"]}>
              <h3 className={styles["chat-dialog-top__name"]}>
                {user ? user.name : "Nik_Name"}
              </h3>
            </div>
            <div className={styles["chat-dialog-history"]}>
              {user && user.messages
                ? user.messages.map((message) => {
                    return (
                      <div
                        className={
                          message.owner
                            ? styles["messageOwner"]
                            : styles["messageSender"]
                        }
                        key={`Message: ${message.id}`}
                      >
                        <h3
                          className={
                            message.owner
                              ? styles["message__textOwner"]
                              : styles["message__textSender"]
                          }
                          onClick={(e) => handleClickOnText(e)}
                        >
                          {message.text}
                        </h3>
                        <h3
                          className={
                            message.owner
                              ? styles["message__dataOwner"]
                              : styles["message__dataSender"]
                          }
                        >
                          {formatTime(message.data)}
                        </h3>
                      </div>
                    );
                  })
                : "User not found"}
            </div>
          </div>
          <div className={styles["messageSendBlock"]}>
            <input
              placeholder="Message..."
              className={styles["messageSendBlock__input"]}
            ></input>
            <button className={styles["messageSendBlock__button"]}>
              Отправить
            </button>
          </div>
        </div>
      </div>
      {toggleState.alwaysAsk && warning.state && (
        <Warning warning={warning} setWarning={setWarning} />
      )}
      ;{privacy && <Blur />};
    </div>
  );
}

export default Chat;
