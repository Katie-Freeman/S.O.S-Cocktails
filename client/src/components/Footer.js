import React from "react";
import styles from "./footer.module.css";

const Footer = () => (
  <div className={styles.footerContainer}>
    <footer className={styles.footer}>
      <a href="https://github.com/Katie-Freeman/S.O.S-Cocktails.git">
        <img src={require("../images/github.png")} alt="github logo" />
      </a>
    </footer>
  </div>
);

export default Footer;
