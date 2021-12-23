import React, { useEffect, useState } from "react";
import style from "./refrigeratorPage.module.css";
import Product from "../components/product";
import ProductUpload from "./productUpload";
import axios from "axios";
require("dotenv").config();

const RefrigeratorPage = ({ isLogin, accessToken }) => {
  const [productOnOff, setProductOnOff] = useState(false);
  const [product, setProduct] = useState([
    {
      id: "",
      storage: "",
      category_name: "",
      day_ago: "",
      food_expiration: "",
      food_name: "",
      food_quantity: "",
    },
  ]);

  const productList = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/product`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((data) => {
        const foodInfo = data.data.data.foodInfo;
        setProduct(foodInfo);
      });
  };

  // get 요청 자동으로 가져 오기
  useEffect(() => {
    productList();
  }, [productOnOff]);

  const refrigerate = product.filter((item) => item.storage === "refrigerate");
  const freeze = product.filter((item) => item.storage === "freeze");
  const roomTemperature = product.filter(
    (item) => item.storage === "roomTemperature"
  );

  const refrigerateDanger = refrigerate.filter((el) => el.day_ago <= 5);
  const freezeDanger = freeze.filter((el) => el.day_ago <= 5);
  const roomTemperatureDanger = roomTemperature.filter((el) => el.day_ago <= 5);

  const handleDelete = (id) => {
    console.log(id);
    const filter = product.filter((el) => el.id !== id);

    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/product/delete`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { id },
        withCredentials: true,
      })
      .then((res) => {
        console.log("res", res);
        if (res.status === 201) {
          setProduct(filter);
        }
      })
      .catch((err) => {});
  };

  const handleAdd = () => {
    productOnOff === false ? setProductOnOff(true) : setProductOnOff(false);
  };

  return (
    <>
      {productOnOff === true ? (
        <ProductUpload
          handleAdd={handleAdd}
          productOnOff={productOnOff}
          setProductOnOff={setProductOnOff}
          accessToken={accessToken}
          product={product}
          setProduct={setProduct}
        />
      ) : null}

      <button className={style.add} onClick={handleAdd}>
        추가
      </button>
      <div className={style.container}>
        <div className={style.refrigerator}>
          <i className="refrigerator_logo fas fa-apple-alt"></i>

          <span className={style.refrigerator_name}>냉장실</span>

          <div className={style.countContainer}>
            <span className={style.total}>
              전체
              <span className={style.total_num}>{refrigerate.length}</span>
            </span>
            <span className={style.danger}>
              위험
              <span className={style.danger_num}>
                {refrigerateDanger.length}
              </span>
            </span>
          </div>

          {refrigerate.length !== 0 ? (
            product
              .filter((item) => item.storage === "refrigerate")
              .map((el) => (
                <Product product={el} key={el.id} handleDelete={handleDelete} />
              ))
          ) : (
            <div className={style.empty}>
              <div className={style.empty_sentence}>냉장실이 비어 있습니다</div>
            </div>
          )}
        </div>
        <div className={style.freezer}>
          <i className="freezer_logo fas fa-ice-cream"></i>
          <span className={style.freezer_name}>냉동실</span>
          <div className={style.countContainer}>
            <span className={style.total}>
              전체
              <span className={style.total_num}>{freeze.length}</span>
            </span>
            <span className={style.danger}>
              위험
              <span className={style.danger_num}>{freezeDanger.length}</span>
            </span>
          </div>

          {freeze.length !== 0 ? (
            product
              .filter((item) => item.storage === "freeze")
              .map((el) => (
                <Product product={el} key={el.id} handleDelete={handleDelete} />
              ))
          ) : (
            <div className={style.empty}>
              <div className={style.empty_sentence}>냉동실이 비어 있습니다</div>
            </div>
          )}
        </div>
        <div className={style.roomTemperature}>
          <i className="roomTemperature_logo fas fa-thermometer-half"></i>

          <span className={style.roomTemperature_name}>실온보관</span>

          <div className={style.countContainer}>
            <span className={style.total}>
              전체
              <span className={style.total_num}>{roomTemperature.length}</span>
            </span>
            <span className={style.danger}>
              위험
              <span className={style.danger_num}>
                {roomTemperatureDanger.length}
              </span>
            </span>
          </div>

          {roomTemperature.length !== 0 ? (
            product
              .filter((item) => item.storage === "roomTemperature")
              .map((el) => (
                <Product product={el} key={el.id} handleDelete={handleDelete} />
              ))
          ) : (
            <div className={style.empty}>
              <div className={style.empty_sentence}>
                실온보관이 비어 있습니다
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RefrigeratorPage;
