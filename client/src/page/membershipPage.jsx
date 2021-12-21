import React, { useState, useCallback } from "react";
import style from "./membershipPage.module.css";
import axios from "axios";

const MembershipPage = ({ handlemembership, history }) => {
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordCheck] = useState("");
  const [message, setMessage] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangenickName = (e) => {
    setNickName(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
    setMessage(e.target.value !== password);
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

  const checkPassword = (upw) => {
    if (!/^[a-zA-Z0-9]{8,20}$/.test(upw)) {
      setMessage(
        "비밀번호는 숫자와 영문자 조합으로 8~20자리를 사용해야 합니다."
      );
      return false;
    }
    let chk_num = upw.search(/[0-9]/g);
    let chk_eng = upw.search(/[a-z]/gi);
    if (chk_num < 0 || chk_eng < 0) {
      setMessage("비밀번호는 숫자와 영문자를 혼용하여야 합니다.");
      return false;
    } else return true;
  };

  const handleSignUp = () => {
    if (password === passwordcheck) {
      const userinfo = { email, nickName, password };
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/users/signup`, userinfo, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.message === "same email") {
            setMessage("중복된 이메일이 있습니다.");
          } else if (res.message === "same nickName") {
            setMessage("중복된 닉네임이 있습니다.");
          } else if (res.message === "success") {
            setMessage('');
            alert("회원가입이 완료되었습니다.");
            history.push('/LogInPage');
          } else {
            setMessage("잘못된 요청입니다.");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleClick = useCallback(() => {
    if (email === "") {
      setMessage("이메일을 입력해주세요.");
      return;
    } else if (!checkEmail(email)) {
      setMessage("올바른 메일 양식으로 입력해주세요.");
      return;
    }
    if (nickName === "") {
      setMessage("닉네임을 입력해주세요.");
      return;
    }
    if (password === "") {
      setMessage("비밀번호를 입력해주세요.");
    } else if (checkPassword(password)) {
      if (passwordcheck === "") {
        setMessage("비밀번호가 일치하지 않습니다.");
        return;
      } else if (password === passwordcheck) {
        setMessage("");
        setNickName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage("비밀번호를 정확하게 입력해주세요.");
        setPasswordCheck("");
        return;
      }
    }
    if (checkPassword(password)) {
      handleSignUp(email, password);
      return;
    }
  }, [email, nickName, password, passwordcheck, message]);

  return (
    <div className={style.container}>
      <img className={style.logo} src="membership.png" alt="" />
      <input
        className={style.email}
        type="text"
        placeholder="   이메일"
        value={email}
        required
        onChange={onChangeEmail}
      />
      <input
        className={style.nickName}
        type="text"
        placeholder="   닉네임"
        value={nickName}
        required
        onChange={onChangenickName}
      />
      <input
        className={style.password}
        type="password"
        placeholder="   비밀번호"
        value={password}
        required
        onChange={onChangePassword}
      />
      <input
        className={style.passwordConfirm}
        type="password"
        placeholder="   비밀번호 확인"
        value={passwordcheck}
        required
        onChange={onChangePasswordCheck}
      />
      <button className={style.membership} onClick={() => handleClick()}>
        회원 가입
      </button>
      <span className={style.message}>{message}</span>
      <span className={style.login_text}>이미 sinsundo의 회원이신가요 ?</span>
      <button className={style.login_bnt} onClick={handlemembership}>
        로그인
      </button>
    </div>
  );
};

export default MembershipPage;
