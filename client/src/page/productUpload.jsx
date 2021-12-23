import React, { useState } from "react";
import style from "./productUpload.module.css";
import axios from "axios";
require("dotenv").config();

const ProductUpload = ({
  handleAdd,
  productOnOff,
  setProductOnOff,
  accessToken,
  product,
  setProduct,
}) => {
  const [storage, setStorage] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [food_name, setFood_name] = useState("");
  const [food_quantity, setFood_quantity] = useState(1);
  const [food_expiration, setFood_expiration] = useState("");
  const [message, setMessage] = useState("");

  const handleChangeStorage = (storage) => {
    setStorage(storage.target.value);
  };

  const handleChangeCategory = (category) => {
    setCategory_name(category.target.value);
  };

  const handleChangeFoodName = (foodName) => {
    setFood_name(foodName.target.value);
  };

  const handlePlus = () => {
    handleChangeQuantity(Number(food_quantity) + 1);
  };

  const handleMinus = () => {
    if (food_quantity < 1) {
      console.log("0보다 작다");
      setFood_quantity(Number(0));
      return;
    }
    handleChangeQuantity(Number(food_quantity) - 1);
  };

  const handleChangeQuantity = (quantity) => {
    setFood_quantity(quantity);
  };

  const handleExpirationDate = (expirationDate) => {
    setFood_expiration(expirationDate.target.value);
  };

  const handleProductData = () => {
    const productData = {
      storage,
      category_name,
      food_name,
      food_quantity,
      food_expiration,
    };

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/product`, productData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((data) => {
        // console.log("data", data);
        if (data.status === 201) {
          setStorage("");
          setCategory_name("");
          setFood_name("");
          setFood_quantity("");
          setFood_expiration("");
          handleAdd();
        }
        // console.log(data);
        // ToDo 등록 완료 메세지
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log(err);
          setMessage("요청이 잘못되었습니다.");
        }
      });
  };

  const handleModal = () => {
    setProductOnOff(false);
  };

  return (
    <div className={style.main}>
      <div className={style.container}>
        <img className={style.logo} src="productupload.png" alt="" />
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
            value={food_quantity}
            onChange={(e) => handleChangeQuantity(e.target.value)}
          />

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
        <button className={style.registration} onClick={handleProductData}>
          등록
        </button>
        <button className={style.close} onClick={handleAdd}>
          취소
        </button>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default ProductUpload;