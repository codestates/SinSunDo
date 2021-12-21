import React, { useState } from "react";
import style from "./toggle.module.css";

export const Toggle = () => {
  const [isOn, setisOn] = useState(false);

  const toggleHandler = () => {
    setisOn(!isOn);
    // axios.post(`${process.env.REACT_APP_SERVER_URL}/mypageTogle`, {
    //           headers: {
    //             Authorization: `Bearer ${accessToken}`},
    //           withCredentials: true})
    //           .then(toggle => {
    //               setisOn(toggle)
    //           })
  };

  return (
    <>
      <div className={style.toggle_text}>
        {isOn ? <span>on</span> : <span>off</span>}
      </div>
      <div className={style.toggleContainer}>
        {isOn ? (
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
        {isOn ? (
          <div onClick={toggleHandler} className={style.toggleBox__checked} />
        ) : (
          <div onClick={toggleHandler} className={style.toggleBox__unchecked} />
        )}
      </div>
    </>
  );
};

export default Toggle;
