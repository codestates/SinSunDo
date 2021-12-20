import React, { useEffect, useState } from "react";
import style from "./refrigeratorPage.module.css";
import Product from "../components/product";
import { dummy } from "../dummy/dummy";
import ProductUpload from "./productUpload";
import axios from "axios";

const RefrigeratorPage = () => {
  const [productOnOff, setProductOnOff] = useState(false);
  const [product, setProduct] = useState(dummy.product);
  console.log(dummy.product);
  // const [product, setProduct] = useState({id, storage, category_name, day_ago, food_expiration, food_name, food_quantity});

  // get 요청으로 상품 list 가져오기
  // const productList = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_SERVER_URL}/product/add`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       withCredentials: true,
  //     })
  //     .then((data) => {
  //       setProduct({
  //         id: data.id,
  //         storage: data.storage,
  //         category_name: data.category_name,
  //         day_ago: data.day_ago,
  //         food_expiration: data.food_expiration,
  //         food_name: data.food_name,
  //         food_quantity: data.food_quantity,
  //       });
  //     });
  // };

  // get 요청 자동으로 가져 오기
  // useEffect(() => {
  //   productList();
  // }, []);

  const refrigerate = product.filter((item) => item.storage === "냉장실");
  const freeze = product.filter((item) => item.storage === "냉동실");
  const roomTemperature = product.filter((item) => item.storage === "실온");

  const handleDelete = (id) => {
    const filter = product.filter((el) => el.id !== id);
    setProduct(filter);
    //ToDo axios 와 엔드포인트 product/delete를 사용하여 삭제를 구현 해야하나 .. ?
    // axios.delete(${process.env.REACT_APP_SERVER_URL}/product/Delete`, { withCredentials: true })
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
              <span className={style.danger_num}>3</span>
            </span>
          </div>

          {refrigerate.length !== 0 ? (
            product
              .filter((item) => item.storage === "냉장실")
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
              <span className={style.danger_num}>3</span>
            </span>
          </div>
          {/* 삼항연산자필요 */}
          {freeze.length !== 0 ? (
            product
              .filter((item) => item.storage === "냉동실")
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
              <span className={style.danger_num}>3</span>
            </span>
          </div>
          {/* 삼항연산자필요 */}
          {roomTemperature.length !== 0 ? (
            product
              .filter((item) => item.storage === "실온")
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
