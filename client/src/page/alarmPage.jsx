import React, { useEffect, useState } from "react";
import style from "./alarmPage.module.css";
import AlramList from "../components/alramList";
import BeforeLogin from "../components/beforeLogin";
import axios from "axios";
require("dotenv").config();

const AlarmPage = ({
  alram,
  setAlram,
  product,
  setProduct,
  isLogin,
  accessToken,
}) => {
  // const renderAlram = product.filter(
  //   (el) => alram.map((alram) => alram.food_id).indexOf(el.id) > -1
  // );
  // console.log("renderAlram", renderAlram);

  const seven_day_ago = product.filter((el) => el.day_ago === 7);
  console.log("seven_day_ago", seven_day_ago);
  const five_day_ago = product.filter((el) => el.day_ago === 5);
  console.log("five_day_ago", five_day_ago);
  const one_day_ago = product.filter((el) => el.day_ago === 1);
  console.log("one_day_ago", one_day_ago);

  const [renderAlrams, setRenderAlrams] = useState([]);
  // const [renderAlrams, setRenderAlrams] = useState({
  //   id,
  //   storage,
  //   category_name,
  //   food_name,
  //   food_quantity,
  //   food_expiration,
  //   day_ago,
  // });

  //알람 추가----------------(사름)
  // const AddAlarm = () => {
  //   axios
  //     .post(`${process.env.REACT_APP_SERVER_URL}/product/alram`, {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //       withCredentials: true,
  //     })
  //     .then((data) => {
  //       setRenderAlrams({
  //         id: data.data.foodalram.id,
  //         category_name: data.data.foodalram.category_name,
  //         food_name: data.data.foodalram.food_name,
  //         food_quantity: data.data.foodalram.food_quantity,
  //         food_expiration: data.data.foodalram.food_expiration,
  //         day_ago: data.data.foodalram.day_ago,
  //       });
  //     });
  // };

  //별도 서버 지우기 요청 없이 클라에서만 지우는 것으로 진행....?
  // ToDo get 요청으로 alram list 가져오기
  // const alramList = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_SERVER_URL}/product/alram/`, {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //       withCredentials: true,
  //     })
  //     .then((data) => {
  //       console.log("data", data);
  //       // setRenderAlrams({
  //       //   id: data.data.foodalram.id,
  //       //   storage: data.data.foodalram.storage,
  //       //   category_name: data.data.foodalram.category_name,
  //       //   food_name: data.data.foodalram.food_name,
  //       //   food_quantity: data.data.foodalram.food_quantity,
  //       //   food_expiration: data.data.foodalram.food_expiration,
  //       //   day_ago: data.data.foodalram.day_ago,
  //       // });
  //     })
  //     .catch((err) => console.log(err));
  // };

  // ToDo alram list rendering
  // useEffect(() => {
  //   alramList();
  // }, []);

  // const handleDelete = (id) => {
  //   console.log(id);
  //   const filter = renderAlrams.filter((el) => el.id !== id);
  //   setRenderAlrams(filter);
  //   //ToDo axios 와 엔드포인트 renerAlram/delete를 사용하여 삭제를 구현
  //   // axios.delete(`${process.env.REACT_APP_SERVER_URL}/alram/delete`,{ headers: {
  //   //         Authorization: `Bearer ${accessToken}`,
  //   //       }, data: {filter}, withCredentials: true })
  // };

  // console.log(renderAlram);
  return (
    <div>
      {isLogin ? (
        <div className={style.container}>
          {seven_day_ago.map((el) => (
            <div className={style.box}>
              <div className={style.innerBox}>
                <AlramList
                  key={el.id}
                  // handleDelete={handleDelete}
                  id={el.id}
                  category={el.category_name}
                  name={el.food_name}
                  quantity={el.food_quantity}
                  dayAgo={el.day_ago}
                />
              </div>
            </div>
          ))}
          {five_day_ago.map((el) => (
            <div className={style.box}>
              <div className={style.innerBox}>
                <AlramList
                  key={el.id}
                  // handleDelete={handleDelete}
                  id={el.id}
                  category={el.category_name}
                  name={el.food_name}
                  quantity={el.food_quantity}
                  dayAgo={el.day_ago}
                />
              </div>
            </div>
          ))}

          {one_day_ago.map((el) => (
            <div className={style.box}>
              <div className={style.innerBox}>
                <AlramList
                  key={el.id}
                  // handleDelete={handleDelete}
                  id={el.id}
                  category={el.category_name}
                  name={el.food_name}
                  quantity={el.food_quantity}
                  dayAgo={el.day_ago}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <BeforeLogin />
      )}
    </div>
  );
};

export default AlarmPage;
