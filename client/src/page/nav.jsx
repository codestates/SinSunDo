import React from "react";
import style from "./nav.module.css";
import { Link } from "react-router-dom";

const Nav = ({ isLogin, logoutHadler }) => {
  return (
    <div className={style.container}>
      <Link to="/">
        <img src={"/logo.png"} className={style.logo} alt="logo" />
      </Link>
      <ul className={style.list}>
        <li className={style.li}>
          <Link to="/RefrigeratorPage">
            <button className={style.button}>냉장고</button>
          </Link>
        </li>
        <li className={style.li}>
          <Link to="/AlarmPage">
            <button className={style.button}>알림</button>
          </Link>
        </li>
        <li className={style.li}>
          <Link to="/MyPage">
            <button className={style.button}>마이페이지</button>
          </Link>
        </li>
        <li className={style.li}>
          {isLogin !== true ? (
            <Link to="/LogInPage">
              <button className={style.button}>로그인</button>
            </Link>
          ) : (
            <Link to="/mainPage">
              <button
                className={style.button}
                onClick={logoutHadler}
              >로그아웃</button>
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Nav;
