import React, { useState } from "react";
import style from "./toggle.module.css";
import axios from "axios";

export const Toggle = ( { accessToken } ) => {
  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    console.log(accessToken)
    setisOn(!isOn);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/users/mypage`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },withCredentials: true,
            })
              .then(toggle => {
                  setisOn(toggle)
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
