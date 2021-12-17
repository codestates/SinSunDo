import React from "react";
import style from "./product.module.css";

const Product = ({ product, handleDelete }) => {
  return (
    <div className={style.container} key={product.id}>
      <span className={style.category}>{product.category_name}</span>
      <img className={style.image} src={product.food_picture} />
      <span className={style.Product_name}>{product.food_name}</span>
      <span className={style.quantity}>{product.food_quantity}</span>
      <span className={style.expiration_date}>{product.food_expiration}</span>
      <button className={style.delete} onClick={() => handleDelete(product.id)}>
        <i className="delete fas fa-trash-alt"></i>
      </button>
    </div>
  );
};
export default Product;
