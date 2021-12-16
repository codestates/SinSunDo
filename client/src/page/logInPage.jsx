import React from "react";
import style from "./logInPage.module.css";

const LogInPage = () => {
  return (
    <div className={style.container}>
      <img className={style.logo} src="logo.png" />
      <input className={style.email} type="text" placeholder="이메일" />
      <input
        className={style.password}
        type="password"
        placeholder="비밀번호"
      />
      <button className={style.login}>로그인</button>
      <div className={style.membership}>
        아직 sinsundo의 회원이 아니신가요 ?
      </div>
      <button className={style.membership_btn}>회원가입</button>
    </div>
  );
};

export default LogInPage;
