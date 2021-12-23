import React from "react";
import style from "./product.module.css";

const Product = ({ product, handleDelete }) => {
  return (
    <div className={style.container}>
      <span className={style.category}>{product.category_name}</span>
      <span className={style.Product_name}>{product.food_name}</span>
      <span className={style.quantity}>{product.food_quantity}</span>
      <span className={style.expiration_date}>
        {product.food_expiration.slice(0, 10)}
      </span>

      <button className={style.delete} onClick={() => handleDelete(product.id)}>
        <i className="delete fas fa-trash-alt"></i>
      </button>
    </div>
  );
};
export default Product;
