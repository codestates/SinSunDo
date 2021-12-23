import React, { useState } from "react";
import style from "./toggle.module.css";
import axios from "axios";

export const Toggle = ( { accessToken, userInfo } ) => {
  const [isOn, setisOn] = useState(true);
  const [message, setMessage] = useState(false);
  const [accessTokenData, setAccessTokenData] = useState(null)

  const toggleHandler = () => {
    setAccessTokenData(accessToken)
    // console.log(accessToken)
    // setisOn(!isOn);
    // console.log(isOn)
    axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/mypage/mypageTogle`, userInfo, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },withCredentials: true,
            })
              .then((data) => {
                if(data) {
                  console.log(data)
                  setisOn(!isOn)
                  console.log(isOn)
                }  
              })
              .catch((err) => {
                if (err.response.data.message === '유효하지 않은 토큰입니다.') {
                  setMessage("로그인 상태가 아닙니다.");
                }
              })
  };

  return (
    <>
      <div className={style.toggle_text}>
        {!isOn ? <span>on</span> : <span>off</span>}
      </div>
      <div className={style.toggleContainer}>
        {!isOn ? (
          <div
            onClick={toggleHandler}
            className={style.toggleCircle__checked}
          />
        ) : (
          <div
            onClick={toggleHandler}
            className={style.toggleCircle__unchecked}
          />
        )}
        {!isOn ? (
          <div onClick={toggleHandler} className={style.toggleBox__checked} />
        ) : (
          <div onClick={toggleHandler} className={style.toggleBox__unchecked} />
        )}
      </div>
    </>
  );
};

export default Toggle;
