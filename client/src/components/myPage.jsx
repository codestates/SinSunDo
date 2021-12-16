import React from 'react';
import style from './myPage.module.css'

const MyPage = (props) => {
    return (
        <div className={style.container}>
            <div className={style.box}>
                <img className={style.img} src={'/avocado.png'} alt="ProfilePic" />
                <p className={style.nickname}>닉네임</p>
                <button className={style.settingBtn}>설정</button>
                <hr className={style.underline} />
                <p className={style.toggleText}>유통기한 알림 설정</p>
                <button className={style.toggleBtn}>toggle</button>
            </div>
            <button className={style.leaveBtn}>회원탈퇴</button>
        </div>
    );
};

export default MyPage;