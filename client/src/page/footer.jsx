import React from "react";
import style from "./footer.module.css";

const Footer = (props) => {
  return (
    <footer className={style.footer}>
      <div className={style.list}>
        <p>호스팅서비스: SINSUNDO</p>
        <p>COPYRIGHT © TENBYTEN ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export default Footer;
