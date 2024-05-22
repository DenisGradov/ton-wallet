/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./password.module.scss";
import Blur from "../../Blur/Blur";
function Password({ privacy }) {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    passChangeError: "", //функция handleUpdatePassword проверяет данные, после чего возвращается true, если все гуд, и false, если есть проблемы. Описание ошибки засовывается в это значение (в password.passChangeError)
  });
  function handleUpdatePassword(e, valueKey) {
    setPassword((prevPassword) => ({
      ...prevPassword,
      [valueKey]: e.target.value,
    }));
  }
  function isEnglishAlphanumeric(text) {
    const regex = /^[A-Za-z0-9!@#\$%\^\&*\)\(+=._-]+$/;
    return regex.test(text);
  }

  function handleSetNewPassword() {
    const errorOptions = [
      {
        condition: !password.currentPassword,
        errorText: "Вы не ввели актуальный пароль",
      },
      {
        condition: !password.newPassword,
        errorText: "Вы не ввели новый пароль",
      },
      {
        condition: !password.confirmNewPassword,
        errorText: "Вы не подтвердили новый пароль",
      },
      {
        condition: password.newPassword !== password.confirmNewPassword,
        errorText: "Новый пароль не совпадает с повторным новым паролем",
      },
      {
        condition: password.newPassword.length < 10,
        errorText: "Новый пароль должен содержать 10+ символов",
      },
      {
        condition: !isEnglishAlphanumeric(password.newPassword),
        errorText:
          "Новый пароль может содержать только английские буквы, символы и цифры",
      },
    ];

    for (let i = 0; i < errorOptions.length; i++) {
      if (errorOptions[i].condition) {
        setPassword((prevPassword) => ({
          ...prevPassword,
          passChangeError: errorOptions[i].errorText,
        }));
        console.log(errorOptions[i].errorText);
        return false;
      }
    }

    console.log("good");
    return true;
  }

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["password"]}>
        <div className={styles["password-content"]}>
          <h1 className={styles["password-content__title"]}>Password</h1>
          <h2 className={styles["password-content__bigText"]}>
            Change Your Password
          </h2>
          <h2 className={styles["password-content__description"]}>
            Change password used to unlock Status on this device & sign
            transactions.
          </h2>
          <h3 className={styles["password-content__text"]}>Current Password</h3>
          <input
            onChange={(e) => {
              handleUpdatePassword(e, "currentPassword");
            }}
            value={password.currentPassword}
            placeholder="Enter current password"
            className={styles["password-content__input"]}
          ></input>
          <h3 className={styles["password-content__text"]}>New Password</h3>
          <input
            onChange={(e) => {
              handleUpdatePassword(e, "newPassword");
            }}
            value={password.newPassword}
            placeholder="Enter new password"
            className={styles["password-content__input"]}
          ></input>
          <h3 className={styles["password-content__description"]}>
            Minimum 10 characters. To strengthen your password use Lower case,
            Upper case, Numbers, Symbols.
          </h3>
          <h3 className={styles["password-content__text"]}>
            Confirm New Password
          </h3>
          <input
            onChange={(e) => {
              handleUpdatePassword(e, "confirmNewPassword");
            }}
            value={password.confirmNewPassword}
            placeholder="Enter new password"
            className={styles["password-content__input"]}
          ></input>
          <button
            className={styles["password-content__button"]}
            onClick={handleSetNewPassword}
          >
            Change
          </button>
        </div>
      </div>

      {privacy && <Blur />}
    </div>
  );
}

export default Password;
