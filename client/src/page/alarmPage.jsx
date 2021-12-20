import React from "react";
import style from "./alarmPage.module.css";

const AlarmPage = (props) => {
  return (
    <div className={style.container}>
      <div className={style.box}>
        <div className={style.innerBox}>
          <img className={style.icon} src={"/7day.png"} alt="" />
          <p className={style.alarmText}>
            우유의 서울우유 500ml가 유통기한 7일 남았습니다.
          </p>
        </div>
        <p className={style.dateText}>2021-12-1</p>
      </div>
      <div className={style.box}>
        <div className={style.innerBox}>
          <img className={style.icon} src={"/5day.png"} alt="" />
          <p className={style.alarmText}>
            우유의 서울우유 500ml가 유통기한 5일 남았습니다.
          </p>
        </div>
        <p className={style.dateText}>2021-12-3</p>
      </div>
      <div className={style.box}>
        <div className={style.innerBox}>
          <img className={style.icon} src={"/d-day.png"} alt="" />
          <p className={style.alarmText}>
            우유의 서울우유 500ml가 유통기한 1일 남았습니다.
          </p>
        </div>
        <p className={style.dateText}>2021-12-7</p>
      </div>
    </div>
  );
};

export default AlarmPage;
