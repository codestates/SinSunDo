import React from "react";
import style from "./withdrawModal.module.css";
import axios from "axios";

const WithdrawModal = ({ accessToken, handleLogout, withModalHandler }) => {
  const handleDeleteUser = () => {
    let result = window.confirm("정말 탈퇴하시겠습니까?");
    if (result) {
      axios
        .delete(`${process.env.REACT_APP_SERVER_URL}/users/delete`, {
          headers: { Authorization: `bearer ${accessToken}` },
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 201) {
            alert("탈퇴가 정상적으로 이루어졌습니다.");
            handleLogout();
          }
        });
    } else {
      return false;
    }
  };

  return (
    <div className={style.modalContainer}>
      <div className={style.modalBox}>
        <p className={style.title}>탈퇴 안내</p>
        <p className={style.text}>
          회원탈퇴에 앞서 정보 삭제에 대해 안내드립니다.
        </p>
        <p className={style.text}>
          회원탈퇴 후, 삭제된 정보는 복구가 불가능합니다.
        </p>
        <p className={style.text}>신중한 선택 후 진행 부탁드립니다.</p>
        <p className={style.text}>그동안 사용해 주셔서 감사합니다:D</p>
        <button className={style.singoutBtn} onClick={handleDeleteUser}>
          탈퇴하기
        </button>
        <button className={style.closeBtn} onClick={withModalHandler}>
          취소 (뒤로가기)
        </button>
      </div>
    </div>
  );
};

export default WithdrawModal;
