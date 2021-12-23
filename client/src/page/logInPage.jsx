import React, { useCallback, useState } from "react";
import style from "./logInPage.module.css";
import axios from "axios";
import MembershipPage from "./membershipPage";

const LogInPage = ({ loginHandler, googleAccessToken, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [membershipOnOff, setMembershipOnOff] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const checkEmail = (email) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      return true;
    }
    return false;
  };

  // 태식님 코드인데 app.js에서 loginHandler로 구현하기 때문에
  // 없어도 될 것 같아서 주석처리합니다! 확인 부탁 드려요~
  const handleLogin = () => {
    const userinfo = { email, password };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/users/signin`,
        userinfo, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.message !== "ok") {
          setMessage("고객님의 정보가 일치하지 않습니다");
        } else {
          loginHandler();
          setEmail("");
          setPassword("");
          history.push('/')
        }
      });
  };

  const handleClick = useCallback(() => {
    if (email === "") {
      setMessage("이메일을 입력해주세요.");
    } else if (!checkEmail(email)) {
      setMessage("올바른 메일 양식으로 입력해주세요.");
      return;
    } else if (password === "") {
      setMessage("비밀번호를 입력해주세요.");
    } else {
      handleLogin();
      setMessage("");
      return;
    }
  }, [email, password, message]);

  const handlemembership = () => {
    membershipOnOff === false
      ? setMembershipOnOff(true)
      : setMembershipOnOff(false);
  };

  return (
    <>
      {membershipOnOff === true ? (
        <MembershipPage handlemembership={handlemembership} />
      ) : (
        <div className={style.container}>
          <img className={style.logo} src="logo.png" />
          <input
            className={style.email}
            type="text"
            placeholder="   이메일"
            onChange={onChangeEmail}
          />
          <input
            className={style.password}
            type="password"
            placeholder="   비밀번호"
            onChange={onChangePassword}
          />
          <button
            className={style.login}
            onClick={() => handleClick()}
          >
            로그인
          </button>
          <span className={style.message}>{message}</span>
          <button className={style.kakao}>카카오톡 로그인</button>
          <button
            className={style.google}
            onClick={googleAccessToken}
          >구글 로그인</button>
          <div className={style.membership}>
            아직 sinsundo의 회원이 아니신가요 ?
          </div>

          <button
            className={style.membership_btn}
            onClick={handlemembership}>
            회원가입
          </button>
        </div>
      )}
    </>
  );
};

export default LogInPage;
