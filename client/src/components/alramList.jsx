import React from "react";
import style from "./alramList.module.css";

const AlramList = ({ category, name, quantity, dayAgo, handleDelete, id }) => {
  // console.log(renderAlram);
  return (
    <div>
      <span className={style.modal_X} onClick={() => handleDelete(id)}>
        &times;
      </span>
      <img className={style.icon} src={"/7day.png"} alt="" />
      <p className={style.alarmText}>
        {category}의 {name}, 수량 {quantity} 개의 유통기한이 {dayAgo}일
        남았습니다.
      </p>
    </div>
  );
};

export default AlramList;
