import React, { useState, useEffect } from 'react';
import style from './myPage.module.css';
import Toggle from '../components/toggle';
import WithdrawModal from '../components/withdrawModal';
import MyPageCorrection from './myPageCorrection';
import BeforeLogin from '../components/beforeLogin';

const MyPage = ({ isLogin, userInfo, accessToken, handleLogout }) => {
    // const { nickname, user_picture } = userInfo;
    const [isWithdrawModal, setIsWithdrawModal] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);

    const withModalHandler = () => {
        setIsWithdrawModal(!isWithdrawModal);
    };

    const userinfoEditHandler = () => {
        setIsEditModal(!isEditModal);
    }

    return (
        <>
            {isLogin ?
                <div className={style.container} >
                    <div className={style.box}>
                        <img
                            className={style.img}
                            // src={user_picture} 
                            alt="Profile_Pic"
                        />
                        <p className={style.nickname}>nickname</p>
                        <button
                            className={style.settingBtn}
                            onClick={userinfoEditHandler}
                        >회원정보 수정</button>
                        <hr className={style.underline} />
                        <p className={style.toggleText}>유통기한 알림 설정</p>
                        <Toggle accessToken={accessToken} userInfo={userInfo} />
                        {isEditModal ?
                            <MyPageCorrection
                                accessToken={accessToken}
                                userinfoEditHandler={userinfoEditHandler}
                            /> : null
                        }
                    </div>
                    <button
                        className={style.leaveBtn}
                        onClick={withModalHandler}
                    >회원탈퇴</button>
                    {isWithdrawModal ?
                        <WithdrawModal
                            accessToken={accessToken}
                            withModalHandler={withModalHandler}
                            handleLogout={handleLogout}
                        /> : null}
                </div > :
                <BeforeLogin />
            }
        </>
    );
};

export default MyPage;