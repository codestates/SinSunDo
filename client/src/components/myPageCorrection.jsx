import React from 'react';
import style from './myPageCorrection.module.css'

const MyPage = (props) => {
    return (
        <div className={style.container}>
            <div className={style.inner_container}>
                <img className={style.img} src={'/avocado.png'} alt="ProfilePic" />
                <div>
                    <button className={style.imgBtn}>변경</button>
                </div>
                <div className={style.textBox}>
                    <div className={style.box}>
                        <p className={style.p}>이메일</p>
                        <p className={style.p}>sinsundo@naver.com</p>
                    </div>
                    <div className={style.box}>
                        <p className={style.p}>닉네임</p>
                        <input className={style.input} type='text' />
                    </div>
                    <div className={style.box}>
                        <p className={style.p}>비밀번호</p>
                        <input className={style.input} type='text' />
                    </div>
                    <div className={style.box}>
                        <p className={style.p}>비밀번호 확인</p>
                        <input className={style.input} type='text' />
                    </div>
                </div>
                <button className={style.correctBtn}>수정 완료</button>
            </div>
        </div>
    );
};

export default MyPage;