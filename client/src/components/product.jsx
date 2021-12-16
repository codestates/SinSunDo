import React from "react";
import style from "./product.module.css";

const Product = ({ product, handleDelete }) => {
  return (
    <div className={style.container} key={product.id}>
      <span className={style.category}>{product.category}</span>
      <img className={style.image} src={product.image} />
      <span className={style.Product_name}>{product.name}</span>
      <span className={style.expiration_date}>{product.expiration_date}</span>
      <button className={style.delete} onClick={() => handleDelete(product.id)}>
        <i className="delete fas fa-trash-alt"></i>
      </button>
    </div>
  );
};

export default Product;
