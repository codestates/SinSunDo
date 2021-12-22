import React, { useState, useCallback } from "react";
// import { useHistory } from 'react-router-dom';
import style from "./membershipPage.module.css";
import axios from "axios";
require("dotenv").config();

const MembershipPage = ({ handlemembership }) => {
  const [signupInfo, setSignUpInfo] = useState({
    email: '',
    nickname: '',
    password: '',
    repassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  // const history = useHistory();
  const handleInputValue = (key) => (e) => {
    setSignUpInfo({ ...signupInfo, [key]: e.target.value });
  };

  const handleSignUp = () => {
    const { email, nickname, password, repassword } = signupInfo;
    if (!email || !nickname || !password || !repassword) {
      setErrorMessage(
        '이메일, username, 비밀번호 모두 다 입력해야합니다.'
      );
    } else if (password.length < 8 || repassword.length < 8) {
      setErrorMessage('비밀번호는 8글자 이상이어야합니다.');
    } else if (repassword !== password) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    } else {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/users/signup`,
          signupInfo,
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 201) {
            // history.push("/LogInPage");
            // console.log(res.data)
            // setTimeout(() => navigate('/'), 3000);
          }
        })
        .catch((err) => {
          console.log("회원가입에러", err.response.data)
          if (err.response.data.message === "이미 존재하는 이메일입니다.") {
            setErrorMessage("이미 사용하고 있는 이메일입니다");
          } else if (err.response.data.message === "이미 존재하는 닉네임입니다.") {
            setErrorMessage("이미 사용하고 있는 닉네임입니다");
          }
        });
    }
  };
  return (
    <div className={style.container}>
      <img className={style.logo} src="membership.png" alt="" />
      <input
        className={style.email}
        type="text"
        placeholder="   이메일"
        // value={email}
        required
        // onChange={onChangeEmail}
        onChange={handleInputValue('email')}
      />
      <input
        className={style.nickName}
        type="text"
        placeholder="   닉네임"
        // value={nickname}
        required
        // onChange={onChangeNickname}
        onChange={handleInputValue('nickname')}
      />
      <input
        className={style.password}
        type="password"
        placeholder="   비밀번호"
        // value={password}
        required
        // onChange={onChangePassword}
        onChange={handleInputValue('password')}
      />
      <input
        className={style.passwordConfirm}
        type="password"
        placeholder="   비밀번호 확인"
        // value={passwordcheck}
        required
        // onChange={onChangePasswordCheck}
        onChange={handleInputValue('repassword')}
      />
      <button
        className={style.membership}
        // onClick={() => handleClick()}
        onClick={handleSignUp}
      >
        회원 가입
      </button>
      <span className={style.message}>{errorMessage}</span>
      <span className={style.login_text}>이미 sinsundo의 회원이신가요 ?</span>
      <button className={style.login_bnt} onClick={handlemembership}>
        로그인
      </button>
    </div>
  );
};

export default MembershipPage;