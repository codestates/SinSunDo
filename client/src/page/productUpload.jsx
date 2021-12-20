import React, { useState } from "react";
import style from "./productUpload.module.css";
import axios from "axios";

const ProductUpload = ({ handleAdd }) => {
  const [storage, setStorage] = useState("");
  const [category, setCategory] = useState("");
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [expirationDate, setExpirationDate] = useState("");

  const handleChangeStorage = (storage) => {
    setStorage(storage.target.value);
  };

  const handleChangeCategory = (category) => {
    setCategory(category.target.value);
  };

  const handleChangeFoodName = (foodName) => {
    setFoodName(foodName.target.value);
  };

  const handlePlus = () => {
    handleChangeQuantity(Number(quantity) + 1);
    // setQuantity(Number(quantity) + 1);
  };

  const handleMinus = () => {
    // quantity < 0 ? 0 : setQuantity(quantity - 1);
    if (quantity < 1) {
      console.log("0보다 작다");
      setQuantity(Number(0));
      return;
    }
    handleChangeQuantity(Number(quantity) - 1);
  };

  const handleChangeQuantity = (quantity) => {
    // console.log(auantity.target.value);
    console.log("auantity", quantity);
    setQuantity(quantity);
  };

  const handleExpirationDate = (expirationDate) => {
    console.log("유통기한", expirationDate.target.value);
    setExpirationDate(expirationDate.target.value);
  };

  const handleProductData = () => {
    const productData = {
      storage,
      category,
      foodName,
      quantity,
      expirationDate,
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/product/add`, productData, {
        withCredentials: true,
      })
      .then((data) => {
        // ToDo 등록 완료 메세지
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={style.container}>
      <select
        name="storageSelect"
        id={style.storageSelect}
        onChange={handleChangeStorage}
      >
        <option value="">보관장소</option>
        <option value="refrigerate">냉장</option>
        <option value="freeze">냉동</option>
        <option value="roomTemperature">실온</option>
      </select>

      <select
        name="category"
        id={style.category}
        onChange={handleChangeCategory}
      >
        <option value="카테고리">카테고리</option>
        <option value="과일">과일</option>
        <option value="완제품/요리">완제품/요리</option>
        <option value="유제품">유제품</option>
        <option value="음료">음료</option>
        <option value="인스턴스">인스턴스</option>
        <option value="채소">채소</option>
      </select>

      <input
        className={style.productName}
        type="text"
        placeholder="상품이름"
        onChange={handleChangeFoodName}
      />

      <span className={style.quatity_container}>
        <button
          className={style.quatity_plus_btn}
          onClick={handlePlus}
          onChange={handleChangeQuantity}
        >
          <i className="quatity_plus fas fa-plus-square"></i>
        </button>
        <input
          className={style.quatity}
          type="number"
          // placeholder="수량"
          value={quantity}
          onChange={(e) => handleChangeQuantity(e.target.value)}
        />
        {/* <div className={style.quatity}>1</div> */}
        <button className={style.quatity_minus_btn} onClick={handleMinus}>
          <i className="quatity_minus fas fa-minus-square"></i>
        </button>
      </span>

      <span className={style.expirationDate}>
        유통기한
        <input
          className={style.date}
          type="date"
          onChange={handleExpirationDate}
        />
      </span>
      <button
        className={style.registration}
        onClick={handleProductData}
        onClick={handleAdd}
      >
        등록
      </button>
      <button className={style.close} onClick={handleAdd}>
        취소
      </button>
    </div>
  );
};

export default ProductUpload;
