import React from 'react';
import style from './nav.module.css'

const Nav = (props) => {
    return (
        <div className={style.container}>
            <img className={style.logo} src={'/logo.png'} />
            <ul className={style.list}>
                <li className={style.li}><button className={style.button}>냉장고</button></li>
                <li className={style.li}><button className={style.button}>알림</button></li>
                <li className={style.li}><button className={style.button}>마이페이지</button></li>
                <li className={style.li}><button className={style.button}>로그인</button></li>
            </ul>
        </div>
    );
};

export default Nav;