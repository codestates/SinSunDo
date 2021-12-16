import React from "react";
import style from "./refrigeratorPage.module.css";

const RefrigeratorPage = () => {
  return (
    <>
      <button className={style.add}>추가</button>

      <div className={style.container}>
        <div className={style.refrigerator}>
          <i className="refrigerator_logo fas fa-apple-alt"></i>

          <span className={style.refrigerator_name}>냉장실</span>

          <div className={style.countContainer}>
            <span className={style.total}>
              전체
              <span className={style.total_num}>2</span>
            </span>
            <span className={style.danger}>
              위험
              <span className={style.danger_num}>3</span>
            </span>
          </div>
        </div>
        <div className={style.freezer}>
          <i className="freezer_logo fas fa-ice-cream"></i>

          <span className={style.freezer_name}>냉동실</span>

          <div className={style.countContainer}>
            <span className={style.total}>
              전체
              <span className={style.total_num}>2</span>
            </span>
            <span className={style.danger}>
              위험
              <span className={style.danger_num}>3</span>
            </span>
          </div>
        </div>
        <div className={style.roomTemperature}>
          <i className="roomTemperature_logo fas fa-thermometer-half"></i>

          <span className={style.roomTemperature_name}>실온보관</span>

          <div className={style.countContainer}>
            <span className={style.total}>
              전체
              <span className={style.total_num}>2</span>
            </span>
            <span className={style.danger}>
              위험
              <span className={style.danger_num}>3</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefrigeratorPage;
