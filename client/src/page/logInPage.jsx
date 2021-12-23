import React, { useCallback, useState } from "react";
import style from "./logInPage.module.css";
import axios from "axios";
import MembershipPage from "./membershipPage";
// import { useHistory } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom'

const LogInPage = ({ issueTokens, handleResponseSuccess }) => {
  const history = useHistory();
  // let location = useLocation();
  console.log(history)
  // console.log(location)

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

  const handleLogin = () => {
    const userinfo = { email, password };
    if (!email || !password) {
      setMessage('이메일, 비밀번호 모두 다 입력해야합니다.');
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/users/signin`,
          userinfo, {
          withCredentials: true,
        })
        .then((res) => {
          setEmail("");
          setPassword("");
          handleResponseSuccess(res.data.data.accessToken);
          // history.push("/");
        })
        .catch((err) => {
          if (err.response.data.message === '로그인 정보가 일치하지 않습니다.') {
            setMessage("로그인 정보가 일치하지 않습니다");
          }
        })
    }
  }

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
  const hanleHistory = () => {
    history.push("/")
  }

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
          <button className={style.kakao}
            // onClick={(() => { routerStore.history.push("/") })}
            // onClick={(() => { history.push("/") })}
            onClick={hanleHistory}
          >카카오톡 로그인</button>
          <button
            className={style.google}
          // onClick={googleAccessToken}
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
