import React, { useState } from "react";
import style from "./productUpload.module.css";
import axios from "axios";
require("dotenv").config();

const ProductUpload = ({
  handleAdd,
  productOnOff,
  setProductOnOff,
  accessToken,
<<<<<<< HEAD
=======
  product,
  setProduct,
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
}) => {
  const [storage, setStorage] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [food_name, setFood_name] = useState("");
  const [food_quantity, setFood_quantity] = useState(1);
  const [food_expiration, setFood_expiration] = useState("");
  const [message, setMessage] = useState("");

  // food_name : req.body.food_name, // 음식이름
  // food_quantity : req.body.food_quantity, // 음식 수량
  // category_name_id : req.body.category_name_id, // 카테고리
  // storage : req.body.storage, // 냉동,냉장,실온
  // food_expiration : req.body.food_expiration, // 유통기한
  // day_ago : null

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
    // setQuantity(Number(quantity) + 1);
  };

  const handleMinus = () => {
    // quantity < 0 ? 0 : setQuantity(quantity - 1);
    if (food_quantity < 1) {
      console.log("0보다 작다");
      setFood_quantity(Number(0));
      return;
    }
    handleChangeQuantity(Number(food_quantity) - 1);
  };

  const handleChangeQuantity = (quantity) => {
    // console.log(auantity.target.value);
<<<<<<< HEAD
    console.log("auantity", quantity);
=======
    // console.log("auantity", quantity);
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
    setFood_quantity(quantity);
  };

  const handleExpirationDate = (expirationDate) => {
<<<<<<< HEAD
    console.log("유통기한", expirationDate.target.value);
=======
    // console.log("유통기한", expirationDate.target.value);
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
    setFood_expiration(expirationDate.target.value);
  };

  const handleProductData = () => {
<<<<<<< HEAD
    console.log("클릭");
=======
    // console.log("클릭");
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
    const productData = {
      storage,
      category_name,
      food_name,
      food_quantity,
      food_expiration,
    };
<<<<<<< HEAD
    console.log(productData);
    console.log(process.env.REACT_APP_SERVER_URL);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/product/add`, productData, {
=======
    // console.log(productData);
    // console.log(process.env.REACT_APP_SERVER_URL);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/product`, productData, {
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((data) => {
<<<<<<< HEAD
        console.log("data", data);
        if (data.status === 201) {
=======
        // console.log("data", data);
        if (data.status === 201) {
          // setProduct([...product, { productData }]);
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
          setStorage("");
          setCategory_name("");
          setFood_name("");
          setFood_quantity("");
          setFood_expiration("");
<<<<<<< HEAD
        }
        console.log(data);
=======
          handleAdd();
        }
        // console.log(data);
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
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
<<<<<<< HEAD
        <button
          className={style.registration}
          onClick={handleProductData}
          // onClick={handleAdd}
        >
=======
        <button className={style.registration} onClick={handleProductData}>
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
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