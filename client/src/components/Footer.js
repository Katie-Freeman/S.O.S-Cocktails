import React from "react";
import styles from "./footer.module.css";

const Footer = () => (
 
    <footer className={styles.footer}>
      <a href="https://github.com/Katie-Freeman/S.O.S-Cocktails.git">
        <img width={50}src={require("../images/icons8-github-128.png")} alt="github logo" />
      </a>
    </footer>
);

export default Footer;
