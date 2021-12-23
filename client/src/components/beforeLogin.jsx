import React from "react";
import style from "./beforeLogin.module.css";

const BeforeLogin = () => {
  return (
    <div className={style.beforeContainer}>
      <div className={style.beforeBox}>
        <p className={style.beforeText}>
          로그인 후 사용 가능한 페이지입니다 :D
        </p>
      </div>
    </div>
  );
};

export default BeforeLogin;
