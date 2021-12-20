import React, { useState } from 'react';
import style from './toggle.module.css';


export const Toggle = () => {
    const [isOn, setisOn] = useState(false);

    const toggleHandler = () => {
        setisOn(!isOn)
    };

    return (
        <>
            <div className={style.toggleContainer} >
                {isOn ? <div
                    onClick={toggleHandler}
                    className={style.toggleCircle__checked} /> :
                    <div
                        onClick={toggleHandler}
                        className={style.toggleCircle__unchecked} />}
                {isOn ? <div
                    onClick={toggleHandler}
                    className={style.toggleBox__checked} /> :
                    <div
                        onClick={toggleHandler}
                        className={style.toggleBox__unchecked} />}
            </div>
        </>
    );
};

export default Toggle;