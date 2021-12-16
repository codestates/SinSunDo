import React from 'react';
import style from './mainPage.module.css'

const MainPage = (props) => {
    return (
        <div className={style.container}>
            <img className={style.apple} src={'/apple.png'} />
            <img className={style.meat} src={'/meat.png'} />
            <div className={style.inside}>
                <div className={style.textBox}>
                    <p className={style.subtitle}>아직도</p>
                    <p className={style.subtitle}>유통기한 확인하러</p>
                    <p className={style.subtitle}>냉장고 문 여니....?</p>
                    <p className={style.title}>SINSUNDO는 </p>
                    <p className={style.title}>냉장고 안열고 확인한다!</p>
                </div>
                <img className={style.banana} src={'/banana.png'} />
                <img className={style.refrigerator} src={'/refrigerator.png'} />
                <img className={style.milk} src={'/milk.png'} />
            </div>
            <img className={style.avocado} src={'/avocado.png'} />
            <img className={style.cheese} src={'/cheese.png'} />
        </div>
    );
};

export default MainPage;