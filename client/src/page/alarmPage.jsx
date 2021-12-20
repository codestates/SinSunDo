import React, { useState } from "react";
import style from "./alarmPage.module.css";
import AlramList from "../components/alramList";

const AlarmPage = ({ alram, setAlram, product, setProduct }) => {
  const renderAlram = product.filter(
    (el) => alram.map((alram) => alram.food_id).indexOf(el.id) > -1
  );
  const [renderAlrams, setRenderAlrams] = useState(renderAlram);

  const handleDelete = (id) => {
    console.log(id);
    const filter = renderAlrams.filter((el) => el.id !== id);
    setRenderAlrams(filter);
    //ToDo axios 와 엔드포인트 renerAlram/delete를 사용하여 삭제를 구현 해야하나 .. ?
  };

  console.log(renderAlram);
  return (
    <div>
      <div className={style.container}>
        {renderAlrams.map((el) => (
          <div className={style.box}>
            <div className={style.innerBox}>
              <AlramList
                key={el.id}
                handleDelete={handleDelete}
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
    </div>
  );
};

export default AlarmPage;
