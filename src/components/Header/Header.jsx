import styles from "./header.module.scss";

// eslint-disable-next-line react/prop-types
function Header({ privacy, setPrivacy }) {
  const walletInfo = {
    tonValue: "200.65",
    usdtValue: "1304.22",
    profit: +0.24,
  };
  function handleChangePrivacy() {
    setPrivacy(!privacy);
  }
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["header"]}>
        <a href="">
          <img
            className={styles["header__logo"]}
            alt="logo"
            src="./assets/logo.png"
          />
        </a>

        <div className={styles["header-walletInfo"]}>
          <img
            className={styles["walletInfo__logo"]}
            alt="walletLogo"
            src="./assets/wallets/logo.png"
          />
          <h3 className={styles["walletInfo__text"]}>Wallet</h3>
          <h3 className={styles["walletInfo__ton"]}>{walletInfo.tonValue} T</h3>
          <h3 className={styles["walletInfo__usdt"]}>
            {walletInfo.usdtValue} USDT
            <span
              className={`${
                walletInfo.profit > 0
                  ? styles["walletInfo__usdt-profit"]
                  : styles["walletInfo__usdt-lesion"]
              }`}
            >
              {walletInfo.profit > 0 && "+"}
              {walletInfo.profit}%
            </span>
          </h3>
        </div>
        <div className={styles["header-privacy"]} onClick={handleChangePrivacy}>
          <div className={styles["privacy__bg"]}></div>
          <img
            src={
              privacy ? "./assets/castleClosed.png" : "./assets/castleOpen.png"
            }
            className={
              privacy
                ? `${styles["privacy__castleClosed"]} ${styles["privacy__castle"]}`
                : `${styles["privacy__castleOpen"]} ${styles["privacy__castle"]}`
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
