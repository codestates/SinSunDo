import React from "react";
import style from "./membershipPage.module.css";

const MembershipPage = () => {
  return (
    <div className={style.container}>
      <img className={style.logo} src="membership.png" />
      <input className={style.email} type="text" placeholder="이메일" />
      <input className={style.nickName} type="text" placeholder="닉네임" />
      <input
        className={style.password}
        type="password"
        placeholder="비밀번호"
      />
      <input
        className={style.passwordConfirm}
        type="password"
        placeholder="비밀번호확인"
      />
      <button className={style.membership}>회원 가입</button>
    </div>
  );
};

export default MembershipPage;
