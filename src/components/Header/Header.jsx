import React from "react";
import styles from "./Header.module.scss";

import Button from "../Button";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <a href="/">
          <h2>Otel</h2>
          <p>Rezervasyon Sistemi</p>
        </a>
      </div>

      <Button label="Yeni Rezervasyon Yap" variation="secondary" />
    </header>
  );
};

export default Header;
