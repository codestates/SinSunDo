import React from "react";
import style from "./productUpload.module.css";

const ProductUpload = ({ handleAdd }) => {
  return (
    <div className={style.container}>
      <img className={style.logo} src="productupload.png" alt="" />
      <div className={style.imageUpLoad_text}>
        제품의 사진을 업로드 할 수 있습니다
      </div>
      <input className={style.imageUpLoad} type="file" />

      <select name="storageSelect" id={style.storageSelect}>
        <option value="">보관장소</option>
        <option value="refrigerate">냉장</option>
        <option value="freeze">냉동</option>
        <option value="roomTemperature">실온</option>
      </select>

      <select name="category" id={style.category}>
        <option value="">카테고리</option>
        <option value="">과일</option>
        <option value="">완제품/요리</option>
        <option value="">유제품</option>
        <option value="">음료</option>
        <option value="">인스턴스</option>
        <option value="">채소</option>
      </select>

      <input className={style.productName} type="text" placeholder="상품이름" />

      {/* <input className={style.quatity} type="text" placeholder="수량" /> */}
      <span className={style.quatity_container}>
        <button className={style.quatity_plus_btn}>
          <i class="quatity_plus fas fa-plus-square"></i>
        </button>
        <div className={style.quatity}>1</div>
        <button className={style.quatity_minus_btn}>
          <i class="quatity_minus fas fa-minus-square"></i>
        </button>
      </span>

      <span className={style.expirationDate}>
        유통기한
        <input className={style.date} type="date" />
      </span>
      <button className={style.registration} onClick={handleAdd}>
        등록
      </button>
      <button className={style.close} onClick={handleAdd}>
        취소
      </button>
    </div>
  );
};

export default ProductUpload;
