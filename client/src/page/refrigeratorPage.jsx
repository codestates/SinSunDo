import React, { useEffect, useState } from "react";
import style from "./refrigeratorPage.module.css";
import Product from "../components/product";
import { dummy } from "../dummy/dummy";
import ProductUpload from "./productUpload";
import axios from "axios";
require("dotenv").config();

const RefrigeratorPage = ({ isLogin, accessToken }) => {
  const [productOnOff, setProductOnOff] = useState(false);
  // const [product, setProduct] = useState(dummy.product);
  // console.log(dummy.product);
  const [product, setProduct] = useState([
    {
<<<<<<< HEAD
      // id: "",
=======
      id: "",
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
      storage: "",
      category_name: "",
      day_ago: "",
      food_expiration: "",
      food_name: "",
      food_quantity: "",
    },
  ]);
<<<<<<< HEAD
  console.log("accessToken", accessToken);
  // get 요청으로 상품 list 가져오기
  const productList = (accessToken) => {
    console.log("accessToken", accessToken);
=======

  const [productListUp, setProductListUp] = useState(product);
  // console.log("accessToken", accessToken);
  // get 요청으로 상품 list 가져오기
  const productList = () => {
    // console.log("accessToken", accessToken);
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/product`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      .then((data) => {
<<<<<<< HEAD
        console.log("data", data.data);
        setProduct({
          // id: data.data.foodInfo.id,
          storage: data.data.foodInfo.storage,
          category_name: data.data.foodInfo.category_name,
          day_ago: data.data.foodInfo.day_ago,
          food_expiration: data.data.foodInfo.food_expiration,
          food_name: data.data.foodInfo.food_name,
          food_quantity: data.data.foodInfo.food_quantity,
        });
      });
  };
=======
        const foodInfo = data.data.data.foodInfo;
        // console.log("data", data.data.data.foodInfo);
        // console.log("data", data.data.data);
        // console.log("foodInfo", foodInfo[foodInfo.length - 1]);
        const lastFoodInfo = foodInfo[foodInfo.length - 1];
        console.log("lastFoodInfo", lastFoodInfo.id);
        setProduct(foodInfo);
      });
  };

  // id: lastFoodInfo.id,
  // storage: lastFoodInfo.storage,
  // category_name: lastFoodInfo.category_name,
  // day_ago: lastFoodInfo.day_ago,
  // food_expiration: lastFoodInfo.food_expiration,
  // food_name: lastFoodInfo.food_name,
  // food_quantity: lastFoodInfo.food_quantity,
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9

  // get 요청 자동으로 가져 오기
  useEffect(() => {
    productList();
<<<<<<< HEAD
  }, []);

  console.log("product", product);
=======
  }, [productOnOff]);

  // useEffect(() => {
  //   productList();
  //   console.log("상태값이 업데이트될 때 실행됨");
  //   console.log(product);
  //   return () => {
  //     console.log("상태가 업데이트 되기 전 / 언마운트 되기 전 실행됨");
  //     console.log(product);
  //   };
  // }, []);
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9

  console.log("product", product);

  const refrigerate = product.filter((item) => item.storage === "refrigerate");
  console.log("refrigerate", refrigerate);
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
<<<<<<< HEAD
    setProduct(filter);
    //ToDo axios 와 엔드포인트 product/delete를 사용하여 삭제를 구현 해야하나 .. ?
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/product/Delete`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: { filter },
      withCredentials: true,
    });
=======

    //ToDo axios 와 엔드포인트 product/delete를 사용하여 삭제를 구현 해야하나 .. ?
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
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
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
<<<<<<< HEAD
=======
          product={product}
          setProduct={setProduct}
>>>>>>> 4142434bd577e19b717f33f9c5019387da6017a9
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
          {/* 삼항연산자필요 */}
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
          {/* 삼항연산자필요 */}
          {roomTemperature.length !== 0 ? (
            product
              .filter((item) => item.storage === "roomTemperature")
              .map((el) => <Product product={el} key={el.id} />)
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